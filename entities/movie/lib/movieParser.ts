import {
  MovieApiError,
  MovieNotFoundError,
  MovieParsingError,
  MovieTooManyResultsError,
} from '@entities/movie'
import {
  MovieDetailSchema,
  MovieSearchResponseSchema,
  MovieSearchSuccessSchema,
} from '../model/schema'

const PLACEHOLDER_POSTER = 'https://dummyimage.com/300x445/E5E7EB/9CA3AF&text=No+Image'

function normalizePoster(poster: string): string {
  return poster && poster !== 'N/A' ? poster : PLACEHOLDER_POSTER
}

export const MovieParser = {
  parseSearchResponse(raw: unknown) {
    const parsed = MovieSearchResponseSchema.safeParse(raw)

    if (!parsed.success) {
      throw new MovieParsingError('Invalid search response')
    }

    if (parsed.data.Response === 'False') {
      const message = parsed.data.Error

      if (/not found/i.test(message)) {
        throw new MovieNotFoundError(message)
      }

      if (/too many/i.test(message)) {
        throw new MovieTooManyResultsError(message)
      }

      throw new MovieApiError(message)
    }

    // ✅ Правильная замена постеров
    const result = MovieSearchSuccessSchema.parse(parsed.data)
    const updatedSearch = result.Search.map((movie) => ({
      ...movie,
      Poster: normalizePoster(movie.Poster),
    }))

    return updatedSearch
  },

  parseDetailResponse(raw: unknown) {
    const parsed = MovieDetailSchema.safeParse(raw)

    if (!parsed.success) {
      throw new MovieParsingError('Invalid movie detail response')
    }

    return {
      ...parsed.data,
      Poster: normalizePoster(parsed.data.Poster),
    }
  },
}
