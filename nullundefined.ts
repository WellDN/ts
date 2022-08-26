//strictNullChecks on, when a value is null or undefined, you will need to test for those values before using methods or properties
//on that value. just like checking for undefined before using an optionak property, we can use narrowing to check for values
//that might be null:

function doSomethingg(x: string | null)  {
    if(x === null) {
      //do nothing
    } else {
        console.log("Hello, " + x.toUpperCase());
    }
}

//Non-null Assertion Operator (Postfix ! )

//Typescript also has a special syntax for removing null and undefined from a type without doing any explicit checking.
//Writing ! after any expression is effectively a type assertion that the value isn't null or undefined:

function liveDangerously(x?: number | null) {
  //No Error
  console.log(x!.toFixed());
}

//Just like other type assertions, this doesn't change the runtime behavior of your code, so it's important to only use
// ! when you know that the value can't be null or undefined.

