//In previous sections, we created generic identity functions that worked over a range of types. In this
//section, we'll explore the type of the functions themselves and how to create generic interfaces.
//The type of generic functions is just like those of non-generic functions, with the type parameters
//listed first, similarly to function declarations:

function  identity<T>(arg: T): T {
    return arg;
}

let myIdentity: <T>(arg: T) => T = identity;

//We could also have used a different name for the generic type parameter in the type, so long as the
//number of type variables and how the type variables are used line up.

function identityy<T>(arg: T): T {
    return arg;
}

let myIdentityy: <Input>(arg: Input) => Input = identityy;

//We can also write the generic type as a call signature of an object literal type:

function iidentity<T>(arg: T): T {
    return arg
}

let myIidentity: { <T>(arg: T): T } = iidentity;    //generic type as call signature

//Which leads us to writing our first generic interface. Let's take the object literal from the previous
//example and move it to an interface:

interface GenericIdentityFnn  {
    <T>(arg: T): T;
}

function iiidentity<T>(arg: T): T {
    return arg;
}

let myIidentityy: GenericIdentityFnn = iiidentity;

//In a similar example, we may want to move the generic parameter to be a parameter of the whole
//interface. This lets us see what type(s) we're generic over (e.g. Dictionary<string> rather than
//just Dictionary ). This makes the type parameter visible to all the other members of the interface.

interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identtity<T>(arg: T): T {
    return arg;
}

let myIdenttity: GenericIdentityFn<number> = identity;

//Notice that our example has changed to be something slightly different. Instead of describing a
//generic function, we now have a non-generic function signature that is a part of a generic type.
//When we use GenericIdentityFn , we now will also need to specify the corresponding type
//argument (here: number ), effectively locking in what the underlying call signature will use.
//Understanding when to put the type parameter directly on the call signature and when to put it on
//the interface itself will be helpful in describing what aspects of a type are generic.
//In addition to generic interfaces, we can also create generic classes. Note that it is not possible to
//create generic enums and namespaces.

