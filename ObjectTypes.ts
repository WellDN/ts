//To define an object type, list its properties and their types

function printCoord(pt: { x: number; y:number}) {   //if you dont specify the type, it will be assumed to be any.
    console.log("The Coordinate's x value is " + pt.x);
    console.log("The Coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7});

export{}

//In JavaScript, the fundamental way that we group and pass around data is through objects. In
//TypeScript, we represent those through object types.
//As we've seen, they can be anonymous:

function greet(person: { name: string; age: number }) { //Anonymous Type
    return "Hello " + person.name;
}

//or they can be named by using either an interface

interface Person  {     //Interface
    name: string;
    age: number;
}

function greeet(person: Person) {
    return "hello " + person.name;
}

//or a type alias.

type Personn = {        //Type Alias
    name: string;
    age: number;
};

function greeeet(person: Person) {
    return "Hello " + person.name;
}

//In all three examples above, we've written functions that take objects that contain the property
//name (which must be a string ) and age (which must be a number ).

