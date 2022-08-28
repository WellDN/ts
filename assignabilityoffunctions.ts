//Return type void
//The void return type for functions can produce some unusual, but expected behavior.
//Contextual typing with a return type of void does not force functions to not return something.
//Another way to say this is a contextual function type with a void return type ( type vf = () =>
//void ), when implemented, can return any other value, but it will be ignored.
//Thus, the following implementations of the type () => void are valid:

type voidFunc = () => void;

const f1: voidFunc = () => {
    return true;
};

const f2: voidFunc = () => true;

const f3: voidFunc = function () {
    return true;
};

//And when the return value of one of these functions is assigned to another variable, it will retain the
//type of void :

const v1 = f1();

const v2 = f2();

const v3 = f3();

//This behavior exists so that the following code is valid even though Array.prototype.push
//returns a number and the Array.prototype.forEach method expects a function with a return
//type of void .

const src = [1, 2, 3];
const dst = [0];

src.forEach((el) => dst.push(el));

//There is one other special case to be aware of, when a literal function definition has a void return
//type, that function must not return anything.

function f4(): void {
    //@ts-expect-error
    return true;
}

const f5 = function (): void {
    //@ts-expect-error
    return true;
}

