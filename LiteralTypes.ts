//In addition to the general types string and number , we can refer to specific strings and numbers
//in type positions.
//One way to think about this is to consider how JavaScript comes with different ways to declare a
//variable. Both var and let allow for changing what is held inside the variable, and const does
//not. This is reflected in how TypeScript creates types for literals.

let changingString = "Hello World";
changingString = "Olá! Mundo";
//Because 'changingString' can represent any possible string, that
//is how Typescript decribes it in the type system
changingString;
//let changingString: string

const constantString = "Hello World";
//Because 'constantString' can only represent 1 possible string, it
//has a literal type representation
constantString;

//const constantString: "Hello World"

//By themselves, literal types aren't very valuable:

let x: "hello" = "hello";
// OK
x = "hello";
// ...
/*x = "howdy";
    Type '"howdy"' is not assinable to type '"Hello"'.
*/

//it's not much use to have a variable that can only have one value!

//but by combinig literals into unions, you can express a much mre useful concept - for example,
//functions that only accept a certain set of known values:

function printText(s: string, aligment: "left" | "right" | "center" ) {
    //...
}
printText("Hello, world", "left");
//printText("G'day, mate", "centre");

//Argument of type '"centre"' is not assignable to paramter of type '"left" | "right" | "center"'.

//Numeral literal types work the same way:

function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b ? 0 : a > b ? 1 : -1;
}

//Of course, you can combine these with non-literal types:

interface Options {
    width: number;
}
function configure(x: Options | "auto" ) {
    //...
}
configure({ width: 100 });
configure("auto");
//configure("automatic");

//Argument of type '"automatic"' is not assinable to parameter of type '"Options" | "auto"'.

//There's one more kind of literal type: boolean literals. There are only two boolean literal types, and
//as you might guess, they are the types true and false. The type boolean itself is actually just an lias for the union true | false.

//Literal Inference

//When you initialize a variable with an object, Typescript assumes that the properties of that object might change values later.
//For example, if you wrote code like this:

const obj = { counter: 0 };
//if (someCondition) {
    obj.counter = 1;
//}

//TypeScript doesn't assume the assignment of 1 to a field which previously had 0 is an error.
//Another way of saying this is that obj.counter must have the type number , not 0 , because
//types are used to determine both reading and writing behavior.
//The same applies to strings:

const req = { url: "https://example.com", method: "GET" };
//handleRequest(req.url, req.method);

//Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.

//In the above example req.method is inferred to be string , not "GET" . Because code can be
//evaluated between the creation of req and the call of handleRequest which could assign a new
//string like "GUESS" to req.method , TypeScript considers this code to have an error.
//There are two ways to work around this.
//1. You can change the inference by adding a type assertion in either location:
//// Change 1:

const reqq = { url: "https://example.com", method: "GET" as "GET" };

//// Change 2

//handleRequest(req.url, req.method as "GET");

//Change 1 means "I intend for req.method to always have the literal type "GET" ",
//preventing the possible assignment of "GUESS" to that field after. Change 2 means "I know
//for other reasons that req.method has the value "GET" ".
//2. You can use as const to convert the entire object to be type literals:

//const req = { url: "https://example.com", method: "GET" } as const;
//handleRequest(req.url, req.method);

//The as const suffix acts like const but for the type system, ensuring that all properties are
//assigned the literal type instead of a more general version like string or number.

