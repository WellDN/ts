//imagine we have a function called padleft.

function padLeft(padding: number | string, input: string): string {
    throw new Error("not implemented yet!");
}

//if padding is a number, it will treat that as the number of spaces we want to prepend to input. if
//padding is a string, it should just prepend padding to input. let's try to implement the logic
//for when padLeft is passed a number for padding.

function padLeftt(padding: number | string, input: string) {
    //return " ".repeat(padding) + input;
    //Argumento of type 'string | number' is not assignable to parameter of type 'number'.
    //Type 'stirng' is not assignable to type 'number'.
}

//Uh-oh, we're getting an error on padding . TypeScript is warning us that adding a number |
//string to a number might not give us what we want, and it's right. In other words, we haven't
//explicitly checked if padding is a number first, nor are we handling the case where it's a string ,
//so let's do exactly that

function paddLeft(padding: number | string, input: string ) {
    if(typeof padding === "number") {
        return "".repeat(padding) + input;
    }
    return padding + input;
}

//if this mostly looks like uninteresting javaScript code, that's sort of the point. Apart form the annotations
//we put in place, this TypeScript code looks like JavaScript. The ideia is that TypeScript's type system aims to make it
//as easy as possible to write typical JavaScript code without bending over backwards to get type safety.

//While it might not look like much, there's actually a lot going under the covers here. much like how TypeScript analyzes runtime
//values using static types, it overlays type analysis on JavaScript's runtime control flow construct like if/else, conditional
//ternaries,loops,truthless checks, etc. which can al affect those types.

//Within our if check, TypeScript sees typeof padding === "number" and understands that as a special form of code called a type guard
//TypeScript follows possible paths of execution that our programs can take to analyze the most specific possible type of a value at a given
//position. it looks at these special checks (called type guards) and assisgnments, and the process of refining types to more specific
//types than declared is called narrowing, In many editors we can observe these types as they change, and we'll even do so in our examples.

function paadLeft(padding: number | string, input: string) {
    if (typeof padding === "number") {
        return "".repeat(padding) + input;
    }       //(parameter) padding: number
    return padding + input;
    //(parameter) padding: string
}

//There are a couple of different constructs TypeScript understands for narrowing.