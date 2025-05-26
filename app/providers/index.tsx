'use client'

import type { ReactNode } from 'react'
import { ReactQueryProvider } from './reactQueryProvider'
import { ThemeInitializer } from './themeInitializer'

interface ProvidersProps {
  children: ReactNode
  dehydratedState?: unknown
}

const Providers = ({ children, dehydratedState }: ProvidersProps) => {
  return (
    <>
      <ThemeInitializer />
      <ReactQueryProvider dehydratedState={dehydratedState}>{children}</ReactQueryProvider>
    </>
  )
}

export default Providers
