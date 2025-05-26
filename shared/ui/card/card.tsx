'use client'

import type { MovieDetail } from '@/entities/movie'
import { useMovieStore } from '@/features/movie'
import { getMovieById } from '@/shared/api/movie'
import { Button } from '@/shared/ui/button'
import { Modal } from '@/shared/ui/modal'
import { cn } from '@/shared/utils/classnames/cn'
import { Skeleton } from '@shared/ui/skeleton'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { useState } from 'react'
import styles from './card.module.css'

interface CardSectionProps {
  children: ReactNode
  className?: string
}

export interface CardProps {
  children: ReactNode
  image: string | undefined
  imdbID: string
  icon?: ReactNode
  badge?: ReactNode
  className?: string
}

function Root({ children, image, icon, badge, className, imdbID }: CardProps) {
  const [hasError, setHasError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [details, setDetails] = useState<MovieDetail | null>(null)

  const fallbackImage = 'https://dummyimage.com/300x445/E5E7EB/9CA3AF&text=No+Image'
  const imageSrc = !image || hasError || image === 'N/A' ? fallbackImage : image

  const isFavorite = useMovieStore((state) => state.isFavorite(imdbID))
  const toggleFavorite = useMovieStore((state) => state.toggleFavorite)

  const handleOpenModal = () => {
    setIsOpen(true)
    if (!details) {
      getMovieById(imdbID).then(setDetails)
    }
  }

  return (
    <>
      <div className={cn(styles.card, className)}>
        <div className={styles.media}>
          <button type='button' className={styles.imageButton} onClick={handleOpenModal}>
            <Image
              src={imageSrc}
              alt=''
              width={300}
              height={445}
              className={styles.image}
              onError={() => setHasError(true)}
            />
          </button>

          {icon && <div className={styles.icon}>{icon}</div>}
          {badge && <div className={styles.badge}>{badge}</div>}

          <div className={styles.favorite}>
            <Button
              iconName={isFavorite ? 'heartFill' : 'heart'}
              size='small'
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(imdbID)
              }}
              aria-label='Toggle favorite'
            />
          </div>
        </div>
        {children}
      </div>

      <Modal open={isOpen} onCloseAction={() => setIsOpen(false)}>
        {!details ? (
          <div className={styles.modalSkeleton}>
            <Skeleton height={24} width='60%' />
            <Skeleton height={16} width='40%' />
            <Skeleton height={12} width='100%' />
            <Skeleton height={12} width='90%' />
            <Skeleton height={12} width='70%' />
          </div>
        ) : (
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>
              {details.Title} ({details.Year})
            </h2>
            <p className={styles.modalMeta}>
              {details.Genre} • {details.Runtime}
            </p>
            <p className={styles.modalText}>{details.Plot}</p>
            <p className={styles.modalMeta}>Режиссёр: {details.Director}</p>
            <p className={styles.modalMeta}>Актёры: {details.Actors}</p>
            {details.imdbRating && <p className={styles.modalMeta}>IMDb: {details.imdbRating}</p>}
          </div>
        )}
      </Modal>
    </>
  )
}

function Header({ children, className }: CardSectionProps) {
  return <div className={cn(styles.header, className)}>{children}</div>
}

function Body({ children, className }: CardSectionProps) {
  return <div className={cn(styles.body, className)}>{children}</div>
}

function Footer({ children, className }: CardSectionProps) {
  return <div className={cn(styles.footer, className)}>{children}</div>
}

export const Card = Object.assign(Root, {
  Header,
  Body,
  Footer,
})
