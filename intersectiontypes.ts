//interface s allowed us to build up new types from other types by extending them. TypeScript
//provides another construct called intersection types that is mainly used to combine existing object
//types.
//An intersection type is defined using the & operator.

type Colorful = {
    color: string;
}
type Circle = {
    radius: number;
}

type ColorfulCircle = Colorful & Circle;

//Here, we've intersected Colorful and Circle to produce a new type that has all the members of
//Colorful and Circle .

function draw(circle: Colorful & Circle) {
    console.log(`Color was ${circle.color}`);
    console.log(`Radius was ${circle.radius}`);
   }
   // okay
   draw({ color: "blue", radius: 42 });
   // oops
   draw({ color: "red", raidus: 42 });
//   Argument of type '{ color: string; raidus: number; }' is not assignable
//   to parameter of type 'Colorful & Circle'.
//    Object literal may only specify known properties, but 'raidus' does
//   not exist in type 'Colorful & Circle'. Did you mean to write 'radius'?
//   Argument of type '{ color: string; raidus: number; }' is not assignable to
//   parameter of type 'Colorful & Circle'.
//    Object literal may only specify known properties, but 'raidus' does not

//Interfaces vs. Intersections
//We just looked at two ways to combine types which are similar, but are actually subtly different.
//With interfaces, we could use an extends clause to extend from other types, and we were able to
//do something similar with intersections and name the result with a type alias. The principle
//difference between the two is how conflicts are handled, and that difference is typically one of the
//main reasons why you'd pick one over the other between an interface and a type alias of an
//intersection type.
