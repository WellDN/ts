//When conditional types act on a generic type, they become distributive when given a union type.
//For example, take the following:

type ToArray<T> = T extends any ? T[] : never;

//If we plug a union type into ToArray , then the conditional type will be applied to each member of
//that union.

type ToArrayy<T> = T extends any ? T[] : never;

type StrArrOrNumArr = ToArrayy<string | number>;
    //type StrArrOrNumArr = string[] | number[]

//What happens here is that StrArrOrNumArr distributes on:

//string | number;

//and maps over each member type of the union, to what is effectively:

//ToArray<stirng> | ToArray<number>;

//which leaves us with:

//string[] | number[];

//Typically, distributivity is the desired behavior. To avoid that behavior, you can surround each side of
//the extends keyword with square brackets.

type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

//'StrArrOrNumArr' is no longer a union.
type StrArrOrNnumArr = ToArrayNonDist<string | number>;
    //type StrArrOrNumArr = (string | number)[]

    