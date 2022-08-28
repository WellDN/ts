//It's pretty common to have types that might be more specific versions of other types. For example,
//we might have a BasicAddress type that describes the fields necessary for sending letters and
//packages in the U.S

interface BasicAddress {
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
}

//In some situations that's enough, but addresses often have a unit number associated with them if
//the building at an address has multiple units. We can then describe an AddressWithUnit .

interface AdressWithUnit {
    name?: string;
    unit: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
}

//This does the job, but the downside here is that we had to repeat all the other fields from
//BasicAddress when our changes were purely additive. Instead, we can extend the original
//BasicAddress type and just add the new fields that are unique to AddressWithUnit .

interface AdressWithUnit extends BasicAddress {
    unit: string;
}

//The extends keyword on an interface allows us to effectively copy members from other
//named types, and add whatever new members we want. This can be useful for cutting down the
//amount of type declaration boilerplate we have to write, and for signaling intent that several
//different declarations of the same property might be related. For example, AddressWithUnit
//didn't need to repeat the street property, and because street originates from BasicAddress ,
//a reader will know that those two types are related in some way.
//interface s can also extend from multiple types.

interface Colorful {
    color: string;
}

interface Circle {
    radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
    color: "red",
    radius: 42,
}