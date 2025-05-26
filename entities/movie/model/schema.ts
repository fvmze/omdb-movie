import { z } from 'zod'

export const MovieSchema = z.object({
  imdbID: z.string(),
  Title: z.string(),
  Year: z.string(),
  Type: z.string(),
  Poster: z.string().url().or(z.literal('N/A')),
  imdbRating: z.string().optional(),
})

export const MovieSearchSuccessSchema = z.object({
  Search: z.array(MovieSchema),
  totalResults: z.string(),
  Response: z.literal('True'),
})

export const MovieSearchErrorSchema = z.object({
  Response: z.literal('False'),
  Error: z.string(),
})

export const MovieSearchResponseSchema = z.union([MovieSearchSuccessSchema, MovieSearchErrorSchema])

export const MovieDetailSchema = z.object({
  Title: z.string(),
  Year: z.string(),
  Rated: z.string().optional(),
  Released: z.string().optional(),
  Runtime: z.string().optional(),
  Genre: z.string().optional(),
  Director: z.string().optional(),
  Writer: z.string().optional(),
  Actors: z.string().optional(),
  Plot: z.string().optional(),
  Language: z.string().optional(),
  Country: z.string().optional(),
  Awards: z.string().optional(),
  Poster: z.string().url().or(z.literal('N/A')),
  Metascore: z.string().optional(),
  imdbRating: z.string().optional(),
  imdbVotes: z.string().optional(),
  imdbID: z.string(),
  Type: z.string(),
  totalSeasons: z.string().optional(),
  Response: z.literal('True'),
})
