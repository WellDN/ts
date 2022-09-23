//Generic object types are often some sort of container type that work independently of the type of
//elements they contain. It's ideal for data structures to work this way so that they're re-usable across
//different data types.
//It turns out we've been working with a type just like that throughout this handbook: the Array
//type. Whenever we write out types like number[] or string[] , that's really just a shorthand for
//Array<number> and Array<string>.

function doSomething(value: Array<string>) {
    //...
}

let myArray: string[] = ["hello", "world"];

//either of these work-
doSomething(myArray);
doSomething(new Array("hello", "world"));

//Much like the Box type above, Array itself is a generic type.

type Aarray<T> = {
    /*Gets or sets the length of the array. */
length: number;

//Removes the last element from an array and return it.
pop(): T | undefined;

//Appends new elements to an array, and returns the new length of the array
push(...items: T[]): number;
}

//Modern JavaScript also provides other data structures which are generic, like Map<K, V> ,
//Set<T> , and Promise<T> . All this really means is that because of how Map , Set , and Promise
//behave, they can work with any sets of types.