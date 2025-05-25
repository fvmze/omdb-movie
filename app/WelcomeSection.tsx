'use client'

import CheckIcon from '@shared/assets/icons/check.svg'
import { useEffect, useRef } from 'react'

export const WelcomeSection = () => {
  const iconRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!iconRef.current) return

    iconRef.current.animate(
      [
        { transform: 'scale(0.8)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1 },
      ],
      {
        duration: 500,
        easing: 'ease-out',
        fill: 'forwards',
      },
    )
  }, [])

  return (
    <section
      aria-labelledby='welcome-title'
      className='flex min-h-screen flex-col items-center justify-center gap-6 bg-white text-gray-900 dark:bg-black dark:text-white'
    >
      <h1 id='welcome-title' className='text-4xl font-heading bg-border'>
        Welcome
      </h1>

      <CheckIcon
        ref={iconRef}
        title='Success'
        desc='This icon indicates successful operation'
        className='w-52 h-52 text-green-600 hover:text-green-800 transition-colors duration-300'
        aria-label='Success icon'
        role='img'
        focusable='false'
      />

      <img
        src='https://www.skyweaver.net/images/media/wallpapers/wallpaper1.jpg'
        width={128}
        height={128}
        alt='Number 2 icon'
      />

      <p className='card__iconBefore'>Success message with icon via ::before</p>
    </section>
  )
}
