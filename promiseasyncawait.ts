//Asynchronous functions are prefixed with the async keyword; await suspends the execution until an asynchronous function return promise is 
//fulfilled and unwraps the value from the Promise returned.

//Example
//In the following example, each input element will be printed out one at a time with a 400ms delay:

"use strict";
// printDelayed is a 'Promise<void>'
async function printDelayed(elements: string[]) {
  for (const element of elements) {
    await delay(400);
    console.log(element);
  }
}
async function delay(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
printDelayed(["Hello", "beautiful", "asynchronous", "world"]).then(() => {
  console.log();
  console.log("Printed every element!");
});

