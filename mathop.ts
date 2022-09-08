const ops = {
    "+": (l, r) => l + r,
    "-": (l, r) => l - r,
    "*": (l, r) => l * r,   //4 basic math operations for each number
    "/": (l, r) => l / r,
  }
export const basicOp = (operation: keyof typeof ops, value1: number, value2: number): number => (
    ops[operation](value1, value2)
)

//the keyof takes a object and produces a string or numeric literal union of its keys. keyof is mapping the ops as onion
// a typeof operator which can give very basic information about the type of values we have at runtime
//typeof basically return what the actual type is ex: console.log(typeof helloworld); its gonna return 'string' instead of the literal.