import { Plugin, readonly, ref } from 'vue'

import { AppLocale, I18nMessage, IPluginOption } from './types'
import { getNestedValue } from './utils'

const FALLBACK_LOCALE = AppLocale.En

let storageKeyPrefix = ''
let isInitialized = false
const localeRef = ref<AppLocale>(FALLBACK_LOCALE)

const buildStorageKey = (): string => {
  return `${storageKeyPrefix}: Locale`
}

const getInitialLocale = (): AppLocale => {
  try {
    const storageKey = buildStorageKey()
    const storageValue = localStorage.getItem(storageKey) as AppLocale
    if (storageValue) {
      return storageValue
    }

    const browserLanguage = window.navigator.language.toLocaleLowerCase()
    if (browserLanguage.includes('zh') || browserLanguage.includes('hans')) {
      return AppLocale.Chs
    }

    if (browserLanguage.includes('ja') || browserLanguage.includes('jp')) {
      return AppLocale.Jpn
    }

    return FALLBACK_LOCALE
  } catch (error) {
    console.error('[i18n] Failed to retrieve locale from localStorage:', error)
    return FALLBACK_LOCALE
  }
}

const setAppLocale = (locale: AppLocale) => {
  try {
    const storageKey = buildStorageKey()
    localStorage.setItem(storageKey, locale)
    localeRef.value = locale
  } catch (error) {
    console.error('[i18n] Failed to save locale to localStorage:', error)
  }
}

const createI18nPlugin = (options: IPluginOption): Plugin => {
  return {
    install () {
      if (isInitialized) {
        console.warn('[i18n] Plugin is already initialized.')
        return
      }

      storageKeyPrefix = options.storageKeyPrefix || 'lc_i18n_'
      localeRef.value = getInitialLocale()
      isInitialized = true
    }
  }
}

const useT = (strings: Partial<Record<AppLocale, I18nMessage>>) => {
  return (key: string): string => {
    try {
      const locale = localeRef.value
      const targetMessages = strings[locale]
      const value = getNestedValue(targetMessages, key, '')
      return String(value)
    } catch (error) {
      console.error('[i18n] i18n lookup error:', error)
      return ''
    }
  }
}

const appLocale = readonly(localeRef)

export {
  createI18nPlugin,
  useT,

  appLocale,
  setAppLocale,

  AppLocale
}

export type {
  I18nMessage,
  IPluginOption
}
