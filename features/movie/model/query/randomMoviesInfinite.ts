import { container } from '@/infra/di/container'
import { TOKENS } from '@/infra/di/tokens'
import type { IMovieService, Movie } from '@entities/movie'

const randomWords = ['lego', 'love', 'war', 'night', 'man', 'life', 'dark', 'world', 'day', 'fire']

function getRandomQuery() {
  const index = Math.floor(Math.random() * randomWords.length)
  return randomWords[index]
}

export const getInfiniteRandomMoviesQuery = () => ({
  queryKey: ['random-movies-infinite'],
  queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
    const service = container.resolve<IMovieService>(TOKENS.MovieService)
    const query = getRandomQuery()
    return service.searchMovies({ query, page: pageParam })
  },
  getNextPageParam: (lastPage: Movie[], allPages: Movie[][]): number | undefined => {
    return lastPage.length === 10 ? allPages.length + 1 : undefined
  },
  initialPageParam: 1,
})
