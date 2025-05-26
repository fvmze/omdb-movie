'use client'

import { useThemeStore } from '@/shared/stores/theme.store'
import { useEffect } from 'react'

export const ThemeInitializer = () => {
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return null
}
