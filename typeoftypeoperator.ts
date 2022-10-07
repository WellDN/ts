//JavaScript already has a typeof operator you can use in an expression context:
/*
//Prints "string"
console.log(typeof "hello World");

//TypeScript adds a typeof operator you can use in a type context to refer to the type of a variable
//or property:

let s = "hello";
let n: typeof s;
    //let n: string

//This isn't very useful for basic types, but combined with other type operators, you can use typeof
//to conveniently express many patterns. For an example, let's start by looking at the predefined type
//ReturnType<T> . It takes a function type and produces its return type:

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
    // type K = boolean

//if we try to use ReturnType on a function name, we see an instructive error:

function f() {
    return { x: 10, y: 3 };
}
type P = ReturnType<f>;

//'f' refers to a value, but is being used as a type here. Did you mean
//'typeof f'?

function ff() {
    return { x: 10, y: 3 };
}
type PO = ReturnType<typeof ff>; //typeof refers to the type

//type P = {
//    x: number;
//    y: number;
//}

//Limitations

//TypeScript intentionally limits the sorts of expressions you can use typeof on.
//Specifically, it's only legal to use typeof on identifiers (i.e. variable names) or their properties. This
//helps avoid the confusing trap of writing code you think is executing, but isn't:

//Meant to use = ReturnType<typeof msgbox>
let shouldContinue: typeof msgbox("Are you sure you want to continue?");

//',' expected.*/