'use client'

import type { Movie } from '@/entities/movie'
import { useMovieStore } from '@/features/movie'
import { MovieGrid } from '@/features/movie/ui/movieGrid'
import { getMovieById } from '@shared/api/movie'
import { useEffect, useState } from 'react'
import styles from './favorites.module.css'

export default function FavoritesPage() {
  const [isMounted, setIsMounted] = useState(false)
  const favorites = useMovieStore((state) => state.favorites)
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || favorites.length === 0) {
      setMovies([])
      return
    }

    Promise.all(favorites.map((id: string) => getMovieById(id))).then(setMovies)
  }, [favorites, isMounted])

  if (!isMounted) return null
  if (!movies.length) return <p className={styles.empty}>No bookmarks</p>

  return (
    <main className={styles.container}>
      <MovieGrid movies={movies} />
    </main>
  )
}
