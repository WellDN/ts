//when we assign to any variable, TypeScript looks at the right side of the assignment and narrows the left side
//appropriately.

let b = Math.random() < 0.5 ? 10 : "hello world!";
    //let b: string | number

    b = 1;

    console.log(b);
    //let b: number

    b = "goodbye!";
    
    console.log(b);

    //let b: string

    /*Notice that each of these assignments is valid. Even though the observed type of x changed to
number after our first assignment, we were still able to assign a string to x . This is because the
declared type of x - the type that x started with - is string | number , and assignability is
always checked against the declared type.
If we'd assigned a boolean to x , we'd have seen an error since that wasn't part of the declared
type.
 */

let c = Math.random() < 0.5 ? 10 : "hello world!";
    //let b: string | number

    c = 1;

    console.log(b);
    //let b: number

    //c = true;
    //Type 'boolean' is not assignable to type 'string | number'.

    console.log(b);
    //let x: string | number