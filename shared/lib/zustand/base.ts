import { type ZundoOptions, temporal } from 'zundo'
import { type StateCreator, type StoreApi, type StoreMutatorIdentifier, create } from 'zustand'
import { type SyncTabsOptionsType, syncTabs } from 'zustand-sync-tabs'
import { type PersistOptions, devtools, persist } from 'zustand/middleware'

type Mutators = [StoreMutatorIdentifier, unknown][]

export interface StoreOptions<T> {
  enableUndo?: boolean
  undoOptions?: ZundoOptions<T>
  enablePersist?: boolean
  persistOptions?: PersistOptions<T>
  enableDevtools?: boolean
  enableSyncTabs?: boolean
  syncTabsOptions?: SyncTabsOptionsType
}

export function createAppStore<T>(
  initializer: StateCreator<T>,
  options: StoreOptions<T> = {},
): StoreApi<T> {
  const {
    enableUndo = false,
    undoOptions,
    enablePersist = false,
    persistOptions,
    enableDevtools = process.env.NODE_ENV === 'development',
    enableSyncTabs = false,
    syncTabsOptions,
  } = options

  let enhanced: StateCreator<T, Mutators, Mutators> = initializer as StateCreator<
    T,
    Mutators,
    Mutators
  >

  if (enableSyncTabs && syncTabsOptions) {
    enhanced = syncTabs(initializer, syncTabsOptions) as StateCreator<T, Mutators, Mutators>
  }

  if (enableUndo) {
    enhanced = temporal(enhanced, undoOptions)
  }

  if (enablePersist && persistOptions) {
    enhanced = persist(enhanced, persistOptions)
  }

  if (enableDevtools) {
    enhanced = devtools(enhanced)
  }

  return create<T>()(enhanced)
}
