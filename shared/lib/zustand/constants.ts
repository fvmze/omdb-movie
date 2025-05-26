import type { ZundoOptions } from 'zundo'
import type { SyncTabsOptionsType } from 'zustand-sync-tabs'
import type { PersistOptions } from 'zustand/middleware'
import { createJSONStorage } from 'zustand/middleware'
import type { StoreOptions } from './base'

export const STORE_KEYS = {
  MOVIE: 'store:movie',
  SEARCH: 'store:search',
  THEME: 'store:theme',
  SETTINGS: 'store:settings',
} as const

export const getDefaultUndoOptions = <T>(): ZundoOptions<T> => ({
  limit: 20,
  equality: Object.is,
  partialize: (state) => state,
})

export const DEFAULT_SYNC_TABS_OPTIONS: SyncTabsOptionsType = {
  name: 'shared-zustand-sync',
}

export const getPersistOptions = <T>(key: string): PersistOptions<T> => ({
  name: key,
  storage: createJSONStorage(() => localStorage),
  version: 1,
})

export const getDefaultStoreOptions = <T>(): StoreOptions<T> => ({
  enableDevtools: process.env.NODE_ENV === 'development',
  enableUndo: false,
  enablePersist: false,
  enableSyncTabs: false,
})
