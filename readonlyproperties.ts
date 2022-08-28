//Properties can also be marked as readonly for TypeScript. While it won't change any behavior at
//runtime, a property marked as readonly can't be written to during type-checking.

type SomeType = {
    readonly prop: string;
}

function doSomething(obj: SomeType) {
    //We can read from 'obj.prop'.
    console.log(`prop has the value '$(obj.prop).`);

    //But we can't re-assign it.
    obj.prop = "hello";

    //Cannot assign to 'prop' because it is a read-only property.
}

//Using the readonly modifier doesn't necessarily imply that a value is totally immutable - or in
//other words, that its internal contents can't be changed. It just means the property itself can't be rewritten to.

type Home = {
    readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
    //We can read and update properties from 'home resident'.
    console.log(`Happy birthday ${home.resident.name}!`);
    home.resident.age++;
}
function evict(home: Home) {
    //But we can't write to the 'resident' property itself on a 'Home'.
    home.resident = {
        //Cannot assignt to 'resident' because it is a read-only property.
        name: "Victor the Evictor",
        age: 42,
    };
}

//It's important to manage expectations of what readonly implies. It's useful to signal intent during
//development time for TypeScript on how an object should be used. TypeScript doesn't factor in

//whether properties on two types are readonly when checking whether those types are
//compatible, so readonly properties can also change via aliasing.

type Person = {
    name: string;
    age: number;
}

type ReadonlyPerson = {
    readonly name: string;
    readonly age: number;
}

let writablePerson: Person = {
    name: "Person mcPersonFace",
    age: 42,
};

//works
let readonlyPerson: ReadonlyPerson = writablePerson;

console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); //prints '43'

//Using mapping modifiers, you can remove readonly attributes.

