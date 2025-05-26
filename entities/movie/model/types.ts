export type MovieId = string

export interface SearchParams {
  query: string
  type?: 'movie' | 'series' | 'episode'
  year?: string
  page?: number
  format?: 'json' | 'xml'
}

export interface DetailOptions {
  plot?: 'short' | 'full'
  format?: 'json' | 'xml'
  tomatoes?: boolean
}
