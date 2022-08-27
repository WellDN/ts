//In JavaScript, functions can have properties in addition to being callable. However, the function type
//expression syntax doesn't allow for declaring properties. If we want to describe something callable
//with properties, we can write a call signature in an object type:

type DescribableFunction = {
    description: string;
    (someArge: number): boolean;
};
function doSomethinggg(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
}

//Note that the syntax is slightly different compared to a function type expression - use : between
//the parameter list and the return type rather than => .
