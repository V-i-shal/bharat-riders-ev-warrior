'use client'

import { useState } from 'react'
import en from '@/locales/en.json'
import hi from '@/locales/hi.json'

const translations: Record<string, any> = { en, hi }

export function useLanguage() {
  const [lang, setLang] = useState('en')
  const t = translations[lang]
  return { lang, setLang, t }
}