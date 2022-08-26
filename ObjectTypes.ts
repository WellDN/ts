//To define an object type, list its properties and their types

function printCoord(pt: { x: number; y:number}) {   //if you dont specify the type, it will be assumed to be any.
    console.log("The Coordinate's x value is " + pt.x);
    console.log("The Coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7});

export{}