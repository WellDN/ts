//Truthiness might not be a word you'll find in the dictionary, but it's very much something you'll
//hear about in JavaScript.
//In JavaScript, we can use any expression in conditionals, && s, || s, if statements, Boolean
//negations ( ! ), and more. As an example, if statements don't expect their condition to always
//have the type boolean .

function getUserOnlineMessage(numUserOnline: number) {
    if (numUserOnline) {
        return `There are ${numUserOnline} Online now!`;
    }
    return "Nobody's here. :(";
}

//In JavaScript, constrcuts like if first "coerce" their conditions to boolean's to make sens of them, and then choose
//their branches depending on whether the result is true or false. Values like
/*
0
NaN
""(the empty string)
0n (the bigint version of zero)
null
undefined

All coerce to false, and other values get coerced true. You can always coerce values to boolean's by runnign them through the Boolean
function, or by using the shorter double-Boolean negation. (The latter has the advantage that TypeScript infers a narrow literal
    boolean type true, while inferring the first as type boolean.)
 */

    //both of these result in 'true'
    Boolean("hello"); //type: boolean, value: true
    !!"world"; //type: true, value:true

    //it's fairly popular to leverage this behavior, especially for guarding against values like null or undefined. As an examples,
    //let's try using it for our printAll function.

    function printAllll(strs: string | string[] | null) {
        if (strs && typeof strs === "object") {
            for (const s of strs) {
                console.log(s);
            }
        } else if (typeof strs === "string") {
            console.log(strs);
        }
    }

    //You'll notice that we've gotten rid of the error above by checking if strs is truthy. this at least prevent us from dreaded
    //errors when we run our code like:

    //TypeError: null is not iterable

    //Keep in mind through that truthiness checking on primitives can often be error prone. As an example, consider a differente
    //attempt at wrtiting printAll

    function printAlll(strs: string | string[] | null) {
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!
        // DON'T DO THIS!
        // KEEP READING!
        // !!!!!!!!!!!
        if(strs) {
            if (typeof strs === "object") {
                for (const s of strs) {
                    console.log(s);
                }
            } else if (typeof strs === "string") {
                console.log(strs);
            }
        }
    }

    //We wrapped the entire body of the funtion in a truthy check, but this a subtle downside: we may no longe be handling
    //the empty string case correctly

//TypeScript doesn't hurt us here at all, but this is behavior worth noting if you're less familiar with
//JavaScript. TypeScript can often help you catch bugs early on, but if you choose to do nothing with
//a value, there's only so much that it can do without being overly prescriptive. If you want, you can
//make sure you handle situations like these with a linter.
//One last word on narrowing by truthiness is that Boolean negations with ! filter out from negated
//branches.

function multiplyAll(
    values: number[] | undefined,
    factor: number
): number[] | undefined {
    if (!values) {
        return values;
    } else {
        return values.map((x) => x * factor);
    }
}