import { MovieList } from '@/features/movie'
import { searchMoviesQuery } from '@/features/movie/model/query/searchMovies.query'
import { getQueryClient } from '@/shared/lib/react-query'
import { ErrorBoundary } from '@/shared/ui/errorBoundary'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { headers } from 'next/headers'
import styles from './page.module.css'

export default async function HomePage() {
  const query = await getQueryFromHeaders()

  const queryClient = getQueryClient()
  if (query) {
    await queryClient.prefetchQuery(searchMoviesQuery(query))
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<p className={styles.error}>Failed to load movies.</p>}>
        <main className={styles.container}>
          <h1 className={styles.title}>{query ? `Results for "${query}"` : 'Search Movies'}</h1>
          <MovieList />
        </main>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}

async function getQueryFromHeaders(): Promise<string> {
  const headersList = await headers()
  const url = new URL(headersList.get('x-url') ?? '/', 'http://localhost')
  return url.searchParams.get('q')?.trim() || ''
}
