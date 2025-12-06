/* eslint-disable @typescript-eslint/no-explicit-any,no-unused-vars */
enum AppLocale {
  En = 'en',
  Chs = 'chs',
  Cht = 'cht',
  Jpn = 'jpn'
}

interface I18nMessage {
  [key: string]: string | I18nMessage
}

interface IPluginOption {
  isSSR?: boolean
  storageKeyPrefix: string
  fallbackLocale?: AppLocale
}

export {
  AppLocale
}

export type {
  I18nMessage,
  IPluginOption
}
