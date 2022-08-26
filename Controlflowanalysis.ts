//Up until this point, we've gone through some basic examples of how TypeScript narrows within
//specific branches. But there's a bit more going on than just walking up from every variable and
//looking for type guards in if s, while s, conditionals, etc. For example

function padLleft(padding: number | string, input: string) {
    if (typeof padding === "number") {
        return "".repeat(padding) + input;
    }
    return padding + input;
}

//padLeft returns from within its first if block. TypeScript was able to analyze this code and see
//that the rest of the body ( return padding + input; ) is unreachable in the case where padding
//is a number . As a result, it was able to remove number from the type of padding (narrowing
//from string | number to string ) for the rest of the function.
//This analysis of code based on reachability is called control flow analysis, and TypeScript uses this
//flow analysis to narrow types as it encounters type guards and assignments. When a variable is
//analyzed, control flow can split off and re-merge over and over again, and that variable can be
//observed to have a different type at each point.

function examplee() {
    let x: string | number | boolean;

    x = Math.random() < 0.5;
    
    console.log(x);

    // let x: boolean

    if (Math.random() < 0.5) {
        x = "hello";
        console.log(x);
        //let x: string
    } else {
        x = 100;
        console.log(x);
        //let x: number
    }
    return x;
    //let x: string | number
}

//Using type predicates

//We've worked with existing JavaScript constructs to handle narrowing so far, however sometimes
//you want more direct control over how types change throughout your code.
//To define a user-defined type guard, we simply need to define a function whose return type is a type
//predicate

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

//pet is Fish is our type predicate in this example. A predicate takes the form parameterName
//is Type , where parameterName must be the name of a parameter from the current function
//signature.
//Any time isFish is called with some variable, TypeScript will narrow that variable to that specific
//type if the original type is compatible.

// Both calls to 'swim' and 'fly' are now okay.
/*let pet = getSmalllPet();

if (isFish(pet)) {
    pet.swim();
} else {
    pet.fly();
}

//Notice that TypeScript not only knows that pet is a Fish in the if branch; it also knows that in
//the else branch, you don't have a Fish , so you must have a Bird .
//You may use the type guard isFish to filter an array of Fish | Bird and obtain an array of
//Fish :

const zoo: (Fish | Bird )[] = [getSmallPet(), getSmallPet(), getSmallPet()]
const underWater1: Fish[] = zoo.filter(isFish);
//or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];

// The predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
    if (pet.name === "sharkey") return false;
    return isFish(pet);
})

//in addition, classes can use this is Type to narrow their type.*/
