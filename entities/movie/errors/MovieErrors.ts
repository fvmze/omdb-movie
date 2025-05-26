export class MovieNotFoundError extends Error {
  constructor(message = 'Movie not found') {
    super(message)
    this.name = 'MovieNotFoundError'
  }
}

export class MovieApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MovieApiError'
  }
}

export class MovieParsingError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MovieParsingError'
  }
}
