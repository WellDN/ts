//More on Functions
//Functions are the basic building block of any application, whether they're local functions, imported
//from another module, or methods on a class. They're also values, and just like other values,
//TypeScript has many ways to describe how functions can be called. Let's learn about how to write
//types that describe functions.
//Function Type Expressions
//The simplest way to describe a function is with a function type expression. These types are
//syntactically similar to arrow functions:

function greeter(fn: (a: string) => void) {
    fn("Hello, World");
}

function printToConsole(s: string) {
    console.log(s);
}

greeter(printToConsole);

//The syntax (a: string) => void means "a function with one parameter, named a , of type
//string, that doesn't have a return value". Just like with function declarations, if a parameter type isn't
//specified, it's implicitly any .
//Note that the parameter name is required. The function type (string) => void means "a function
//with a parameter named string of type any "!
//Of course, we can use a type alias to name a function type:

type GreetFunction = (a: string) => void;
function greeeter(fn: GreetFunction) {
    //...
}

