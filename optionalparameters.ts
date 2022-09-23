//Optional Parameters
//Functions in JavaScript often take a variable number of arguments. For example, the toFixed
//method of number takes an optional digit count:

function l(n: number) {
    console.log(n.toFixed()); // 0 arguments
    console.log(n.toFixed(3)); // 1 arguments
}

//We can model this in TypeScript by marking the parameter as optional with ?:

function f(x?: number) {
    //...
}
f(); //OK
f(10); //OK

//Although the parameter is specified as type number , the x parameter will actually have the type
//number | undefined because unspecified parameters in JavaScript get the value undefined .
//You can also provide a parameter default:

function g(x = 10) {
    //..
}

//Now in the body of f , x will have type number because any undefined argument will be
//replaced with 10 . Note that when a parameter is optional, callers can always pass undefined , as
//this simply simulates a "missing" argument:

declare function fg(x?: number): void;
//cut
// All OK
fg();
fg(10);
fg(undefined);

//Optional Parameters in Callbacks
//Once you've learned about optional parameters and function type expressions, it's very easy to
//make the following mistakes when writing functions that invoke callbacks:

function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}

//What people usually intend when writing index? as an optional parameter is that they want both
//of these calls to be legal:

myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));

//What this actually means is that callback might get invoked with one argument. In other words,
//the function definition says that the implementation might look like this:

function myForrEach(arr: any[], callback: (arg: any, index?: number) => void) {
for (let i = 0; i < arr.length; i++) {
    //I don't feel like providing the index today
    callback(arr[i]);
}
}

//In turn, TypeScript will enforce this meaning and issue errors that aren't really possible:

myForEach([1, 2, 3], (a, i) => {
    console.log(i.toFixed());
    //Object is possibly 'undefined'.
});

//In JavaScript, if you call a function with more arguments than there are parameters, the extra
//arguments are simply ignored. TypeScript behaves the same way. Functions with fewer parameters
//(of the same types) can always take the place of functions with more parameters.
//When writing a function type for a callback, never write an optional parameter unless you intend to call the
//function without passing that argument