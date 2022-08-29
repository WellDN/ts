//When you begin to use generics, you'll notice that when you create generic functions like
//identity , the compiler will enforce that you use any generically typed parameters in the body of
//the function correctly. That is, that you actually treat these parameters as if they could be any and all
//types.
//Let's take our identity function from earlier:

function identity<T>(arg:T): T {
    return arg;
}

//what if we want to also log the length of the argument arg to the console with each call? We
//might be tempted to write this:

function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);
    //Property 'length' does not exist on type 'T'.

    return arg;
}

//When we do, the compiler will give us an error that we're using the .length member of arg , but
//nowhere have we said that arg has this member. Remember, we said earlier that these type
//variables stand in for any and all types, so someone using this function could have passed in a
//number instead, which does not have a .length member.
//Let's say that we've actually intended this function to work on arrays of Type rather than Type
//directly. Since we're working with arrays, the .length member should be available. We can
//describe this just like we would create arrays of other types:

function logggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg;
}

//You may already be familiar with this style of type from other languages. In the next section, we'll
//cover how you can create your own generic types like Array<Type> .