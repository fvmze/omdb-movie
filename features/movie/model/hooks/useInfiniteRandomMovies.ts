// model/hooks/useInfiniteRandomMovies.ts
import { useInfiniteQuery } from '@tanstack/react-query'
import { getInfiniteRandomMoviesQuery } from '../query/randomMoviesInfinite'

export const useInfiniteRandomMovies = () => {
  return useInfiniteQuery(getInfiniteRandomMoviesQuery())
}
