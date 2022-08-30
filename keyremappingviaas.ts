//In TypeScript 4.1 and onwards, you can re-map keys in mapped types with an as clause in a mapped type:

type MappedTypeWithNewProperties<T> = {
    [Properties in keyof T as NewKeyType]: T[Properties]
}

//you can leverage features like template literal types to create new property names from prior ones:

type Getters<T> = {
    [Property in keyof T as `get${Capitalize<string & Property>}`]: ()
};

type Person = {
    name: string;
    age: number;
    location: string;
}

type Lazyperson = Getters<Person>;

//type LazyPerson = {
//    getName: () => string;
//    getAge: () => number;
//    getLocation: () => string;
//}

//you can filter out keys by producing never via a conditional type:

// Remove the 'kind' property
type RemoveKindField<T> = {
    [Property in keyof T as Exclude<Property, "kind">]: T[Property]
};

type Circle = {
    kind: "circle";
    radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
//type KindlessCircle = {
//    radius: number;
//}

//You can map over arbitrary unions, not just unions of string | number | symbol , but unions of
//any type:

type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>
////type Config = {
//    square: (event: SquareEvent) => void;
//    circle: (event: CircleEvent) => void;
//}

