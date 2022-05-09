type Rule = (v: any) => boolean | string

type Validator<T> = {
  // eslint-disable-next-line no-unused-vars
  [k in keyof T]: Rule[]
}

interface IRulesMetaData {
  [key: string]: unknown[]
}

export {
  Rule,
  Validator,
  IRulesMetaData
}
