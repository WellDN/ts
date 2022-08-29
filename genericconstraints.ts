//If you remember from an earlier example, you may sometimes want to write a generic function that
//works on a set of types where you have some knowledge about what capabilities that set of types
//will have. In our loggingIdentity example, we wanted to be able to access the .length
//property of arg , but the compiler could not prove that every type had a .length property, so it
//warns us that we can't make this assumption.

function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);
    //Property 'length' doesn't exist on type 'T'.
    return arg;
}

//Instead of working with any and all types, we'd like to constrain this function to work with any and
//all types that alsoÂ have the .length property. As long as the type has this member, we'll allow it,
//but it's required to have at least this member. To do so, we must list our requirement as a constraint
//on what Type can be.
//To do so, we'll create an interface that describes our constraint. Here, we'll create an interface that
//has a single .length property and then we'll use this interface and the extends keyword to

//denote our constraint:

type Lengthwise = {
    length: number;
}

function logggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length); //now we know it has a .length property
    return arg;
}

//Because the generic function is now constrained, it will no longer work over any and all types:

loggingIdentity(3);

//Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.

loggingIdentity({ length: 10, value: 3 });