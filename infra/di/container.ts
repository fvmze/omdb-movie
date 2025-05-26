import 'reflect-metadata'
import { QueryClient } from '@tanstack/react-query'
import { container } from 'tsyringe'

import { MovieHttp } from '@infra/http/movie.http'
import { MovieService } from '@infra/services/movie.service'
import { TOKENS } from './tokens'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

container.registerInstance(QueryClient, queryClient)

const movieHttp = new MovieHttp()
const movieService = new MovieService(movieHttp)

container.registerInstance(TOKENS.MovieHttpClient, movieHttp)
container.registerInstance(TOKENS.MovieService, movieService)

export { container }
