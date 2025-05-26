'use client'

import { container } from '@/infra/di/container'
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  dehydratedState?: unknown
}

const isDevtoolsEnabled =
  process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_REACT_QUERY_DEVTOOLS === 'true'

export function ReactQueryProvider({ children, dehydratedState }: Props) {
  const queryClient = container.resolve(QueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState ?? {}}>{children}</HydrationBoundary>
      {isDevtoolsEnabled && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
