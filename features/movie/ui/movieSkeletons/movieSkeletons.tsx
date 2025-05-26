'use client'

import { Skeleton } from '@/shared/ui/skeleton'
import styles from './movieSkeletons.module.css'

const skeletonKeys = Array.from(
  { length: 10 },
  (_, i) => `skeleton-${i}-${Math.random().toString(36).slice(2, 8)}`,
)

export const MovieSkeletons = () => (
  <div className={styles.grid}>
    {skeletonKeys.map((key) => (
      <Skeleton key={key} height={280} radius={12} />
    ))}
  </div>
)
