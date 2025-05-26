import { useInfiniteQuery } from '@tanstack/react-query'
import { searchMoviesInfiniteQuery } from '../query/searchMoviesInfinite.query'

export const useInfiniteSearchMovies = (query: string) => {
  return useInfiniteQuery(searchMoviesInfiniteQuery(query))
}
