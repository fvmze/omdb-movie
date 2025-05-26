import { container } from '@/infra/di/container'
import { TOKENS } from '@/infra/di/tokens'
import type { IMovieService } from '@entities/movie'

export const searchMoviesQuery = (query: string) => ({
  queryKey: ['movies', { query }],
  queryFn: () => {
    const service = container.resolve<IMovieService>(TOKENS.MovieService)
    return service.searchMovies({ query })
  },
  enabled: !!query.trim(),
})
