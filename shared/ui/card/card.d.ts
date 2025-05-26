import type { FC, ReactNode } from 'react'

export interface CardProps {
  children: ReactNode
  image?: string
  icon?: ReactNode
  badge?: ReactNode
  className?: string
}

export declare const Card: FC<CardProps> & {
  Header: FC<{ children: ReactNode; className?: string }>
  Body: FC<{ children: ReactNode; className?: string }>
  Footer: FC<{ children: ReactNode; className?: string }>
}
