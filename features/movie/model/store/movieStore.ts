import type { MovieId } from '@entities/movie/model/types'
import { STORE_KEYS, getPersistOptions } from '@shared/lib/zustand/constants'
import { createSliceStore } from '@shared/lib/zustand/createSlice'
import { useStore } from 'zustand'

interface MovieState {
  favorites: MovieId[]
  addFavorite: (id: MovieId) => void
  removeFavorite: (id: MovieId) => void
  toggleFavorite: (id: MovieId) => void
  isFavorite: (id: MovieId) => boolean
}

// Создаем store
export const movieStore = createSliceStore<MovieState>(
  (set, get) => ({
    favorites: [],
    addFavorite: (id) =>
      set((state) => ({
        favorites: [...state.favorites, id],
      })),
    removeFavorite: (id) =>
      set((state) => ({
        favorites: state.favorites.filter((f) => f !== id),
      })),
    toggleFavorite: (id) => {
      const { isFavorite, addFavorite, removeFavorite } = get()
      isFavorite(id) ? removeFavorite(id) : addFavorite(id)
    },
    isFavorite: (id) => get().favorites.includes(id),
  }),
  {
    enablePersist: true,
    persistOptions: getPersistOptions(STORE_KEYS.MOVIE),
    enableDevtools: true,
    enableSyncTabs: true,
  },
)

// ✅ Используем useStore для хука
export const useMovieStore = <T>(selector: (state: MovieState) => T): T =>
  useStore(movieStore, selector)
