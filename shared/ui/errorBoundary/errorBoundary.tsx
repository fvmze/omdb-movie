// shared/ui/errorBoundary/errorBoundary.tsx
'use client'

import type { AppError, AppErrorCode } from '@/entities/movie/errors/movieErrors'
import { Component, type ReactNode } from 'react'
import styles from './errorBoundary.module.css'

interface Props {
  fallback?: ReactNode
  children: ReactNode
  className?: string
}

interface State {
  error: Error | null
}

const DEFAULT_MESSAGES: Record<AppErrorCode | 'UNKNOWN_ERROR', ReactNode> = {
  MOVIE_API_ERROR: <p>Oops! There was a problem with the movie API.</p>,
  MOVIE_PARSE_ERROR: <p>Unable to read movie data. Please try again later.</p>,
  MOVIE_NOT_FOUND: <p>No movies found for your query.</p>,
  MOVIE_TOO_MANY: <p>Too many results. Please refine your search.</p>,
  UNKNOWN_ERROR: <p>Something went wrong. Please try again.</p>,
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo)
  }

  render() {
    const { fallback, children, className } = this.props
    const { error } = this.state

    if (error) {
      const appError = error as Partial<AppError>
      const code = appError.code as AppErrorCode | undefined

      console.warn('[ErrorBoundary] handled error:', {
        name: error.name,
        message: error.message,
        code,
        full: error,
      })

      const message = (code && DEFAULT_MESSAGES[code]) ?? fallback ?? DEFAULT_MESSAGES.UNKNOWN_ERROR

      return (
        <div className={`${styles.fallback} ${className ?? ''}`} role='alert'>
          {message}
        </div>
      )
    }

    return children
  }
}
