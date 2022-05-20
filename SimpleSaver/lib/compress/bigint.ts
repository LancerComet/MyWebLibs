import JSBI from 'jsbi'

let jsbi

/**
 * If BigInt is natively supported, change JSBI to use native expressions
 * @see https://github.com/GoogleChromeLabs/jsbi/blob/master/jsbi.d.ts
 * @see https://github.com/GoogleChromeLabs/babel-plugin-transform-jsbi-to-bigint/blob/master/src/index.js
 */
if (window.BigInt) {
  jsbi = {
    BigInt: (a: number) => BigInt(a),

    // note: JSBI toString is already the same: a.toString()
    toNumber: (a: string) => Number(a),

    // binary functions to expressions
    add: (a: number, b: number) => a + b,
    subtract: (a: number, b: number) => a - b,
    multiply: (a: number, b: number) => a * b,
    divide: (a: number, b: number) => a / b,
    remainder: (a: number, b: number) => a % b,
    exponentiate: (a: number, b: number) => a ** b,
    leftShift: (a: number, b: number) => (a << b),
    signedRightShift: (a: number, b: number) => a >> b,
    bitwiseAnd: (a: number, b: number) => a & b,
    bitwiseOr: (a: number, b: number) => a | b,
    bitwiseXor: (a: number, b: number) => a ^ b,
    equal: (a: number, b: number) => a === b,
    notEqual: (a: number, b: number) => a !== b,
    lessThan: (a: number, b: number) => a < b,
    lessThanOrEqual: (a: number, b: number) => a <= b,
    greaterThan: (a: number, b: number) => a > b,
    greaterThanOrEqual: (a: number, b: number) => a >= b,
    EQ: (a: number, b: number) => a === b,
    NE: (a: number, b: number) => a !== b,
    LT: (a: number, b: number) => a < b,
    LE: (a: number, b: number) => a <= b,
    GT: (a: number, b: number) => a > b,
    GE: (a: number, b: number) => a >= b,
    ADD: (a: number, b: number) => a + b,

    // unary functions to expressions
    unaryMinus: (a: number) => -a,
    bitwiseNot: (a: number) => ~a,

    // static methods
    asIntN: (a: number, b: bigint) => BigInt.asIntN(a, b),
    asUintN: (a: number, b: bigint) => BigInt.asUintN(a, b)
  }
} else {
  jsbi = JSBI
}

export default jsbi
