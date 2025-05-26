import { MovieList } from '@/features/movie/ui/MovieList'
import { container } from '@/infra/di/container'
import { TOKENS } from '@/infra/di/tokens'
import type { MovieService } from '@infra/services/movie.service'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

export default async function MoviePage() {
  const queryClient = new QueryClient()
  const movieService = container.resolve<MovieService>(TOKENS.MovieService)

  const searchTerm = 'batman'

  await queryClient.prefetchQuery({
    queryKey: ['movies', { query: searchTerm }],
    queryFn: () => movieService.searchMovies({ query: searchTerm }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MovieList initialQuery={searchTerm} />
    </HydrationBoundary>
  )
}
