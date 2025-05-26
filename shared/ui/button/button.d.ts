import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { IconProps } from '../icon'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconName?: IconProps['name']
  iconPosition?: 'left' | 'right'
  iconSize?: number | string
  children?: ReactNode
  loading?: boolean
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  variant?: 'solid' | 'ghost' | 'outline'
}
