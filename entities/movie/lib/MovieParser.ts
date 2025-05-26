import { MovieApiError, MovieParsingError } from '../errors/MovieErrors'
import {
  MovieDetailSchema,
  MovieSearchResponseSchema,
  MovieSearchSuccessSchema,
} from '../model/schema'

export const MovieParser = {
  parseSearchResponse(raw: unknown) {
    const parsed = MovieSearchResponseSchema.safeParse(raw)

    if (!parsed.success) {
      throw new MovieParsingError('Invalid search response')
    }

    if (parsed.data.Response === 'False') {
      throw new MovieApiError(parsed.data.Error)
    }

    return MovieSearchSuccessSchema.parse(parsed.data).Search
  },

  parseDetailResponse(raw: unknown) {
    const parsed = MovieDetailSchema.safeParse(raw)

    if (!parsed.success) {
      throw new MovieParsingError('Invalid movie detail response')
    }

    return parsed.data
  },
}
