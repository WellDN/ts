//One final note about tuple types - tuples types have readonly variants, and can be specified by
//sticking a readonly modifier in front of them - just like with array shorthand syntax.

function doSomething(pair: readonly [string, number]) {
    //...
}

//As you might expct, writing to any property of a readonly typle isn't allowed in TypeScript.

function doSomethingg(pair: readonly [string, number]) {
    pair[0] = "hello!";
    //Cannot assign to '0' because it is a read-only property.
}

//Tuples tend to be created and left un-modified in most code, so annotating types as readonly
//tuples when possible is a good default. This is also important given that array literals with const
//assertions will be inferred with readonly tuple types.

let point = [3, 4] as const;

function distanceFromOrigin([x, y]: [number, number]) {
    return Math.sqrt(x ** 2 + y ** 2);
}

distanceFromOrigin(point);

//Argument of type 'readonly [3, 4]' is not assignable to parameter of
//type '[number, number]'.
// The type 'readonly [3, 4]' is 'readonly' and cannot be assigned to
//the mutable type '[number, number

//Here, distanceFromOrigin never modifies its elements, but expects a mutable tuple. Since
//point 's type was inferred as readonly [3, 4] , it won't be compatible with [number,
//number] since that type can't guarantee point 's elements won't be mutated