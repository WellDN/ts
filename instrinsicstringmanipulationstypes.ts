//To help with string manipulation, TypeScript includes a set of types which can be used in string
//manipulation. These types come built-in to the compiler for performance and can't be found in the
//.d.ts files included with TypeScript.
//Uppercase<StringType>
//Converts each character in the string to the uppercase version.
//Example

type Greeting = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting>
    //type ShoutyGreeting = "HELLO, WORLD"

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<"my_app">
    //type MainID = "ID-MY_APP"

//Lowercase<StringType>
//Converts each character in the string to the lowercase equivalent.
//Example

type Greetingg = "Hello, world"
type QuietGreeting = Lowercase<Greeting>
    //type QuietGreeting = "hello, world"

type ASCIICacheKeyy<Str extends string> = `id-${Lowercase<Str>}`
type MainIDD = ASCIICacheKey<"MY_APP">

    //type mainID = "id-my_app"

//Capitalize<StringType>
//Converts the first character in the string to an uppercase equivalent.
//Example

type LowercaseGreeting = "hello, world";
type Ggreeting = Capitalize<LowercaseGreeting>;
    //type Greeting = "Hello, world"

//Uncapitalize<StringType>
//Converts the first character in the string to a lowercase equivalent.
//Example
    
type UpppercaseGreeting = "HELLO WORLD";
type UncomfortableGreetinggg = Uncapitalize<UpppercaseGreeting>;
    //type uncomfortableGreeting = "hELLO WORLD"

//Technical details on the intrinsic string manipulation types