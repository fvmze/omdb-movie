import { container } from '@/infra/di/container'
import { TOKENS } from '@/infra/di/tokens'
import type { IMovieService, Movie } from '@entities/movie'

export const searchMoviesInfiniteQuery = (query: string) => ({
  queryKey: ['movies-infinite', query],
  queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
    const service = container.resolve<IMovieService>(TOKENS.MovieService)
    return service.searchMovies({ query, page: pageParam })
  },
  getNextPageParam: (lastPage: Movie[], allPages: Movie[][]): number | undefined => {
    return lastPage.length === 10 ? allPages.length + 1 : undefined
  },
  initialPageParam: 1,
  enabled: !!query.trim(),
})
