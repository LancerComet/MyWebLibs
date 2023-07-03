/**
 * A string describing Int64.
 */
type Int64String = string

/**
 * A string describing data in string.
 *
 * @example '2022-04-23T23:15:00Z'
 */
type DateString = string

/**
 * A JSON string.
 *
 * @example '{ "name": "John Smith" }'
 */
type JsonString = string

/**
 * Numerical boolean.
 *
 * @enum {number}
 */
enum IntBoolean {
  False = 0,
  True = 1
}

/**
 * The constructor of type T.
 *
 * @example
 *   class A {}
 *
 *   const factory = <T>(TheClass: ConstructorOf<T>): T => {
 *     return new TheClass()
 *   }
 *
 *   const a = factory(A)
 */
type ConstructorOf<T> = new (...args: any[]) => T

/**
 * An interface which is designed fro promise function.
 *
 * @interface IAsyncResult
 * @template T
 * @template E
 */
interface IAsyncResult<T = object, E = Error> {
  data?: T
  error?: E
}

export {
  Int64String,
  IntBoolean,
  DateString,
  IAsyncResult,
  JsonString,
  ConstructorOf
}
