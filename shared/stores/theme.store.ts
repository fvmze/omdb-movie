import { STORE_KEYS, getPersistOptions } from '@/shared/lib/zustand/constants'
import { createSliceStore } from '@/shared/lib/zustand/createSlice'
import { useStore } from 'zustand' // <- важно

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const themeStore = createSliceStore<ThemeState>(
  (set) => ({
    theme: 'light',
    setTheme: (theme) => set({ theme }),
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  }),
  {
    enablePersist: true,
    persistOptions: getPersistOptions<ThemeState>(STORE_KEYS.THEME),
  },
)

export const useThemeStore = <T>(selector: (state: ThemeState) => T): T =>
  useStore(themeStore, selector)
