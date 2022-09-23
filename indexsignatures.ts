//Sometimes you don't know all the names of a type's properties ahead of time, but you do know the
//shape of the values.
//In those cases you can use an index signature to describe the types of possible values, for example:

type StringArray = {
    [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];
    //const secondItem: string

//Above, we have a StringArray interface which has an index signature. This index signature states
//that when a StringArray is indexed with a number , it will return a string .
//An index signature property type must be either 'string' or 'number'.
//It is possible to support both types of indexers...
//While string index signatures are a powerful way to describe the "dictionary" pattern, they also
//enforce that all properties match their return type. This is because a string index declares that
//obj.property is also available as obj["property"] . In the following example, name 's type
//does not match the string index's type, and the type checker gives an error:

type NumberDictionary = {
    [index:string]: number;

    length: number; //OK
    name: string;

    //Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
}

//However, properties of different types are acceptable if the index signature is a union of the property types:

type NumberOrStringDictionary = {
    [index: string]: number | string;
    length: number; //ok, length is a number
    name: string; //ok, name is a string
}

