import type { Metadata } from 'next'
import '@/shared/foundation/index.css'

export const metadata: Metadata = {
  title: 'My App',
  description: 'This is a test project',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
