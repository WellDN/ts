//There are two additional modifiers which can be applied during mapping: readonly and ? which
//affect mutability and optionality respectively.
//You can remove or add these modifiers by prefixing with - or + . If you don't add a prefix, then +
//is assumed.

// Removes 'readonly' attributes from a type's a properties
type CreateMutable<T> = {
    -readonly [Property in keyof T]: T[Property];
};

type LockedAccount = {
    readonly id: string;
    readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;

//type UnlockedAccount = {
//    id: string;
//    name: string;
//}

//Removes 'optional' attributes from a type's properties
type Concrete<T> = {
    [Property in keyof T]-?: T[Property];
};

type MaybeUser = {
    id: string;
    name?: string;
    age?: number;
};

type User = Concrete<MaybeUser>;
////type User = {
//    id: string;
//    name: string;
//    age: number;
//}