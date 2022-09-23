//Union Type is basically make an condition using type with other condition

//It might be confusing that a union of types appears to have the intersection of those types' properties. This
//is not an accident - the name union comes from type theory. The union number | string is
//composed by taking the union of the values from each type. Notice that given two sets with corresponding
//facts about each set, only the intersection of those facts applies to the union of the sets themselves. For
//example, if we had a room of tall people wearing hats, and another room of Spanish speakers wearing
//hats, after combining those rooms, the only thing we know about every person is that they must be
//wearing a hat.

//the first way to combine types you might see is a union type. A union type is a type formed from
//two or more other types, repsenting values that may be any one of those types. it refer to
//each of these types as the union's members.

/*function printId(id: number | string ) {
    console.log("Your ID is: " + id );
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });  //Argument of type '{ myID: number; }' is not assinable to parameter of type 'string | number'.
*/

//Typescript will only allow an operation if it s valid for every member of the union. For example, if you have the union
//string | number you can't use methods that are only available on string:

/*function printId(id: number | string ) {
    console.log(id.toUpperCase());      Property 'toUpperCase' does not exist on type 'string | number'.
    Property 'toupperCase' does not exist on type 'number'.

    The solution is to narrow the union with code, the same as you would in Javascript without type annotations. Narrowing
    occurs when Typescript can deduce a more specific type for a value base on the structure of the code.

    For example, typescript knows that only a string value will have a typeof value "string":
}*/
    function printId(id: number | string) {
        if (typeof id === "string" ) {
            //in this branch, id is of type 'string'
            console.log(id.toUpperCase());
        } else {
            //Here id is of type 'number'
            console.log(id);
        }
    }

    //Another example is to use a function liek Array.isArray:

function welcomePeople(x: string[] | string ) {
    if (Array.isArray(x)) {
        // Here: 'x' is 'string[]'
        console.log("Hello , " + x.join ( "and "));
    } else {
        // Here: 'x' is 'string'
        console.log("Welcome lone traveler " + x);
    }
}

//Notice that in the else branch, don't need to do anything - if x wasn't a string[], then it must have been a string

//Sometimes you'll have a union where all the members have something in common. For example, both arrays and string have a slice method.
//if every member in a union has a property in common, you can use that property without narrowing:

// Return type is inferred as number [] | string

function getFirstThree(x: number[] | string) {
    return x.slice(0, 3);
}