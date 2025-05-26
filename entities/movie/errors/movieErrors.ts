// entities/movie/errors/movieErrors.ts

// Общий интерфейс для ошибок приложения
export interface AppError extends Error {
  code: AppErrorCode
}

export type AppErrorCode =
  | 'MOVIE_NOT_FOUND'
  | 'MOVIE_TOO_MANY'
  | 'MOVIE_API_ERROR'
  | 'MOVIE_PARSE_ERROR'

// Базовый абстрактный класс для всех ошибок с кодом
abstract class BaseAppError extends Error implements AppError {
  abstract code: AppErrorCode

  constructor(message: string) {
    super(message)
    this.name = new.target.name
  }
}

// Конкретные ошибки
export class MovieNotFoundError extends BaseAppError {
  code: AppErrorCode = 'MOVIE_NOT_FOUND'

  constructor(message = 'Movie not found') {
    super(message)
  }
}

export class MovieTooManyResultsError extends BaseAppError {
  code: AppErrorCode = 'MOVIE_TOO_MANY'

  constructor(message = 'Too many results') {
    super(message)
  }
}

export class MovieApiError extends BaseAppError {
  code: AppErrorCode

  constructor(message: string) {
    super(message)

    if (/not found/i.test(message)) {
      this.code = 'MOVIE_NOT_FOUND'
    } else if (/too many/i.test(message)) {
      this.code = 'MOVIE_TOO_MANY'
    } else {
      this.code = 'MOVIE_API_ERROR'
    }
  }
}

export class MovieParsingError extends BaseAppError {
  code: AppErrorCode = 'MOVIE_PARSE_ERROR'

  constructor(message = 'Failed to parse movie data') {
    super(message)
  }
}
