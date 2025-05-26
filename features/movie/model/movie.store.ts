import type { MovieId } from '@/entities/movie/model/types'
import { STORE_KEYS, getPersistOptions } from '@/shared/lib/zustand/constants'
import { createSliceStore } from '@/shared/lib/zustand/createSlice'

interface MovieState {
  favorites: MovieId[]
  addFavorite: (id: MovieId) => void
  removeFavorite: (id: MovieId) => void
  isFavorite: (id: MovieId) => boolean
}

export const useMovieStore = createSliceStore<MovieState>(
  (set, get) => ({
    favorites: [],
    addFavorite: (id) => set((state) => ({ favorites: [...state.favorites, id] })),
    removeFavorite: (id) =>
      set((state) => ({ favorites: state.favorites.filter((f) => f !== id) })),
    isFavorite: (id) => get().favorites.includes(id),
  }),
  {
    enablePersist: true,
    persistOptions: getPersistOptions(STORE_KEYS.MOVIE),
    enableDevtools: true,
  },
)
