/**
 * This is the rule function type.
 *
 * @param v The value that user passed.
 */
type Rule = (v: any) => boolean | string

/**
 * A function that returns a string as the error message.
 */
type MessageFactory = () => string

/**
 * Error message.
 * It can be a string or a function which returns a string.
 */
type ErrorMessage = string | MessageFactory

type Validator<T> = {
  // eslint-disable-next-line no-unused-vars
  [k in keyof T]: Rule[]
}

export {
  Rule,
  Validator,
  ErrorMessage,
  MessageFactory
}
