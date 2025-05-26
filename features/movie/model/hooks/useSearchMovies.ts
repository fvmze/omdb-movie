import { useQuery } from '@tanstack/react-query'
import { searchMoviesQuery } from '../query/searchMovies.query'

export const useSearchMovies = (query: string) => {
  return useQuery(searchMoviesQuery(query))
}
