//Let's imagine a Box type that can contain any value - string s, number s, Giraffe s, whatever

type Box = {
    contents: any;
}

//Right now, the contents property is typed as any , which works, but can lead to accidents down
//the line.
//We could instead use unknown , but that would mean that in cases where we already know the type
//of contents , we'd need to do precautionary checks, or use error-prone type assertions.

type BBox = {
    contents: "hello world",
};

//let x: BBox = {
//    contents: "hello world",
//};

////we could check 'x.contents'
//if (typeof x.contents === "string") {
//    console.log(x.contents.toLowerCase());
////}
//
////or we could use a type assertion
//console.log((x.contents as string).toLowerCase());

//One type safe approach would be to instead scaffold out different Box types for every type of
//contents .

type NumberBox = {
    contents: number;
}
type StringBox = {
    contents: number;
}
type BooleanBox = {
    contents: number;
}

//But that means we'll have to create different functions, or overloads of functions, to operate on
//these types.

function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: { contents: any }, newContents: any) {
 box.contents = newContents;
}

//That's a lot of boilerplate. Moreover, we might later need to introduce new types and overloads. This
//is frustrating, since our box types and overloads are all effectively the same.
//Instead, we can make a generic Box type which declares a type parameter

type Boxx<T> = {
    contents: T;
}

//You might read this as â€œA Box of Type is something whose contents have type Type â€.
//Later on, when we refer to Box , we have to give a type argument in place of Type 

let boxx: Boxx<string>;

//Think of Box as a template for a real type, where Type is a placeholder that will get replaced with
//some other type. When TypeScript sees Box<string> , it will replace every instance of Type in
//Box<Type> with string , and end up working with something like { contents: string } . In
//other words, Box<string> and our earlier StringBox work identically.

type Boox<T> = {
    contents: T;
}
type StringBoxx = {
    contents: string;
}

let boxA: Boox<string> = { contents: "hello" };
boxA.contents;
    //(property) Boox<string>.contents: string

    let boxB: StringBoxx = { contents: "world" };
    boxB.contents;
    //(property) StringBox.contents:string

//Box is reusable in that Type can be substituted with anything. That means that when we need a
//box for a new type, we don't need to declare a new Box type at all (though we certainly could if we
//wanted to).

type BBoxx<T> = {
    contents: T;
}

type Apple = {
    //...
}

//Same as '{ contents: Apple }'.
type Applexbox = BBoxx<Apple>;

//This also means that we can avoid overloads entirely by instead using generic functions.

function setContentss<T>(box: BBoxx<T>, newContents: T) {
    box.contents = newContents;
}

//It is worth noting that type aliases can also be generic. We could have defined our new Box<Type>
//interface, which was:

type Booox<T> = {
    contents: T;
}

//by using a type lias instead:

type Boooox<T> = {
    contents: T;
}

//Since type aliases, unlike interfaces, can describe more than just object types, we can also use them
//to write other kinds of generic helper types.
type OrNull<T> = T | null;

type OneOrMany<T> = T | T [];

type OneOrManyOrNull<T> = OrNull<OneOrMany<T>>;
//type OneOrManyOrNull<T> = OneOrMany<T> | null

type OneOrmanyStrings = OneOrManyOrNull<string>;
//type OneOrManyOrNullStrings = OneOrMany<string> | null