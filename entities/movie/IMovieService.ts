import type { Movie, MovieDetail } from './model/dto'
import type { DetailOptions, SearchParams } from './model/types'

export interface IMovieService {
  searchMovies(params: SearchParams): Promise<Movie[]>
  getMovieById(id: string, options?: DetailOptions): Promise<MovieDetail>
  getMovieByTitle(title: string, options?: DetailOptions): Promise<MovieDetail>
}
