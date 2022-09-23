//The ReadonlyArray is a special type that describes arrays that shouldn't be changed.

function doStuff(values: ReadonlyArray<string>) {
    //We can read from 'values'...
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`);

    //...but we can't mutate 'values'.
    values.push("hello!");
//Property 'push' does not exist on type 'readonly string[]'.
}


//Much like the readonly modifier for properties, it's mainly a tool we can use for intent. When we
//see a function that returns ReadonlyArray s, it tells us we're not meant to change the contents at
//all, and when we see a function that consumes ReadonlyArray s, it tells us that we can pass any
//array into that function without worrying that it will change its contents.
//Unlike Array , there isn't a ReadonlyArray constructor that we can use

new ReadonlyArray("red", "green", "blue");
//'ReadonlyArray' only refers to a type, but is being used as a value here

//instead, we can assign regular Array s to ReadonlyArray s.

const roArray: ReadonlyArray<string> = ["red", "green", "blue"];

//Just as TypeScript provides a shorthand syntax for Array<Type> with Type[] , it also provides a
//shorthand syntax for ReadonlyArray<Type> with readonly Type[] .

function doSstuff(values: readonly string[]) {
    //We can read from 'values'...
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`)

//... but we can't mutate 'values'.
values.push('hello!');
//property 'push' does not exist on type 'readonly string[]'.
}

//One last thing to note is that unlike the readonly property modifier, assignability isn't
//bidirectional between regular Array s and ReadonlyArray s.


let x: readonly string[] = [];
let y: string[] = [];

x = y;
y = x;

//The type 'readonly string[]' is 'readonly' and cnanot be assigned to the mutable type 'string[]'.

