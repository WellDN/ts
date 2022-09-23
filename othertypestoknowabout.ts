//There are some additional types you'll want to recognize that appear often when working with
//function types. Like all types, you can use them everywhere, but these are especially relevant in the
//context of functions.
//void
//void represents the return value of functions which don't return a value. It's the inferred type any
//time a function doesn't have any return statements, or doesn't return any explicit value from
//those return statements:

// The inferred return type is void
function noop() {
    return;
}

//In JavaScript, a function that doesn't return any value will implicitly return the value undefined .
//However, void and undefined are not the same thing in TypeScript. There are further details at
//the end of this chapter.
//void is not the same as undefined .
//object
//The special type object refers to any value that isn't a primitive ( string , number , bigint ,
//boolean , symbol , null , or undefined ). This is different from the empty object type { } , and
//also different from the global type Object . It's very likely you will never use Object .
//object is not Object . Always use object !
//Note that in JavaScript, function values are objects: They have properties, have
//Object.prototype in their prototype chain, are instanceof Object , you can call
//Object.keys on them, and so on. For this reason, function types are considered to be object s in
//TypeScript.
//unknown

//The unknown type represents any value. This is similar to the any type, but is safer because it's
//not legal to do anything with an unknown value:

function f1(a: any) {
    a.b(); //OK
}
function f2(a: unknown) {
    a.b();
    //Object is of type 'unknown'.
}

//This is useful when describing function types because you can describe functions that accept any
//value without having any values in your function body.
//Conversely, you can describe a function that returns a value of unknown type:

function safeParse(s: string): unknown {
    return JSON.parse(s);
}

//Need to be careful with 'obj'!
const obj = safeParse(someRandomString);

//never
//Some functions never return a value:

function fail(msg: string): never {
    throw new Error(msg);
}

//The never type represents values which are never observed. In a return type, this means that the
//function throws an exception or terminates execution of the program.
//never also appears when TypeScript determines there's nothing left in a union.

function fn(x: string | number ) {
    if (typeof x === 'string') {
        // do something
    } else if (typeof x === "number") {
        // do something else
    } else {
        x; //has type 'never'!
    }
}

//Function
//The global type Function describes properties like bind , call , apply , and others present on
//all function values in JavaScript. It also has the special property that values of type Function can
//always be called; these calls return any :

function doSomething(f: Function) {
    return f(1, 2, 3);
}

//This is an untyped function call and is generally best avoided because of the unsafe any return
//type.
//If you need to accept an arbitrary function but don't intend to call it, the type () => void is
//generally safer.