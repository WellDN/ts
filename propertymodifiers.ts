//Each property in an object type can specify a couple of things: the type, whether the property is
//optional, and whether the property can be written to.
//Optional Properties
//Much of the time, we'll find ourselves dealing with objects that might have a property set. In those
//cases, we can mark those properties as optional by adding a question mark ( ? ) to the end of their
//names.

interface PaintOptions {
    shape: Shape;
    xPos?: number;
    yPos?: number;
}

function paintShape(opts: PaintOptions) {
    //...
}

const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });

//In this example, both xPos and yPos are considered optional. We can choose to provide either of
//them, so every call above to paintShape is valid. All optionality really says is that if the property is
//set, it better have a specific type.
//We can also read from those properties - but when we do under strictNullChecks, TypeScript
//will tell us they're potentially undefined .

function paintShaape(opts: PaintOptions) {
    let xPos = opts.xPos;
    //(property) PaintOptions.xPos?: number | undefined
    let yPos = opts.yPos;
    //(property) PaintOptions.yPos?: number | undefined
}

//In JavaScript, even if the property has never been set, we can still access it - it's just going to give us
//the value undefined . We can just handle undefined specially

function paintShhape(opts: PaintOptions) {
    let xPos = opts.xPos === undefined ? 0 : opts.xPos;
    //let xPos: number
    let yPos = opts.yPos === undefined ? 0 : opts.yPos;
    //let yPos: number
}

//Note that this pattern of setting defaults for unspecified values is so common that JavaScript has
//syntax to support it.

function painttShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
    console.log("x coordinate at", xPos);
    //(parameter) xPos: number

    console.log("y coordinate at", yPos);
    //(parameter) yPos: number
}

//Here we used a destructuring pattern for paintShape 's parameter, and provided default values for
//xPos and yPos . Now xPos and yPos are both definitely present within the body of
//paintShape , but optional for any callers to paintShape .
//Note that there is currently no way to place type annotations within destructuring patterns. This is because
//the following syntax already means something different in JavaScript.

function draw({ shape: Shape, xPos: number = 100 /*...*/}) {
    render(shape);
    //Cannot find name 'shape'. Did you mean 'Shape'?
    render (xPos);
    //Cannot find name 'xPos'.
}

//In an object destructuring pattern, shape: Shape means "grab the property shape and redefine
//it locally as a variable named Shape . Likewise xPos: number creates a variable named number
//whose value is based on the parameter's xPos .
//Using mapping modifiers, you can remove optional attributes.