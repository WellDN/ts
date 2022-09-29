//It's a data structure that encapsulates (or wraps) zero, one or more values. All monads need to implement a flatMap function
//(sometimes also called bind, chain or then). Monads, depending on their type, provide also additional functionality.
//monad overload a type so you don't boilerplate your code
//you overload a type, then the same that you overloaded its gonna be unwrapped with the overload in then next time that you use it
//By using monad, it can write code in a more declarative way, handle side effects and make sure that our code is typesafe
//https://mikhail.io/2018/07/monads-explained-in-csharp-again//monad-bind.png
//https://miro.medium.com/max/720/1*NAoX33R1asfD4GpaTqp0-w.png

type foo<T> = {x: T};

//one example of monad is 'maybe type' used on typescript:
//Maybe monad encapsulates a value that may, or may not exist.

const name: string | null = localStorage.getItem('name')

//Since we don't know if the key name exists in the localStorage, we need to check every time if the name variable is a null.

//Let's say we would like to make it uppercase. The code would look like this:

const name = localStorage.getItem('name')  

if (name !== null) {
  const uppercasedName = name.toUppercase()
}
// what if the name is null?

//That's ugly. Probably there are a few other ways to check if the value is not null. But why do we have to even check this?

//Wouldn't it be better if we could just perform operations on a value if it exists?

//Maybe monad to the rescue!

//Let's see how a Maybe monad could simplify that:

const namee = Maybe.from(localStorage.getItem('name'))
  .map(v => v.toUppercase())

//As you see, we can chain operations on the value using the map function (which works exactly like Array.map), without
//even worrying if the value exists - if it doesn't, the operations will not be executed.

//Now you probably see some similarities with the Promise monad too.

Maybe.from(10)
  .map(x => x + 1)
  .map(x => null)
  .map(x => {
    // this will never be executed
  })

  //vs.

  Promise.resolve(10)
  .then(v => x + 1)
  .then(v => throw new Error())
  .then(v => {
    // this will never be executed
  })


//One example of a monad is the Maybe type. Undefined null results are one particular pain point
//that many procedural languages don't provide specific tools for dealing with, requiring use of the
//null object pattern or checks to test for invalid values at each operation to handle undefined values.
//This causes bugs and makes it harder to build robust software that gracefully handles errors.
//The Maybe type forces the programmer to deal with these potentially undefined results by explicitly defining the two states of a result:
//Just ⌑result⌑, or Nothing. For example the programmer might be constructing a parser, which is to return an intermediate result, or else
//signal a condition which the parser has detected, and which programmer must also handle. With just a little extra functional spice on top, this Maybe
//type transforms into a fully-featured monad.

//How to implement Maybe in typescript?
//To start, let's decide what API we will create for our monad. Since the API is not standardized, it's up to us how we will name our functions, and how we will create the monad.

//Because we are working with TypeScript, we'll try to follow conventions set by other monads implemented in JS.

//Since Maybe does not exist natively in JavaScript, we will borrow the naming of the values from Haskell, and reference an empty value as nothing and an existing value as just.

//First, we will create a Maybe class and a representation of a non-existing value Nothing.

const Nothing = Symbol('Nothing')

class Maybe<T> {
  constructor(private value: T | typeof Nothing) {}
}

export default Maybe

//Then, we will implement a "constructor" for both states of the Maybe monad: nothing and just.

static just<T>(value: T): Maybe<T> {
    if (value === null || value === undefined) 
      return Maybe.nothing<T>()
  
    return new Maybe<T>(value)
  }
  
  static nothing<T>(): Maybe<T> {
    return new Maybe<T>(Nothing)
  }

  
//  In the just constructor, we are checking if the provided value is null or undefined and if it is, we store Nothing as a value.

//That way we've abstracted the null check away from the end user.

//Next, we will add a from method just to imitate the Array.from behaviour, and make it nicer to work with in JS.

static from <T>(value: T): Maybe<T> {
    return Maybe.just(value)
}

//Now it's time to implement the map method

public map<U>(f: (value: T) => U): Maybe<U> {
    if (this.value === nothing) return Maybe.nothing<U>()

    return Maybe.just<U>(f(this.value))
}

//If Maybe contains an empty value in it, we do not run the function passed into the map method - we abort the computations and return a Maybe in an empty state.

//However, if the value is correct, we map the value and wrap it again in the Maybe.

//Now we need to implement a way to extract the value from Maybe.

//We will implement a limited version of pattern matching.

public match<U>({ just, nothing }: { just: (value: T) => U; nothing: () => U }): U {
    if (this.value === Nothing) return nothing()
  
    return just(this.value)
  }

//  Voilà!

//We can now extract the value from the Maybe, and we are forced to define a case where the value does not exist.

const val = Maybe.from(100).match({
    just: x => `${x} exists!`,
    nothing: () => "Value was empty"
  })

  //The last, but the most important part is implementing the flatMap function. It will be very useful if we need to combine two Maybies.

  public flatMap<U>(f: (value: T) => Maybe<U>): Maybe<U> {
    if (this.value === Nothing) return Maybe.nothing<U>()
  
    return f(this.value)
  }

  //It's very similar to the map method, but this time we leave it up to the end-user to return a Maybe instance. That way we can flatten the structure and instead of having Maybe<Maybe<number>> we will have just Maybe<number>.

  const withMap = Maybe.from(4)
  .map(v => Maybe.from(v + 5)) // Maybe<Maybe<number>>

const withFlatMap = Maybe.from(4)
  .flatMap(v => Maybe.from(v + 5)) // Maybe<number>

//and that's really it! let's see the whole code:

const Nothing = Symbol('Nothing')

class Maybe<T> {
  constructor(private value: T | typeof Nothing) {}

  static just<T>(value: T): Maybe<T> {
    if (value === null || value === undefined) 
      return Maybe.nothing<T>()

    return new Maybe<T>(value)
  }

  static nothing<T>(): Maybe<T> {
    return new Maybe<T>(Nothing)
  }

  static from<T>(value: T): Maybe<T> {
    return Maybe.just(value)
  }

  public map<U>(f: (value: T) => U): Maybe<U> {
    if (this.value === Nothing) return Maybe.nothing<U>()

    return Maybe.just<U>(f(this.value))
  }

  public match<U>({ just, nothing }: { just: (value: T) => U; nothing: () => U }): U {
    if (this.value === Nothing) return nothing()

    return just(this.value)
  }

  public flatMap<U>(f: (value: T) => Maybe<U>): Maybe<U> {
    if (this.value === Nothing) return Maybe.nothing<U>()

    return f(this.value)
  }
}

export default Maybe

//It isn't that much code. Now that you know how to implement it I feel obliged to tell you that you don't have to implement it every time on your own.

//There are many libraries in the npm registry with this, and other monads already implemented.

//My favourite is tsmonads, but I'm sure you will find many more.

//How to use Maybe in the real world?
//In React you could store it in your useState hook.

//Instead of doing this:

const [value, setValue] = useState<number | null>(null)

useEffect(() => {
  setValue(100)
}, [someCondition])

return (
  <div>{value ? value : 'No value' }</div>
)

//You could do something liek this:

const [value, setValue] = useState<Maybe<number>>(Maybe.nothing<number>());

useEffect(() => {
  setValue(Maybe.from(100));
}, [someCondition]);

return (
  <div>
    {value.match({
      just: (x) => `${x} is the value`,
      nothing: () => "There is no value"
    })}
  </div>
);

//With that simple example the benefits seem small, but imagine that in this component you need to transform value many times, as is the case in real-life projects.

//Another usecase is to Maybify functions that may return null or undefined. For example Array.find:

const maybeFind = <T>(
    array: Array<T>,
    predicate: (x: T, i?: number, a?: Array<T>) => boolean
  ): Maybe<T> => Maybe.from(array.find(predicate))
  
  const value = maybeFind([false, false], x => x === true)
    .match({
      just: _ => "will never be called",
      nothing: () => "not found"
    })
  
  console.log(value) // not found  