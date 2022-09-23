//Object types can also specify that some or all of their properties are optional
//to do this, add a ? after the property name:

function printNamee(obj: { first: string; last?: string}) {
    // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });

//if you acess a property that doesnt exist, youll get the value undefined rather than a runtime error. because of this, when
//read form an optional property, youll have to check for undefined before using it.
/**/
function printName(obj: { first: string; last?: string }) {
    // Error - might crash if 'obj.last' wasn't provided
    console.log(obj.last?.toUpperCase());
    //Object is possibly 'undefined'.

    if (obj.last !== undefined) {
        // OK
        console.log(obj.last.toUpperCase());
    }

    //A safe alternative using modern Javascript syntax:
    console.log(obj.last?.toUpperCase());
}
