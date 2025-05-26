'use client'

import { useSearchMovies } from '../model/movie.query'

interface Props {
  initialQuery: string
}

export const MovieList = ({ initialQuery }: Props) => {
  const { data, isLoading, error } = useSearchMovies(initialQuery)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {(error as Error).message}</p>
  if (!data || data.length === 0) return <p>No movies found.</p>

  return (
    <ul className='grid grid-cols-2 gap-4'>
      {data.map((movie) => (
        <li key={movie.imdbID} className='border p-4 rounded'>
          <p className='font-semibold'>
            {movie.Title} ({movie.Year})
          </p>
          <p className='text-sm text-muted'>IMDb: {movie.imdbRating}</p>
        </li>
      ))}
    </ul>
  )
}
