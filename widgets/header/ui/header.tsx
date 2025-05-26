'use client'

import { SearchInput } from '@/shared/ui/searchInput'
import { ThemeToggle } from '@/shared/ui/themeToggle'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './header.module.css'

export const Header = () => {
  const pathname = usePathname()

  const isOnFavoritesPage = pathname === '/favorites'

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/' className={styles.logoLink}>
          OMDB-based
        </Link>
      </div>

      <div className={styles.search}>
        <SearchInput />
      </div>

      <nav className={styles.nav}>
        <Link href={isOnFavoritesPage ? '/' : '/favorites'} className={styles.link}>
          {isOnFavoritesPage ? 'Home' : 'Bookmarks'}
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  )
}
