//JavaScript has an operator for checking whether or not a value is an "instance" of another value.
//More specifically, in JavaScript x instanceof Foo checks whether the prototype chain of x
//contains Foo.prototype . While we won't dive deep here, and you'll see more of this when we get
//into classes, they can still be useful for most values that can be constructed with new . As you might
//have guessed, instanceof is also a type guard, and TypeScript narrows in branches guarded by
//instanceof s.


function logValue(x: Date | string) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
        //(parameter) x: Date
    } else {
        console.log(x.toUpperCase());
        //(parameter) x: string
    }
}

