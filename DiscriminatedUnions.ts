//Most of the examples we've looked at so far have focused around narrowing single variables with
//simple types like string , boolean , and number . While this is common, most of the time in
//JavaScript we'll be dealing with slightly more complex structures.
//For some motivation, let's imagine we're trying to encode shapes like circles and squares. Circles
//keep track of their radiuses and squares keep track of their side lengths. We'll use a field called
//kind to tell which shape we're dealing with. Here's a first attempt at defining Shape .

interface Shapee {
    kind: "circle" | "square";
    radius?: number;
    sideLenght?: number;
}

//Notice we're using a union of string literal types: "circle" and "square" to tell us whether we
//should treat the shape as a circle or square respectively. By using "circle" | "square" instead
//of string , we can avoid misspelling issues.

function handleShape(shape: Shape) {
    //Oops!
//    if (shape.kind === "rect") {
        //This condition will always return 'false' since the types '"circle" | "square"' and '"rect" ' have no overlap.
        // ...
    }
//}

//We can write a getArea function that applies the right logic based on if it's dealing with a circle or
//square. We'll first try dealing with circles.

function gettArea(shape: Shape) {
    //return Math.PI * shape radius ** 2; //Object is possibly 'undefined'.
}

//Under strictNullChecks that gives us an error - which is appropriate since radius might not
//be defined. But what if we perform the appropriate checks on the kind property?

function getAreaa(shape: Shape) {
    if (shape.kind === "circle") {
    //return Math.PI * shape.radius ** 2;
   //Object is possibly 'undefined'.
    }
   }
   
//Hmm, TypeScript still doesn't know what to do here. We've hit a point where we know more about
//our values than the type checker does. We could try to use a non-null assertion (a ! after
//shape.radius ) to say that radius is definitely present.

function getAreea(shape: Shape) {
    if (shape.kind === "circle") {
        return Math.PI * shape.radius! ** 2;
    }
}
   
//But this doesn't feel ideal. We had to shout a bit at the type-checker with those non-null assertions
//( ! ) to convince it that shape.radius was defined, but those assertions are error-prone if we start
//to move code around. Additionally, outside of strictNullChecks we're able to accidentally
//access any of those fields anyway (since optional properties are just assumed to always be present
//when reading them). We can definitely do better.
//The problem with this encoding of Shape is that the type-checker doesn't have any way to know
//whether or not radius or sideLength are present based on the kind property. We need to
//communicate what we know to the type checker. With that in mind, let's take another swing at
//defining Shape .

interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    sideLength: number;
    kind: "square";
    sideLenght: number;
}

type Shapeee = Circle | Square;

//Here, we've properly separated Shape out into two types with different values for the kind
//property, but radius and sideLength are declared as required properties in their respective
//types.
//Let's see what happens here when we try to access the radius of a Shape .

function getAerea(shape: Shape) {
    //return Math.PI * shape.radius ** 2;
    //Property 'radius' does not exist on type 'Shape'.
    //Property 'radius' does not exist on type 'Shape'.
}

//Like with our first definition of Shape , this is still an error. When radius was optional, we got an
//error (with strictNullChecks enabled) because TypeScript couldn't tell whether the property
//was present. Now that Shape is a union, TypeScript is telling us that shape might be a Square ,
//and Square s don't have radius defined on them! Both interpretations are correct, but only the
//union encoding of Shape will cause an error regardless of how strictNullChecks is
//configured.
//But what if we tried checking the kind property again?

function getArrea(shape: Shape) {
    if (shape.kind === "circle") {
        return Math.PI * shape.radius ** 2;
        //(parameter) shape: Circle
    }
}

//That got rid of the error! When every type in a union contains a common property with literal types,
//TypeScript considers that to be a discriminated union, and can narrow out the members of the
//union.
//In this case, kind was that common property (which is what's considered a discriminant property
//of Shape ). Checking whether the kind property was "circle" got rid of every type in Shape
//that didn't have a kind property with the type "circle" . That narrowed shape down to the
//type Circle .
//The same checking works with switch statements as well. Now we can try to write our complete
//getArea without any pesky ! non-null assertions.

function getAarea(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
            //(paramteter) shape: Circle
            case "square":
                return shape.sideLenght ** 2;
                //(parameter) shape: Square
    }
}

//The important thing here was the encoding of Shape . Communicating the right information to
//TypeScript - that Circle and Square were really two separate types with specific kind fields -
//was crucial. Doing that let us write type-safe TypeScript code that looks no different than the

//JavaScript we would've written otherwise. From there, the type system was able to do the "right"
//thing and figure out the types in each branch of our switch statement.
//As an aside, try playing around with the above example and remove some of the return keywords. You'll
//see that type-checking can help avoid bugs when accidentally falling through different clauses in a
//switch statement.
//Discriminated unions are useful for more than just talking about circles and squares. They're good
//for representing any sort of messaging scheme in JavaScript, like when sending messages over the
//network (client/server communication), or encoding mutations in a state management framework.
