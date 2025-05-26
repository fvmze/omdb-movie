'use client'

import { cn } from '@/shared/utils/classnames/cn'
import type { HTMLAttributes, ReactNode } from 'react'
import styles from './skeleton.module.css'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: number | string
  height?: number | string
  radius?: number | string
  variant?: 'block' | 'complex'
  children?: ReactNode
}

export const Skeleton = ({
  width,
  height,
  radius = '0.375rem',
  className,
  style,
  variant = 'block',
  children,
  ...rest
}: SkeletonProps) => {
  if (variant === 'complex') {
    return (
      <div className={cn(styles['skeleton--complex'], className)} {...rest}>
        {children ?? (
          <div className={styles.skeleton__complexContent}>
            <div className={styles.skeleton__avatar} />
            <div className={styles.skeleton__main}>
              <div className={styles.skeleton__line} />
              <div className={styles.skeleton__lineGroup}>
                <div className={styles.skeleton__grid}>
                  <div className={styles.skeleton__gridLine1} />
                  <div className={styles.skeleton__gridLine2} />
                </div>
                <div className={styles.skeleton__line} />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(styles['skeleton--block'], className)}
      style={{
        width,
        height,
        borderRadius: radius,
        ...style,
      }}
      {...rest}
    />
  )
}
