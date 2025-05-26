'use client'

import { Icon } from '@/shared/ui/icon'
import { cn } from '@/shared/utils/classnames/cn'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import styles from './searchInput.module.css'

interface Props {
  className?: string
  placeholder?: string
}

export const SearchInput = ({ className, placeholder = 'Search...' }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [value, setValue] = useState('')

  useEffect(() => {
    const initial = searchParams.get('q') || ''
    setValue(initial)
  }, [searchParams])

  const updateQuery = useCallback(
    (val: string) => {
      const params = new URLSearchParams(window.location.search)
      if (val) {
        params.set('q', val)
      } else {
        params.delete('q')
      }
      router.push(`/?${params.toString()}`, { scroll: false })
    },
    [router],
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value
    setValue(val)
    updateQuery(val)
  }

  return (
    <div className={cn(styles.container, className)}>
      <Icon name='search' className={styles.icon} />
      <input
        type='text'
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  )
}
