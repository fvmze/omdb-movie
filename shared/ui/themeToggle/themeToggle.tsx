'use client'

import { useThemeStore } from '@/shared/stores/theme.store'
import { Icon } from '@/shared/ui/icon'
import { cn } from '@/shared/utils/classnames/cn'
import styles from './themeToggle.module.css'

export const ThemeToggle = () => {
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)

  const isDark = theme === 'dark'

  return (
    <button
      type='button'
      className={cn(styles.toggle, isDark && styles.dark)}
      onClick={toggleTheme}
      aria-label='Toggle theme'
    >
      <div className={styles.thumb}>
        <Icon name='sun' className={cn(styles.icon, styles.sun)} />
        <Icon name='moon' className={cn(styles.icon, styles.moon)} />
      </div>
    </button>
  )
}
