//Template literal types build on string literal types, and have the ability to expand into many strings
//via unions.
//They have the same syntax as template literal strings in JavaScript, but are used in type positions.
//When used with concrete literal types, a template literal produces a new string literal type by
//concatenating the contents.

type world = "world";

type Greeting = `hello ${world}`;

//type Greeting = "hello world"

//When a union is used in the interpolated position, the type is the set of every possible string literal
//that could be represented by each union member:

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

//type EmailLocaleIDs = "welcome_email" | "email_heading" | "footer_title";

//For each interpolated position in the template literal, the unions are cross multiplied:

type AllLocaleIDss = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";

type LocaleMessageIDss = `${Lang}_${AllLocaleIDs}`;

//We generally recommend that people use ahead-of-time generation for large string unions, but this
//is useful in smaller cases.