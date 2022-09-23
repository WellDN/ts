//JavaScript functions can also be invoked with the new operator. TypeScript refers to these as
//constructors because they usually create a new object. You can write a construct signature by
//adding the new keyword in front of a call signature:

type SomeConstructor = {
    new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
    return new ctor("hello");
}

//Some objects, like JavaScript's Date object, can be called with or without new. You can combine call and construct signatures
//in the same type arbitrarily:

interface CallOrConstruct {
    new (s: string): Date;
    (n?: number): number;
}