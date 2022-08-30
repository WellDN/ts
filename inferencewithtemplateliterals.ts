//Notice that we did not benefit from all the information provided in the original passed object. Given
//change of a firstName (i.e. a firstNameChanged event), we should expect that the callback will
//receive an argument of type string . Similarly, the callback for a change to age should receive a
//number argument. We're naively using any to type the callBack 's argument. Again, template
//literal types make it possible to ensure an attribute's data type will be the same type as that
//attribute's callback's first argument.
//The key insight that makes this possible is this: we can use a function with a generic such that:
//1. The literal used in the first argument is captured as a literal type
//2. That literal type can be validated as being in the union of valid attributes in the generic
//3. The type of the validated attribute can be looked up in the generic's structure using Indexed
//Access
//4. This typing information can then be applied to ensure the argument to the callback function is
//of the same type

type PropEventSource<Type> = {
    on<Key extends string & keyof Type>
    (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void)
   };
   declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource
   const person = makeWatchedObject({
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26
   });

   person.on("firstNameChanged", newName => {

   
    //(parameter) newName: string
    console.log(`new name is ${newName.toUpperCase()}`);
   });
   person.on("ageChanged", newAge => {
   
    //(parameter) newAge: number
   
    if (newAge < 0) {
    console.warn("warning! negative age");
    }
   })

//Here we made on into a generic method.
//When a user calls with the string "firstNameChanged" , TypeScript will try to infer the right type
//for Key . To do that, it will match Key against the content prior to "Changed" and infer the string
//"firstName" . Once TypeScript figures that out, the on method can fetch the type of firstName
//on the original object, which is string in this case. Similarly, when called with "ageChanged" ,
//TypeScript finds the type for the property age which is number .
//Inference can be combined in different ways, often to deconstruct strings, and reconstruct them in
//different ways.