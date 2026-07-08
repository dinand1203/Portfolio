import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext({ lang: 'en', toggleLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = () => setLang((l) => (l === 'en' ? 'nl' : 'en'))

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}

// Resolve a bilingual field: t({ en, nl }) → string for the active language
export function useT() {
  const { lang } = useLang()
  return (field) => {
    if (field == null) return null
    if (typeof field === 'string') return field
    return field[lang] ?? field.en
  }
}
