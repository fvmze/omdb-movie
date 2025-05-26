import type { IMovieService } from '@/entities/movie/IMovieService'
import type { MovieDetail } from '@/entities/movie/model/dto'
import type { DetailOptions } from '@/entities/movie/model/types'

export class GetMovieDetailUseCase {
  constructor(private readonly service: IMovieService) {}

  async execute(id: string, options?: DetailOptions): Promise<MovieDetail> {
    return this.service.getMovieById(id, options)
  }
}
