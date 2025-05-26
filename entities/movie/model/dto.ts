import type { z } from 'zod'
import type {
  MovieDetailSchema,
  MovieSchema,
  MovieSearchResponseSchema,
  MovieSearchSuccessSchema,
} from './schema'

export type Movie = z.infer<typeof MovieSchema>
export type MovieSearchResponse = z.infer<typeof MovieSearchResponseSchema>
export type MovieSearchSuccess = z.infer<typeof MovieSearchSuccessSchema>
export type MovieDetail = z.infer<typeof MovieDetailSchema>
