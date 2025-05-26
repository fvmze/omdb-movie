'use client'

import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/utils/classnames/cn'
import type React from 'react'
import styles from './pagination.module.css'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChangeAction: (page: number) => void
  siblingCount?: number
}

const DOTS = '…'

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function getPaginationRange(
  current: number,
  total: number,
  siblingCount: number,
): (number | typeof DOTS)[] {
  const totalPageNumbers = siblingCount * 2 + 5

  if (total <= totalPageNumbers) return range(1, total)

  const leftSibling = Math.max(current - siblingCount, 1)
  const rightSibling = Math.min(current + siblingCount, total)

  const showLeftDots = leftSibling > 2
  const showRightDots = rightSibling < total - 1

  if (!showLeftDots && showRightDots) {
    const leftRange = range(1, 3 + siblingCount * 2)
    return [...leftRange, DOTS, total]
  }

  if (showLeftDots && !showRightDots) {
    const rightRange = range(total - (2 * siblingCount + 2), total)
    return [1, DOTS, ...rightRange]
  }

  const middleRange = range(leftSibling, rightSibling)
  return [1, DOTS, ...middleRange, DOTS, total]
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChangeAction,
  siblingCount = 1,
}) => {
  const pages = getPaginationRange(currentPage, totalPages, siblingCount)

  return (
    <nav className={styles.container} aria-label='Pagination'>
      <Button
        iconName='arrowLeft'
        disabled={currentPage === 1}
        onClick={() => onPageChangeAction(currentPage - 1)}
        aria-label='Previous page'
        className={styles.arrow}
      />

      {pages.map((page, idx) =>
        page === DOTS ? (
          <span key={`dots-${pages[idx - 1]}-${pages[idx + 1]}`} className={styles.dots}>
            {DOTS}
          </span>
        ) : (
          <Button
            key={`page-${page}`}
            onClick={() => onPageChangeAction(Number(page))}
            aria-current={currentPage === page ? 'page' : undefined}
            className={cn(styles.page, currentPage === page && styles.active)}
          >
            {page}
          </Button>
        ),
      )}

      <Button
        iconName='arrowRight'
        disabled={currentPage === totalPages}
        onClick={() => onPageChangeAction(currentPage + 1)}
        aria-label='Next page'
        className={styles.arrow}
      />
    </nav>
  )
}

Pagination.displayName = 'Pagination'
