//When creating factories in TypeScript using generics, it is necessary to refer to class types by their
//constructor functions. For example

function create<T>(c:{ new (): T }): T {
    return new c();
}

//A more advanced example uses the prototype property to infer and constrain relationships between
//the constructor function and the instance side of class types.

class BeeKeeper {
    hasMask: boolean = true;
}
class ZooKeeper {
    nametag: string = "Mikle";
}
class Animal {
    numLegs: number = 4;
}
class Bee extends Animal {
    Keeper : BeeKeeper = new BeeKeeper();
}
class Lion extends Animal {
    keeper: ZooKeeper = new ZooKeeper();
}
function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).Keeper.hasMask;

//This pattern is used to power the mixins design pattern