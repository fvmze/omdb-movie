'use client'

import type { Movie } from '@/entities/movie'
import { Card } from '@/shared/ui/card'
import styles from './movieGrid.module.css'

interface Props {
  movies: Movie[]
}

export const MovieGrid = ({ movies }: Props) => (
  <div className={styles.grid}>
    {movies.map((movie) => {
      const image = movie.Poster !== 'N/A' ? movie.Poster : undefined

      return (
        <Card key={movie.imdbID} image={image} imdbID={movie.imdbID}>
          <Card.Header>
            <div className={styles.cardHeader}>
              <h2 className={styles.title}>{movie.Title}</h2>
              <span className={styles.year}>{movie.Year}</span>
            </div>
          </Card.Header>
          <Card.Body>
            {movie.imdbRating && <p className={styles.rating}>IMDb: {movie.imdbRating}</p>}
          </Card.Body>
        </Card>
      )
    })}
  </div>
)
