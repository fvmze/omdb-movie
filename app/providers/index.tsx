'use client'

import type { ReactNode } from 'react'
import { ReactQueryProvider } from './ReactQueryProvider'

interface ProvidersProps {
  children: ReactNode
  dehydratedState?: unknown
}

const Providers = ({ children, dehydratedState }: ProvidersProps) => {
  return <ReactQueryProvider dehydratedState={dehydratedState}>{children}</ReactQueryProvider>
}

export default Providers
