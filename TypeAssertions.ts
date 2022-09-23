//Sometimes you will have information about the type of a value that TypeScript can't know about.

//For example, if you're using document.getElementById , TypeScript only knows that this will
//return some kind of HTMLElement , but you might know that your page will always have an
//HTMLCanvasElement with a given ID.
//In this situation, you can use a type assertion to specify a more specific type:


const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement

//Like a type annoation, type assertions are removed by the compilar and won't affect the runtime
//behavior of your code.

//it can also use the angle-bracket syntax (except if the code is in a .tsx file), which is equivalent:

const myCanvass = <HTMLCanvasElement>document.getElementById("main_canvas")

//Because type assertions are removed at compile-time, there is no runtime checking associated with a type assertion.
//There won't be an exeception or null generated if the type assertion is wrong.

//Tyopescript only allows type assertions which convert to a more specific or less specific version of a type.
//this rule prevents "impossible" coercions like:

//const x = "hello" as number;

//Conversion of type 'string' to type 'number' may be a mistake because
//neither type sufficiently overlaps with the other. If this was
//intentional, convert the expression to 'unknown' first.

//Sometimes this rule can be too conservative and will disallow more complex coercions that might
//be valid. If this happens, you can use two assertions, first to any (or unknown)
//, then to the desired type:

//const a = (expr as any) as T;