//The power in template literals comes when defining a new string based on information inside a
//type.
//Consider the case where a function ( makeWatchedObject ) adds a new function called on() to a
//passed object. In JavaScript, its call might look like: makeWatchedObject(baseObject) . We can
//imagine the base object as looking like:

const passedObject = {
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26,
};

//The on function that will be added to the base object expects two arguments, an eventName (a
//string ) and a callBack (a function ).
//The eventName should be of the form attributeInThePassedObject + "Changed" ; thus,
//firstNameChanged as derived from the attribute firstName in the base object.
//The callBack function, when called:
//Should be passed a value of the type associated with the name
//attributeInThePassedObject ; thus, since firstName is typed as string , the callback for
//the firstNameChanged event expects a string to be passed to it at call time. Similarly events
//associated with age should expect to be called with a number argument

//Should have void return type (for simplicity of demonstration)
//The naive function signature of on() might thus be: on(eventName: string, callBack:
//(newValue: any) => void) . However, in the preceding description, we identified important type
//constraints that we'd like to document in our code. Template Literal types let us bring these
//constraints into our code.

const person = makeWatchedObject({
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26,
});

//makeWatchedObject has added `on` to the anonymous Object

person.on("firstNameChanged", (newValue) => {
    console.log(`firstName was change to ${newValue}!`);
});

//Notice that on listens on the event "firstNameChanged" , not just "firstName" . Our naive
//specification of on() could be made more robust if we were to ensure that the set of eligible event
//names was constrained by the union of attribute names in the watched object with "Changed"
//added at the end. While we are comfortable with doing such a calculation in JavaScript i.e.
//Object.keys(passedObject).map(x => `${x}Changed`) , template literals inside the type
//system provide a similar approach to string manipulation:

type PropEventSource<T> = {
    on(eventName: `${string & keyof T}Changed`, callback: (newValue:  any))
};

//Create a "watched object" with an 'on' method
//so that you can watch for changes to properties.
declare function makeWatchedObject<T>(obj: T): T & PropEventSource

//With this, we can build something that errors when given the wrong property:

const Person = makeWatchedObject ({
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26
});

person.on("firstNameChanged", () => {});

// Prevent easy human error (using the key instead of the event name)
person.on("firstName", () => {});

//Argument of type '"firstName"' is not assignable to parameter of type
//'"firstNameChanged" | "lastNameChanged" | "ageChanged"'.

// It's typo-resistant
person.on("frstNameChanged", () => {});

//Argument of type '"frstNameChanged"' is not assignable to parameter of
//type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.

