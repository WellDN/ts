//As with other JavaScript language features, TypeScript adds type
//annotations and other syntax to allow you to express relationships between classes and other types.
//Class Members
//Here's the most basic class - an empty one:

class Point {}

//This class isn't very useful yet, so let's start adding some members.
//Fields
//A field declaration creates a public writeable property on a class:

class Pointt {
    x: number;
    y: number;
}

const pt = new Pointt();
pt.x = 0;
pt.y = 0;

//As with other locations, the type annotation is optional, but will be an implicit any if not specified.
//Fields can also have initializers; these will run automatically when the class is instantiated:

class Pointtt {
    x = 0;
    y = 0;
}

const ptt = new Pointtt();
    //prints 0,0
console.log(`${pt.x}, ${pt.y}`);

//just like with const, let, and var, the initalizer of a class property will be used to infer its type:

const pttt = new Pointtt();
pttt.x = "0";

//Type 'string' is not assignable to type 'number'.

//--strictPropertyInitialization
//The strictPropertyInitialization setting controls whether class fields need to be
//initialized in the constructor.

class BadGreeter { 
    name: string;
    //Property 'name' has no initializer and is not definitely assigned in the constructor.
}

class GoodGreeter { 
    name: string

    constructor() {
        this.name = "hello";
    }
}
//Note that the field needs to be initialized in the constructor itself. TypeScript does not analyze
//methods you invoke from the constructor to detect initializations, because a derived class might
//override those methods and fail to initialize the members.
//If you intend to definitely initialize a field through means other than the constructor (for example,
//maybe an external library is filling in part of your class for you), you can use the definite assignment
//assertion operator, ! :

class OKGreeter {
    //Not initialized, but no error
    name!: string;
}

//Fields may be prefixed with the readonly modifier. This prevents assignments to the field outside
//of the constructor.

class Greeter {
    readonly name: string = "world";

    constructor(otherName?: string) {
        if (otherName !== undefined) {
            this.name = otherName;
        }
    }

    err() {
        this.name = "not ok"
        //Cannot assign to 'name' because it is a read-only property.
    }
}
const g = new Greeter();
g.name = "also not ok";
//Cannot assign to 'name' because it is a read-only property.

//Constructors

//Class constructors are very similar to functions. You can add
//parameters with type annotations, default values, and overloads:

class Ppoint {
    x: number;
    y: number;

    //Normal signature with defaults
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }
}

class Pooint { 
    //Overloads
    constructor(x: number, y: string);
    constructor(s: string);
    constructor(xs: any, y?: any) {
        //TBD
    }
}

//There are just a few differences between class constructor signatures and function signatures:
//Constructors can't have type parameters - these belong on the outer class declaration, which
//we'll learn about later
//Constructors can't have return type annotations - the class instance type is always what's
//returned

//Super Calls

//Just as in JavaScript, if you have a base class, you'll need to call super(); in your constructor
//body before using any this. members:

class Base {
    k = 4;
}

class Derived extends Base {
    constructor() {
        //Prints a wrong value in ES5; throws exception in ES6
        console.log(this.k)
        //'super' must be called before accessing 'this' in the constructor of a derived class.
        super();
    }
}

//Forgetting to call super is an easy mistake to make in JavaScript, but TypeScript will tell you when
//it's necessary.

//Methods

//A function property on a class is called a method. Methods can use all
//the same type annotations as functions and constructors:

class Poinnt {
    x = 10;
    y = 10;

    scale(n: number): void {
        this.x *= n;
        this.y *= n;
    }
}

//Other than the standard type annotations, TypeScript doesn't add anything else new to methods.
//Note that inside a method body, it is still mandatory to access fields and other methods via this. .
//An unqualified name in a method body will always refer to something in the enclosing scope:

let x: number = 0;

class C {
    x: string = "hello";

    m() {
        //This is trying to modify 'x' from line 1, not the class property
        x = "world";
    //Type 'string' is not assignable to type 'number'.
    }
}

//Getters / Setters

//Classes can also have accessors.

class L {
    _length = 0;
    get length() {
            return this._length;
        }
        set length(value) {
            this._length = value;
        }
    }


//Note that a field-backed get/set pair with no extra logic is very rarely useful in JavaScript. It's fine to
//expose public fields if you don't need to add additional logic during the get/set operations.
//TypeScript has some special inference rules for accessors:
//If get exists but no set , the property is automatically readonly
//If the type of the setter parameter is not specified, it is inferred from the return type of the getter
//Getters and setters must have the same Member Visibility
//Since TypeScript 4.3, it is possible to have accessors with different types for getting and setting.

class Thing {
    _size = 0;

    get size(): number {
        return this._size;
    }

    set size(value: string | number | boolean) {
        let num = Number(value);

        //Don't naN, infinity, etc

        if(!Number.isFinite(num)) {
            this ._size = 0;
            return;
        }

        this._size = num;
    }
}

//Index Signatures

//Classes can declare index signatures; these work the same as Index Signatures for other object
//types:

class MyClass {
    [s: string]: boolean | ((s: string) => boolean);

    check(s: string) {
        return this[s] as boolean;
    }
}

//Because the index signature type needs to also capture the types of methods, it's not easy to
//usefully use these types. Generally it's better to store indexed data in another place instead of on
//the class instance itself.


//Class Heritage

//Like other languages with object-oriented features, classes in JavaScript can inherit from base
//classes.
//implements Clauses
//You can use an implements clause to check that a class satisfies a particular interface . An error
//will be issued if a class fails to correctly implement it:

interface Pingable {
    ping(): void;
}

class Sonar implements Pingable {
    ping() {
        console.log("ping!");
    }
}

class Ball implements Pingable {
//    Class 'Ball' incorrectly implements interface 'Pingable'.
// Property 'ping' is missing in type 'Ball' but required in type
//'Pingable'.
    pong() {
        console.log("pong!");
    }
}

//Classes may also implement multiple interfaces, e.g. class C implements A, B { .

//    Cautions

//    It's important to understand that an implements clause is only a check that the class can be
//    treated as the interface type. It doesn't change the type of the class or its methods at all. A common
//    source of error is to assume that an implements clause will change the class type - it doesn't!

interface Checkable {
    check(name: string): boolean;
}

class NameChecker implements Checkable {
    check(s) {
        //Parameter 's' implicitly has an 'any' type.

        //Notice no error here
        return s.toLowerCase() === "ok";
        //any
    }
}

//In this example, we perhaps expected that s 's type would be influenced by the name: string
//parameter of check . It is not - implements clauses don't change how the class body is checked
//or its type inferred.
//Similarly, implementing an interface with an optional property doesn't create that property:

interface A {
    x: number;
    y?: number;
}
class G implements A {
    x = 0;
}
const g = new G();
G.y = 10;
//property 'y' does not exist on type 'G'.

//extends Clauses

//Classes may extend from a base class. A derived class has all the
//properties and methods of its base class, and also define additional
//members.

class Animal {
    move() {
        console.log("Moving along!");
    }
}

class Dog extends Animal {
    woof(times: number) {
        for (let i = 0; i < times; i++) {
            console.log("woof!");
        }
    }
}

const d = new Dog();
//Base class method
d.move();
//Derived class method
d.woof(3);

//Overriding Methods

//A derived class can also override a base class field or property. You can
//use the super. syntax to access base class methods. Note that
//because JavaScript classes are a simple lookup object, there is no
//notion of a "super field".
//TypeScript enforces that a derived class is always a subtype of its base class.
//For example, here's a legal way to override a method:

class Basee { 
    ggreet() {
        console.log("Hello, world!");
    }
}
class Deriveed extends Basee {
    ggreet(name?: string) {
        if(name === undefined) {
            super.ggreet();
        } else {
            console.log(`Hello, ${name.toUpperCase()}`);
        }
    }
}

const d = new Deriveed();
d.ggreet();
d.ggreet("reader");

//It's important that a derived class follow its base class contract. Remember that it's very common
//(and always legal!) to refer to a derived class instance through a base class reference:

const d: Basee = d;
//No problem
d.ggreet();

//what if Derived didn't follow Base's contract?

class Basse { 
    greet() {
        console.log("Hello, world!");
    }
}

class Derivedd extends Base {
    greet(name: string) {
    //Make this parameter required
    //greet(name: string) {Property 'greet' in type 'Derived' is not assignable to the same
    //property in base type 'Base'.
    // Type '(name: string) => void' is not assignable to type '() => void'.
    console.log(`Hello, ${name.toUpperCase()}`);

    }
}

//if we compiled this code despite the error, this sample would then crash:

const b: Base = new Derived();
//Creashes because "name" will be undefined
b.greet();

//Type-only Field Declarations

//When target >= ES2022 or useDefineForClassFields is true , class fields are initialized
//after the parent class constructor completes, overwriting any value set by the parent class. This can
//be a problem when you only want to re-declare a more accurate type for an inherited field. To
//handle these cases, you can write declare to indicate to TypeScript that there should be no
//runtime effect for this field declaration.

interface Animal {
    dateOfBirth: any;
}

interface Dog extends Animal {
    breed: any;
}

class AnimalHouse {
    resident: Animal;
    constructor(animal: Animal) {
        this.resident = animal;
    }
}

class DogHouse extends AnimalHouse {
    //Does not emit JavaScript code,
    //only ensures the types are correct
    declare resident: Dog;
    constructor(dog: Dog) {
    super(dog);
    }
}

//Initialization Order

//The order that JavaScript classes initialize can be surprising in some cases. Let's consider this code:

class Baase {
    name = "baase";
    constructor() {
        console.log("My name is " + this.name);
    }
}

class Deriveddd extends Baase {
    name = "derived";
}

//Prints "base", not "derived"
const p = new Deriveddd();

//What happened here?

//The order of class initialization, as defined by JavaScript, is:

//The base class fields are initialized

//The base class constructor runs

//The derived class fields are initialized

//The derived class constructor runs

//This means that the base class constructor saw its own value for name during its own constructor,
//because the derived class field initializations hadn't run yet.

//Inheriting Built-in Types

//Note: If you don't plan to inherit from built-in types like Array , Error , Map , etc. or your compilation
//target is explicitly set to ES6 / ES2015 or above, you may skip this section

//In ES2015, constructors which return an object implicitly substitute the value of this for any
//callers of super(...) . It is necessary for generated constructor code to capture any potential
//return value of super(...) and replace it with this .
//As a result, subclassing Error , Array , and others may no longer work as expected. This is due to
//the fact that constructor functions for Error , Array , and the like use ECMAScript 6's
//new.target to adjust the prototype chain; however, there is no way to ensure a value for
//new.target when invoking a constructor in ECMAScript 5. Other downlevel compilers generally
//have the same limitation by default.
//For a subclass like the following:

class MsgError extends Error {
    constructor(m: string) {
        super(m);
    }
    sayHello() {
        return "hello " + this.message;
    }
}

//you may find that:

//methods may be undefined on objects returned by constructing these subclasses, so calling
//sayHello will result in an error.
//instanceof will be broken between instances of the subclass and their instances, so (new
//MsgError()) instanceof MsgError will return false .
//As a recommendation, you can manually adjust the prototype immediately after any super(...)
//calls.

class MsgErrorr extends Error {
    constructor(m: string) {
        super(m);

        //Set the prototype explicitly
        Object.setPrototypeOf(this, MsgErrorr.prototype);
    }

    sayHello() {
        return "hello " + this.message;
    }
}

//However, any subclass of MsgError will have to manually set the prototype as well. For runtimes
//that don't support Object.setPrototypeOf, you may instead be able to use __proto__.
//Unfortunately, these workarounds will not work on Internet Explorer 10 and prior. One can
//manually copy methods from the prototype onto the instance itself (i.e. MsgError.prototype
//onto this ), but the prototype chain itself cannot be fixed.

//Member Visibility

//You can use TypeScript to control whether certain methods or properties are visible to code outside
//the class.

//public

//The default visibility of class members is public . A public member can be accessed anywhere:

class Greetter {
    public greet() {
        console.log("hi!");
    }
}
const h = new Greetter();
h.greet()

//Because public is already the default visibility modifier, you don't ever need to write it on a class
//member, but might choose to do so for style/readability reasons.

//protected

//protected members are only visible to subclasses of the class they're declared in.

class Grreter { 
    public greet() {
        console.log("Hello, " + this.getName());
    }
    protected getName() {
        return "hi";
    }
}

class SpecialGreeter extends Grreter {
    public howdy() {
        //OK to acess protected member here
        console.log("Howdy, " + this.getName());
    }
}
const s = new SpecialGreeter();
s.greet(); //OK
s.getName();
//Property 'getName' is protected and only accessible within class
//'Greeter' and its subclasses.

//Exposure of protected members

//Derived classes need to follow their base class contracts, but may choose to expose a subtype of
//base class with more capabilities. This includes making protected members public :

class Bbase {
    protected m = 10;
}

class Derivved extends Bbase {
    //No modifier, so default is 'public'
    m = 15;
}
const o = new Derivved();
console.log(o.m); //ok

//Note that Derived was already able to freely read and write m , so this doesn't meaningfully alter
//the "security" of this situation. The main thing to note here is that in the derived class, we need to be
//careful to repeat the protected modifier if this exposure isn't intentional.

//Cross-hierarchy protected access

//Different OOP languages disagree about whether it's legal to access a protected member
//through a base class reference:

class Bbbase {
    protected x: number = 1;
}
class Derived1 extends Bbbase {
    protected x: number = 5;
}
class Derived2 extends Bbbase {
    f1(other: Derived2) {
        other.x = 10;
    }
    f2(other: Bbbase) {
        other.x = 10;
//Property 'x' is protected and only accessible through an instance of class
//'Derived2'. This is an instance of class 'Base'.
    }
}

//Java, for example, considers this to be legal. On the other hand, C# and C++ chose that this code
//should be illegal.

//TypeScript sides with C# and C++ here, because accessing x in Derived2 should only be legal
//from Derived2 's subclasses, and Derived1 isn't one of them. Moreover, if accessing x through
//a Derived1 reference is illegal (which it certainly should be!), then accessing it through a base
//class reference should never improve the situation.

//See also Why Canâ€™t I Access A Protected Member From A Derived Class? which explains more of
//C#'s reasoning.

//private

//private is like protected , but doesn't allow access to the member even from subclasses:

class Baseee {
    private x = 0;
}
const i = new Baseee();
//can't access from outside the class
console.log(i.x)

//Property 'x' is private and only accessible within class 'Base'.

class Derivvved extends Baseee { //extends = subclass
    showX() {
        // Can't access in subclasses
        console.log(this.x);
    //Property 'x' is private and only accessible within class 'Base'.
    }
}

//Because private members aren't visible to derived classes, a derived class can't increase its
//visibility:

class Baseeee {
    private x = 0
}
class Derivvvved extends Base {
    x = 1;
}

//Cross-instance private access

//Different OOP languages disagree about whether different instances of the same class may access
//each others' private members. While languages like Java, C#, C++, Swift, and PHP allow this,
//Ruby does not.

//TypeScript does allow cross-instance private access:

class A {
    private z = 10;

    public sameAs(other: A) {
        //No error
        return other.z === this.z;
    }
}

//Caveats

//Like other aspects of TypeScript's type system, private and protected are only enforced during
//type checking.
//This means that JavaScript runtime constructs like in or simple property lookup can still access a
//private or protected member:

class MySafe {
    private secretKey = 12345
}
//In a JavaScript file...
const ç = new MySafe();
//Will print 12345
console.log(ç.secretKey);

//private also allows access using bracket notation during type checking. This makes private -
//declared fields potentially easier to access for things like unit tests, with the drawback that these
//fields are soft private and don't strictly enforce privacy.

class MySafee {
    private secretKey = 12345;
}

const n = new MySafee();

//Not allowed during type checking
console.log(s.secretKey);

//Property 'secretKey' is private and only accessible within class 'MySafe'.

//OK
console.log(s["secretKey"]);

//Unlike TypeScripts's private , JavaScript's private fields ( # ) remain private after compilation and
//do not provide the previously mentioned escape hatches like bracket notation access, making them
//hard private.

class Ddog {
    #barkAmount = 0;
    personality = "happy";

    constructor() {}
}
"use strict";

class Dddog {
    #barkAmount = 0;
    personality = "happy";
    constructor() { }
}

//When compiling to ES2021 or less, TypeScript will use Weakmaps in place of #.

"use strict";
var _Dog_barkAmount;
class Doggg {
    constructor() {
        _Dog_barkAmount.set(this, 0);
        this.personality = "happy";
    }
}
_Dog_barkAmount = new WeakMap();

//If you need to protect values in your class from malicious actors, you should use mechanisms that
//offer hard runtime privacy, such as closures, WeakMaps, or private fields. Note that these added
//privacy checks during runtime could affect performance.

//Static Members

//Classes may have static members. These members aren't
//associated with a particular instance of the class. They can be
//accessed through the class constructor object itself

class MyClasss {
    static v = 0;
    static printV() {
        console.log(MyClasss.v);
    }
}
console.log(MyClasss.v);
MyClasss.printV();

//Static members can also use the same public , protected , and private visibility modifiers:

class MyClaass { 
    private static k = 0;
}
console.log(MyClaass.k);

//Property 'x' is private and only accessible within class 'MyClass'.

//Static members are also inherited:

class Baaase {
    static getGreeting() {
        return "Hello world";
    }
}
class Deerived extends Baaase {
    myGreeting = Deerived.getGreeting();
}

//Special Static Names

//It's generally not safe/possible to overwrite properties from the Function prototype. Because
//classes are themselves functions that can be invoked with new , certain static names can't be
//used. Function properties like name , length , and call aren't valid to define as static
//members:

class S {
    static name = "S!";
}
//Static property 'name' conflicts with built-in property 'Function.name'
//of constructor function 'S

//Why No Static Classes?

//TypeScript (and JavaScript) don't have a construct called static class the same way as, for
//example, C# does.
//Those constructs only exist because those languages force all data and functions to be inside a
//class; because that restriction doesn't exist in TypeScript, there's no need for them. A class with only
//a single instance is typically just represented as a normal object in JavaScript/TypeScript.
//For example, we don't need a "static class" syntax in TypeScript because a regular object (or even
//top-level function) will do the job just as well:

//Unnecessary "static" class
class MyStaticClass {
    static doSomething() {}
}

//Preferred (alternative 1)
function doSomething() {}

//Preferred (alternative 2)
const MyHelperObject = {
    dosomething() {},
};

//static Blocks in Classes

//Static blocks allow you to write a sequence of statements with their own scope that can access
//private fields within the containing class. This means that we can write initialization code with all the
//capabilities of writing statements, no leakage of variables, and full access to our class's internals.

class Foo {
    static #count = 0;

    get count() {
        return Foo.#count;
    }

    static {
        try {
            const lastInstances = loadLastInstances();
            Foo.#count += lastInstances.length;
        }
        catch{}
    }
}

//Generic Classes

//Classes, much like interfaces, can be generic. When a generic class is instantiated with new , its type
//parameters are inferred the same way as in a function call:

class Box<T> {
    contents: T;
    constructor(value: T) {
        this.contents = value;
    }
}

const y = new Box("hello!");
    //const y: Box<string>

//Classes can use generic constraints and defaults the same way as interfaces.

//Type Parameters in Static Members

//This code isn't legal, and it may not be obvious why:

class Boxx<T> {
    static defaultValue: T;
    //Static members cannot reference class type parameters.
}

//Remember that types are always fully erased! At runtime, there's only one Box.defaultValue
//property slot. This means that setting Box<string>.defaultValue (if that were possible) would
//also change Box<number>.defaultValue - not good. The static members of a generic class
//can never refer to the class's type parameters.

//this at Runtime in Classes

//It's important to remember that TypeScript doesn't change the runtime
//behavior of JavaScript, and that JavaScript is somewhat famous for
//having some peculiar runtime behaviors.
//JavaScript's handling of this is indeed unusual:

class MyCllass {
    name: "MyCllass";
    getName() {
        return this.name
    }
}
const v = new MyCllass();
const obj = {
    name: "obj",
    getName: v.getName,
};

//prints "obj", not "myClass"
console.log(obj.getName());

//Long story short, by default, the value of this inside a function depends on how the function was
//called. In this example, because the function was called through the obj reference, its value of
//this was obj rather than the class instance.

//This is rarely what you want to happen! TypeScript provides some ways to mitigate or prevent this
//kind of error.
//
//Arrow Functions
//
//If you have a function that will often be called in a way that loses its
//this context, it can make sense to use an arrow function property
//instead of a method definition:

class MyCclass {
    name = "MyCclass";
    getName = () => {   //the arrow give the getName to get the name
        return this.name;
    };
}
const q = new MyCclass();
const j = q.getName;
//Prints "MyClass" instead of crashing
console.log(j());

//This has some trade-offs:

//The this value is guaranteed to be correct at runtime, even for code not checked with
//TypeScript

//This will use more memory, because each class instance will have its own copy of each function
//defined this way

//You can't use super.getName in a derived class, because there's no entry in the prototype chain
//to fetch the base class method from

//this parameters

//In a method or function definition, an initial parameter named this has special meaning in
//TypeScript. These parameters are erased during compilation:

//TypeSript input with 'this' parameter
function fn(this: SomeType, x: number) {
    //...
}

//JavaScript output
function fnn/*(fn)*/(x) {
    //..
}

//TypeScript checks that calling a function with a this parameter is done so with a correct context.
//Instead of using an arrow function, we can add a this parameter to method definitions to
//statically enforce that the method is called correctly:

class MyCcllass {
    name = "myCcllass";
    getName(this: MyCcllass) {
        return this.name;
    }
}
const w = new MyCcllass ();
//ok
w.getName();

//Error, would crash
const e = w.getName();
console.log(g());
//The 'this' context of type 'void' is not assignable to method's 'this'
//of type 'MyClass

//This method makes the opposite trade-offs of the arrow function approach:
//JavaScript callers might still use the class method incorrectly without realizing it
//Only one function per class definition gets allocated, rather than one per class instance
//Base method definitions can still be called via super .
//this Types
//In classes, a special type called this refers dynamically to the type of the current class. Let's see
//how this is useful:

//this Types

//In classes, a special type called this refers dynamically to the type of the current class. Let's see
//how this is useful:

class Boxxx {
    contents: string = "";
    set(value: string) {
        //(method) Boxxx.set(value:string): this
        this.contents = value;
        return this;
    }
}

//Here, TypeScript inferred the return type of set to be this , rather than Box . Now let's make a
//subclass of Box :

class ClearableBox extends Boxxx {
    clear() {
        this.contents = "";
    }
}

const a = new ClearableBox();
const k = a.set("hello");
    //const b: ClearableBox

//you can also use this in a parameter type annotation:

class Bbox {
    content: string = "";
    sameAs(other: this) {
        return other.content === this.content;
    }
}

class Bbooxx {
    content: string = "";
    sameAs(other: this) {
        return other.content === this.content;
    }
}

class DerivedBox extends Bbooxx {
    otherContent: string = "?";
}

const base = new Bbooxx();
const derived = new DerivedBox();
derived.sameAs(base);

//Argument of type 'Box' is not assignable to parameter of type
//'DerivedBox'.
// Property 'otherContent' is missing in type 'Box' but required in type
//'DerivedBox'.

//this -based type guards
//You can use this is Type in the return position for methods in classes and interfaces. When
//mixed with a type narrowing (e.g. if statements) the type of the target object would be narrowed
//to the specified Type .

class FileSystemObject {
    isFile(): this is FileRep {
    return this instanceof FileRep;
    }
    isDirectory(): this is Directory {
    return this instanceof Directory;
    }
    isNetworked(): this is Networked & this {
    return this.networked;
    }
    constructor(public path: string, private networked: boolean) {}
   }
   class FileRep extends FileSystemObject {
    constructor(path: string, public content: string) {
    super(path, false);
    }
   }
   class Directory extends FileSystemObject {
    children: FileSystemObject[];
   }
   interface Networked {
    host: string;
   }
   const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");
   if (fso.isFile()) {
    fso.content;
    //const fso: FileRep
   } else if (fso.isDirectory()) {
    fso.children;
    //const fso: Directory
   } else if (fso.isNetworked()) {
    fso.host;
    //const fso: Networked & FileSystemObject
   }

//A common use-case for a this-based type guard is to allow for lazy validation of a particular field.
//For example, this case removes an undefined from the value held inside box when hasValue
//has been verified to be true:

class Bboox<T> {
    value?: T;

    hasValue(): this is { value: T } {
        return this.value !== undefined; //if isn't one, is another one
    }
}

const box = new Bboox()
box.value = "Gameboy";

box.value;
    //(property) Bboox<unkown>.value?: unknown

if (box.hasValue()) {
    box.value;
    //(property) value: unknown
}

//Parameter Properties

//TypeScript offers special syntax for turning a constructor parameter into a class property with the
//same name and value. These are called parameter properties and are created by prefixing a
//constructor argument with one of the visibility modifiers public , private , protected , or
//readonly . The resulting field gets those modifier(s):

class Params {
    constructor(
        public readonly x: number,
        protected y: number,
        private z: number
    ) {
        //No body necessary
    }
}
const aa = new Params(1, 2, 3);
console.log(aa);
        //(property) Params.aa: number

console.log(aa.z);

//Property 'z' is private and only accessible within class 'Params'.

//Class Expressions

//Class expressions are very similar to class declarations. The only
//real difference is that class expressions don't need a name, though
//we can refer to them via whatever identifier they ended up bound
//to:

const someClass = class<T> {
    content: T;
    constructor(value: T) {
        this.content = value;
    }
}

const m = new someClass("Hello, world");
    //const m: someClass<string>

//Abstract Classes and Members

//Classes, methods, and fields in TypeScript may be abstract.
//An abstract method or abstract field is one that hasn't had an implementation provided. These
//members must exist inside an abstract class, which cannot be directly instantiated.
//The role of abstract classes is to serve as a base class for subclasses which do implement all the
//abstract members. When a class doesn't have any abstract members, it is said to be concrete.
//Let's look at an example:

abstract class Baasse {
    abstract getName(): string;

    printName() {
        console.log("Hello, " + this.getName());
    }
}

const bb = new Base();

//Cannot create an instance of an abstract class.

//We can't instantiate Base with new because it's abstract. Instead, we need to make a derived class
//and implement the abstract members:

class Derived3 extends Baasse {
    getName() {
        return "world";
    }
}

const bbb = new Derived3();
bbb.printName();

//Notice that if we forget to implement the base class's abstract members, we'll get an error:

class Derived4 extends Baasse {

//Non-abstract class 'Derived' does not implement inherited abstract
//member 'getName' from class '

//forgot to do anything
}

//Abstract Construct Signatures

//Sometimes you want to accept some class constructor function that produces an instance of a class
//which derives from some abstract class.
//For example, you might want to write this code:

function greet(ctor: typeof Base) {
    const instance = new ctor();

    //Cannot create an instance of an abstract class.
    instance.printName();
}

//TypeScript is correctly telling you that you're trying to instantiate an abstract class. After all, given
//the definition of greet , it's perfectly legal to write this code, which would end up constructing an
//abstract class:

//Instead, you want to write a function that accepts something with a construct signature:


function greeet(ctor: new () => Base) {
    const instance = new ctor();
    instance.printName();
}
greet(Derived);
greet(Base);

//Argument of type 'typeof Base' is not assignable to parameter of type
//'new () => Base'.
// Cannot assign an abstract constructor type to a non-abstract
//constructor type.

//Now TypeScript correctly tells you about which class constructor functions can be invoked -
//Derived can because it's concrete, but Base cannot.

//Relationships Between Classes

//In most cases, classes in TypeScript are compared structurally, the same as other types.

//For example, these two classes can be used in place of each other because they're identical: