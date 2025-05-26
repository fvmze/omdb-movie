import type { Metadata } from 'next'
import '@shared/foundation/index.css'
import { Header } from '@/widgets/header/'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'Modern OMDB-based movie catalog',
  description: 'Modern OMDB-based movie catalog with Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
