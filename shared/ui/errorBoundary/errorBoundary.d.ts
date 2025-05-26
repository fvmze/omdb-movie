import type { ReactNode } from 'react'

export interface ErrorBoundaryProps {
  fallback?: ReactNode
  children: ReactNode
  className?: string
}

export declare class ErrorBoundary extends Component<ErrorBoundaryProps> {}
