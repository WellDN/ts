//The never type
//When narrowing, you can reduce the options of a union to a point where you have removed all
//possibilities and have nothing left. In those cases, TypeScript will use a never type to represent a
//state which shouldn't exist.

//Exhaustiveness checking
//The never type is assignable to every type; however, no type is assignable to never (except
// never itself). This means you can use narrowing and rely on never turning up to do exhaustive
// checking in a switch statement.
// For example, adding a default to our getArea function which tries to assign the shape to
// never will raise when every possible case has not been handled.

type Shape = Circle | Square;

function getArea(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
            case "square":
                return shape.sideLength ** 2;
                default: 
                const _exaustiveCheck: never = shape;
                return _exaustiveCheck;
    }
}

//Adding a new member to the Shape union, will cause a Typescript error:

interface Triangle {
    kind: "triangle";
    sideLength: number;
   }
   type Shappe = Circle | Square | Triangle;
   function getttArea(shape: Shape) {
    switch (shape.kind) {
    case "circle":
    return Math.PI * shape.radius ** 2;
    case "square":
    return shape.sideLength ** 2;
    default:
    const _exhaustiveCheck: never = shape;
   //Type 'Triangle' is not assignable to type 'never'.
    return _exhaustiveCheck;
    }
   }

   