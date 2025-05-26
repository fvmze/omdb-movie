import type { IMovieService } from '@/entities/movie/IMovieService'
import { container } from '@/infra/di/container'
import { TOKENS } from '@/infra/di/tokens'
import { useQuery } from '@tanstack/react-query'

export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ['movies', { query }],
    enabled: !!query.trim(),
    queryFn: () => {
      const service = container.resolve<IMovieService>(TOKENS.MovieService)
      return service.searchMovies({ query })
    },
  })
}
