import type { Movie, MovieDetail } from '@/entities/movie/model/dto'
import type { DetailOptions, SearchParams } from '@/entities/movie/model/types'
import { MovieNotFoundError, MovieParser } from '@entities/movie'
import type { IMovieService } from '@entities/movie/iMovieService'
import { injectable } from 'tsyringe'
import type { MovieHttp } from '../http/movie.http'

@injectable()
export class MovieService implements IMovieService {
  constructor(private readonly client: MovieHttp) {}

  async searchMovies(params: SearchParams): Promise<Movie[]> {
    const trimmed = params.query.trim()

    if (!trimmed) return []

    if (trimmed.length < 3) {
      const data = await this.client.getByTitle(trimmed)
      try {
        const parsed = MovieParser.parseDetailResponse(data)
        return [parsed]
      } catch {
        throw new MovieNotFoundError()
      }
    }

    try {
      const searchRaw = await this.client.getBySearch(params)
      return MovieParser.parseSearchResponse(searchRaw)
    } catch (error) {
      if (error instanceof MovieNotFoundError) {
        try {
          const detailRaw = await this.client.getByTitle(trimmed)
          const parsed = MovieParser.parseDetailResponse(detailRaw)
          return [parsed]
        } catch {
          throw error
        }
      }
      throw error
    }
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
