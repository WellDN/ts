//A tuple type is another sort of Array type that knows exactly how many elements it contains, and
//exactly which types it contains at specific positions

type StringNumberPair = [string, number];

//Here, StringNumberPair is a tuple type of string and number . Like ReadonlyArray , it has no
//representation at runtime, but is significant to TypeScript. To the type system, StringNumberPair
//describes arrays whose 0 index contains a string and whose 1 index contains a number .

function doSomething(pair: [string, number]) {
    const a = pair[0];
    //const a: string
    const b = pair[1];
    //const b: number
    //...
}

doSomething(["hello", 42]);

//if we try to index past the number of elements, we'll get an error.

function ddoSomething(pair: [string, number]) {
    //...
    const c = pair[2];
//Tuple type '[string, number]' of length '2' has no element at index '2'.
}

//we can also destructure tuples using JavaScript's array destructuring.

function DoSsomething(stringHash: [string, number]) {
    const [inputString, hash] = stringHash;

    console.log(inputString);
    //const inputString: string

    console.log(hash);
    //const hash: number
}

//Tuple types are useful in heavily convention-based APIs, where each element's meaning is "obvious". This
//gives us flexibility in whatever we want to name our variables when we destructure them. In the above
//example, we were able to name elements 0 and 1 to whatever we wanted.
//However, since not every user holds the same view of what's obvious, it may be worth reconsidering
//whether using objects with descriptive property names may be better for your API.
//Other than those length checks, simple tuple types like these are equivalent to types which are
//versions of Array s that declare properties for specific indexes, and that declare length with a
//numeric literal type.

type StringNumberPpair = {
    //specialized properties
    length: 2;
    0: string;
    1: number;

    //Other 'Array<string | number>' members...
    slice(start?: number, end?: number): Array<string | number>;
}

//Another thing you may be interested in is that tuples can have optional properties by writing out a
//question mark ( ? after an element's type). Optional tuple elements can only come at the end, and
//also affect the type of length .

type Either2dOr3d = [number, number, number?];

function setCoordinate(coord: Either2dOr3d) {
    const [x, y, z] = coord;
//const z: number | undefined
console.log(`Provided coordinates had ${coord.length} dimensions`);
//(property) length: 2 | 3
}

//Typles can also have rest elements, which have to be an array/tuple type.

type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string,  ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];

//StringNumberBooleans describes a tuple whose first two elements are string and number
//respectively, but which may have any number of boolean s following.
//StringBooleansNumber describes a tuple whose first element is string and then any
//number of boolean s and ending with a number .
//BooleansStringNumber describes a tuple whose starting elements are any number of
//boolean s and ending with a string then a number .
//A tuple with a rest element has no set "length" - it only has a set of well-known elements in
//different positions.

const a: StringNumberBooleans = ["hello", 1];
const b: StringNumberBooleans = ["beautiful", 1, true];
const c: StringNumberBooleans = ["world", 3, true, false, true, false, true];

//Why might optional and rest elements be useful? Well, it allows TypeScript to correspond tuples
//with parameter lists. Tuples types can be used in rest parameters and arguments, so that the
//following:

function readButttonInput(...args: [string, number, ...boolean[]]) {
    const [name, version, ...input] = args;
}

//is basically equivalent to:

function readButtonInput(name: string, version: number, ...input: boolean []) {
    //...
}

//This is handy when you want to take a variable number of arguments with a rest parameter, and
//you need a minimum number of elements, but you don't want to introduce intermediate variables