//An interface declaration is another way to name an object type:

interface Pointt {
    x: number;
    y: number;
}

function printCooorrd(pt: Pointt) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}

printCooord({ x: 100, y: 100 });

// Interface can only express fairly-static objects, but are a little more (compile-time) performant and arguably produce
// slightly better error messages.
// a type cannot be changed after begin created
//it works the same as type, but interface is always extendable. most of type you gonna use Type, but the only
//situation you may regret a bit your decision to use interface instead of type is when you're building a framework.
