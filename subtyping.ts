//subtype

//S <: T, S T> or //<S <: T>    means that any term of type S can safely be used in any context where a term of type T is expected.


//Type Compatibility it's based on structural SUBTYPING.
interface Pet {
    name: string;
  }
  class Dog {
    name: string;
  }
  let pet: Pet;
  // OK, because of structural typing
  pet = new Dog();