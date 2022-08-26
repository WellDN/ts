//it's common to want to use object types and unions types more than once and refer to it by a single name.
//a type alias exactly that - a name for any type. The syntax for a type alias is:

type Point = { //this form is called object type (as we saw before)
    x: number;
    y: number;
}

// Exactly the same as the early example
function printCoord(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });

//it can actually use a type alias to give a name to any type at all, not just an object type. For example,
// a type alias can name a union type:

type ID = number | string;

//note that aliases are only alises - you cannot use type alises to create differente/district "versions"
//of the same type. when you use the alias, it's exactly as if you had written the alised type. in orther words,
//this code might look illegal, but is OK according of Typescript because both types are alises for the same type:

type UserInputSanitizedString = string;

function sanitizedInput(str: string): UserInputSanitizedString {
    return sanitize(str);
}

//Create a sanitized input
let userInput = sanitizedInput(getInput());

// Can still be re-assigned with a string though

userInput = "new input";











function getInput(): string {
    throw new Error("Function not implemented.");
}
function sanitize(str: string): string {
    throw new Error("Function not implemented.");
}

