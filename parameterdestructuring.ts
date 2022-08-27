//Parameter Destructuring
//You can use parameter destructuring to conveniently unpack
//objects provided as an argument into one or more local variables in
//the function body. In JavaScript, it looks like this:

function sum({ a, b, c}) {
    console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9});

//The type annotation for the object goes after the destructuring syntax:

function summ({ a, b, c}: { a: number; b: number; c: number}) {
    console.log(a + b + c);
}

//This can look a bit verbose, but you can use a named type here as well:

//Same as prior example
type ABC = { a: number; b: number; c: number };
function summm({ a, b, c}: ABC) {
    console.log(a + b + c);
}

