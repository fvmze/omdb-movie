import type { StateCreator, StoreApi } from 'zustand'
import { type StoreOptions, createAppStore } from './base'

export function createSliceStore<T>(
  initializer: StateCreator<T>,
  options?: StoreOptions<T>,
): StoreApi<T> {
  return createAppStore(initializer, options)
}
