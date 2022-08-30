//Often, the checks in a conditional type will provide us with some new information. Just like with
//narrowing with type guards can give us a more specific type, the true branch of a conditional type
//will further constrain generics by the type we check against.

type MessageOf<T> = T["message"];

//Type '"message"' cannot be use to index type 'T'.

//In this example, TypeScript errors because T isn't known to have a property called message . We
//could constrain T , and TypeScript would no longer complain:

type MessageOof<T extends { message: unknown }> = T["message"];

type Email = {
    message: string;
 }

 type EmailMessageContents = MessageOf<Email>
    //type EmailMessageContents = string

//However, what if we wanted MessageOf to take any type, and default to something like never if a
//message property isn't available? We can do this by moving the constraint out and introducing a
//conditional type:

type MessaggeOf<T> = T extends { message: unknown } ? T["message"] : never;

type Emaill = {
    message: string;
}
type Dog = {
    bark(): void;
}

type EmailMesssageContents = MessaggeOf<Email>;
    //type EmailMessageContents = string

type DogmesssageContents = MessaggeOf<Dog>;
    //type DogMessageContents = never

//Within the true branch, TypeScript knows that T will have a message property.
//As another example, we could also write a type called Flatten that flattens array types to their
//element types, but leaves them alone otherwise:

type Flatten<T> = T extends any[] ? T[number] : T;

//Extracts out the element type.
type Str = Flatten<string[]>;
    //type Str = string

//Leaves the type alone.
type Num = Flatten<number>;
    //type Num = number;

//When Flatten is given an array type, it uses an indexed access with number to fetch out
//string[] 's element type. Otherwise, it just returns the type it was given.