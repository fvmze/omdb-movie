'use client'

import type { AppError } from '@/entities/movie/errors/movieErrors'
import { usePaginatedMovies } from '@/features/movie/model/hooks/usePaginatedMovies'
import { MovieSkeletons } from '@features/movie'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { MovieGrid } from '../movieGrid'
import styles from './movieList.module.css'

export const MovieList = () => {
  const query = useSearchParams().get('q')?.trim() || ''
  const observerRef = useRef<HTMLDivElement | null>(null)

  const { movies, isLoading, error, fetchNextPage, hasNextPage } = usePaginatedMovies(query)

  useEffect(() => {
    if (!hasNextPage || !observerRef.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) fetchNextPage()
    })

    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, fetchNextPage])

  if (isLoading) return <MovieSkeletons />

  const message = getErrorMessage(movies, error as AppError | undefined)
  if (message) return <p className={styles.errorMessage}>{message}</p>

  return (
    <>
      <MovieGrid movies={movies} />
      {hasNextPage && (
        <div ref={observerRef} className={styles.loadMore}>
          <MovieSkeletons />
        </div>
      )}
    </>
  )
}

function getErrorMessage(movies: unknown[], error?: AppError): string | null {
  if (error?.code === 'MOVIE_NOT_FOUND') return 'No movies found for your query.'
  if (error?.code === 'MOVIE_TOO_MANY') return 'Too many results. Please refine your search.'
  if (error?.code === 'MOVIE_API_ERROR') return 'Something went wrong. Please try again later.'
  if (!movies.length) return 'No movies found.'
  return null
}
