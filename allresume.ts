type Poiint = {      //Alias: a name for any type.
    x: number;
    y: number;
}

function Coord (pt: Poiint) {
    console.log("The coordinate's value is " + pt.x)
    console.log("The coordinate's value is " + pt.y)
}
Coord({ x:100, y:100})

//

type Onion = String | Number; //Onion type: condition between types

//

function thingy<T>(arg: T): T { // Generic type: the <T> means that you can directly call a type ex: Foo<string> instead of type before
    return arg;         //generics have a lot of other functions but that is one. what is he doing in this case is basically make you
} //be able to determinate a type derectly inside on what object you want. in this ex: thingy<string>. instead of type string before.
    //!!!!IMPORTANT so basically with generic you can transform types the way you want in the case you want it be.
let thing = thingy<string>("myString");