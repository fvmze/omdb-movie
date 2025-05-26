import type { IMovieService } from '@/entities/movie'
import { container } from '@/infra/di/container'
import { TOKENS } from '@/infra/di/tokens'

export const getMovieById = async (id: string) => {
  const service = container.resolve<IMovieService>(TOKENS.MovieService)
  return service.getMovieById(id)
}
