//TypeScript also uses switch statements and equality checks like ===, !==, ==, and != to narrow types. For example:

function example(x: string | number, y: string | boolean) {
    if (x === y) {
        //We can now call any 'string' method on 'x' or 'y'.
        x.toUpperCase();
        //(method) String.toUpperCase(): string
        y.toLowerCase();
        //(method) String.toLowerCase(): string
    } else {
        console.log(x);
        //(parameter) x: string | number
        console.log(y);
        //(paramter) y: string | boolean
    }
}

//When we checked that x and y are both equal in the above example, TypeScript knew their types
//also had to be equal. Since string is the only common type that both x and y could take on,
//TypeScript knows that x and y must be a string in the first branch.
//Checking against specific literal values (as opposed to variables) works also. In our section about
//truthiness narrowing, we wrote a printAll function which was error-prone because it
//accidentally didn't handle empty strings properly. Instead we could have done a specific check to
//block out null s, and TypeScript still correctly removes null from the type of strs .

function printAll(strs: string | string[] | null) {
    if (strs !== null) {
        if (typeof strs === "object") {
            for (const s of strs) {
                //(parameter) strs: string[]
                console.log(s);
            }
        } else if (typeof strs === "string"){
            console.log(strs);
            //(paramter) strs: string
        }
    }
}

//JavaScript's looser equality checks with == and =! also get narrowed correctly. if you're unfamilliar, checking wheter something ==
//null actually not only checks wheter it is specfically the value null - it also checks whether it's potentially undefined. The same applies
//to == undefined: it checks whether a value is either null or undefined.

interface Container {
    value: number | null | undefined;
   }
   function multiplyValue(container: Container, factor: number) {
    // Remove both 'null' and 'undefined' from the type.
    if (container.value != null) {
    console.log(container.value);
    //(property) Container.value: number
    // Now we can safely multiply 'container.value'.
    container.value *= factor;
    }
   }

//The in operator narrowing
//JavaScript has an operator for determining if an object has a property with a name: the in
//operator. TypeScript takes this into account as a way to narrow down potential types.
//For example, with the code: "value" in x . where "value" is a string literal and x is a union
//type. The "true" branch narrows x 's types which have either an optional or required property
//value , and the "false" branch narrows to types which have an optional or missing property
//value.

type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
    if ("swim" in animal) {
        return animal.swim();
    }

    return animal.fly();
}

//To reiterate optional properties will exist in both sides for narrowing, for example a human could
//both swim and fly (with the right equipment) and this should show up in both sides of the in
//check:

type Fishh = { swim: () => void};
type Birdd = { swim: () => void};
type Human = { swim?: () => void; fly?: () => void };

function movee(animal: Fish | Bird | Human) {
    if ("swim" in animal) {
        animal;
        //(parameter) animal: Fish | Human
    } else {
        animal;
        //(parameter) animal: Bird | Human
    }
}