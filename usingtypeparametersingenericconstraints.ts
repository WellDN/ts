//You can declare a type parameter that is constrained by another type parameter. For example, here
//we'd like to get a property from an object given its name. We'd like to ensure that we're not
//accidentally grabbing a property that does not exist on the obj , so we'll place a constraint between
//the two types:

//function getProperty<T, Key extends keyof T>(obj: T, key: Key) {
//    return obj[key];
//}
//
//let x = { a: 1, b: 2, c: 3, d: 4 };
//
//getProperty(x, "a");
//getProperty(x, "m");
//
////Argument of "m" is not assignable parameter '"a" | "b" | "c" | "d"'.
//
//