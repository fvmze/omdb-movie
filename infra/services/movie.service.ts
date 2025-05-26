import type { IMovieService } from '@/entities/movie/IMovieService'
import { MovieParser } from '@/entities/movie/lib/MovieParser'
import type { Movie, MovieDetail } from '@/entities/movie/model/dto'
import type { DetailOptions, SearchParams } from '@/entities/movie/model/types'
import { injectable } from 'tsyringe'
import type { MovieHttp } from '../http/movie.http'

@injectable()
export class MovieService implements IMovieService {
  constructor(private readonly client: MovieHttp) {}

  async searchMovies(params: SearchParams): Promise<Movie[]> {
    const data = await this.client.getBySearch(params)
    return MovieParser.parseSearchResponse(data)
  }

  async getMovieById(id: string, options?: DetailOptions): Promise<MovieDetail> {
    const data = await this.client.getById(id, options)
    return MovieParser.parseDetailResponse(data)
  }

  async getMovieByTitle(title: string, options?: DetailOptions): Promise<MovieDetail> {
    const data = await this.client.getByTitle(title, options)
    return MovieParser.parseDetailResponse(data)
  }
}
