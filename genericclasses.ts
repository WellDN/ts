//A generic class has a similar shape to a generic interface. Generic classes have a generic type
//parameter list in angle brackets ( <> ) following the name of the class

class GenericNumber<NumT> {
    zeroValue: NumT;
    add: (x: NumT, y: NumT) => NumT;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};

//This is a pretty literal use of the GenericNumber class, but you may have noticed that nothing is
//restricting it to only use the number type. We could have instead used string or even more complex objects.

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
    return x + y;
};

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));

//Just as with interface, putting the type parameter on the class itself lets us make sure all of the
//properties of the class are working with the same type.
//As we cover in our section on classes, a class has two sides to its type: the static side and the
//instance side. Generic classes are only generic over their instance side rather than their static side,
//so when working with classes, static members can not use the class's type parameter.

