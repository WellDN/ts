//We just found ourselves using conditional types to apply constraints and then extract out types.
//This ends up being such a common operation that conditional types make it easier.
//Conditional types provide us with a way to infer from types we compare against in the true branch
//using the infer keyword. For example, we could have inferred the element type in Flatten
//instead of fetching it out "manually" with an indexed access type:

type Flatten<T> = T extends Array<infer Item> ? Item : T;

//Here, we used the infer keyword to declaratively introduce a new generic type variable named
//Item instead of specifying how to retrieve the element type of T within the true branch. This frees
//us from having to think about how to dig through and probing apart the structure of the types
//we're interested in.
//We can write some useful helper type aliases using the infer keyword. For example, for simple
//cases, we can extract the return type out from function types:

type GetReturnType<T> = T extends (...args: never[]) => infer Return ? Return : never;

type Num = GetReturnType<() => number>;
    //type Num = number

type Str = GetReturnType<(x: string) => string>;
    //type Str = string

type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;
    //type Bools = boolean[]

//When inferring from a type with multiple call signatures (such as the type of an overloaded
//function), inferences are made from the last signature (which, presumably, is the most permissive
//catch-all case). It is not possible to perform overload resolution based on a list of argument types.

declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;

type T1 = ReturnType<typeof stringOrNum>;
    //type T1 = string | number

