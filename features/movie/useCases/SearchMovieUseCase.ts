import type { IMovieService } from '@/entities/movie/IMovieService'
import type { Movie } from '@/entities/movie/model/dto'
import type { SearchParams } from '@/entities/movie/model/types'

export class SearchMovieUseCase {
  constructor(private readonly service: IMovieService) {}

  async execute(params: SearchParams): Promise<Movie[]> {
    return this.service.searchMovies(params)
  }
}
