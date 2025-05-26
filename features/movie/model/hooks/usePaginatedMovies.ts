// usePaginatedMovies.ts
import { useInfiniteRandomMovies, useInfiniteSearchMovies } from '@/features/movie'

export const usePaginatedMovies = (query: string) => {
  const {
    data: searchData,
    fetchNextPage: fetchSearchNextPage,
    hasNextPage: hasSearchNextPage,
    isLoading: isSearchLoading,
    error: searchError,
  } = useInfiniteSearchMovies(query)

  const {
    data: randomData,
    fetchNextPage: fetchRandomNextPage,
    hasNextPage: hasRandomNextPage,
    isLoading: isRandomLoading,
    error: randomError,
  } = useInfiniteRandomMovies()

  const isSearchMode = !!query.trim()

  return isSearchMode
    ? {
        movies: searchData?.pages.flat() ?? [],
        isLoading: isSearchLoading,
        error: searchError,
        fetchNextPage: fetchSearchNextPage,
        hasNextPage: hasSearchNextPage,
      }
    : {
        movies: randomData?.pages.flat() ?? [],
        isLoading: isRandomLoading,
        error: randomError,
        fetchNextPage: fetchRandomNextPage,
        hasNextPage: hasRandomNextPage,
      }
}
