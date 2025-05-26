'use client'

import { cn } from '@/shared/utils/classnames/cn'
import type React from 'react'
import { type ReactNode, forwardRef } from 'react'
import { Icon, type IconProps } from '../icon'
import styles from './button.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconName?: IconProps['name']
  iconPosition?: 'left' | 'right'
  iconSize?: number | 'small' | 'medium' | 'large'
  size?: 'small' | 'medium' | 'large'
  variant?: 'solid' | 'outline' | 'ghost'
  children?: ReactNode
  className?: string
  disabled?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    iconName,
    iconPosition = 'left',
    iconSize = 'medium',
    size = 'medium',
    variant = '',
    children,
    className,
    disabled,
    ...rest
  } = props

  const isIconOnly = !!iconName && !children
  const iconStyle = typeof iconSize !== 'string' ? { width: iconSize, height: iconSize } : undefined

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        styles.button,
        styles[size],
        styles[variant],
        isIconOnly && styles.iconOnly,
        className,
      )}
      {...rest}
    >
      {iconName && iconPosition === 'left' && (
        <Icon
          name={iconName}
          className={styles.icon}
          style={iconStyle}
          aria-hidden
          focusable={false}
        />
      )}
      {children && <span className={styles.content}>{children}</span>}
      {iconName && iconPosition === 'right' && (
        <Icon
          name={iconName}
          className={styles.icon}
          style={iconStyle}
          aria-hidden
          focusable={false}
        />
      )}
    </button>
  )
})

Button.displayName = 'Button'
