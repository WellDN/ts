//Rest Parameters
//In addition to using optional parameters or overloads to make
//functions that can accept a variety of fixed argument counts, we can
//also define functions that take an unbounded number of arguments using rest parameters.
//A rest parameter appears after all other parameters, and uses the ... syntax:

function multiply(n: number, ...m: number[]) {
    return m.map((x) => n * x);
}
// 'a' gets value [10, 20 ,30, 40]
const a = multiply(10, 1, 2, 3, 4);

//In TypeScript, the type annotation on these parameters is implicitly any[] instead of any , and any
//type annotation given must be of the form Array<T> or T[] , or a tuple type (which we'll learn
//about later).
//Rest Arguments
//Conversely, we can provide a variable number of arguments from an array using the spread syntax.
//For example, the push method of arrays takes any number of arguments:

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);

//Note that in general, TypeScript does not assume that arrays are immutable. This can lead to some
//surprising behavior:

//inferred type is number[] -- "an array with zero or more numbers",
//not specifically two numbers
const argss = [8, 5];
const anglee = Math.atan2(...argss);
//A spread argument must either have a tuple type or be passed to a rest parameter.

//The best fix for this situation depends a bit on your code, but in general a const context is the most straightforward solution:
//Inferred as 2-length tuple
const args = [8, 5] as const;
//ok
const angle = Math.atan2(...args);

//Using rest arguments may require turning on downlevelIteration when targeting older
//runtimes.