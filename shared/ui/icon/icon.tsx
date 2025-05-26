'use client'

import { cn } from '@/shared/utils/classnames/cn'
import type { SVGProps } from 'react'
import { forwardRef } from 'react'
import styles from './icon.module.css'
import { iconRegistry } from './icon.registry'

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: keyof typeof iconRegistry
  title?: string
  desc?: string
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, title, desc, className, ...rest }, ref) => {
    const IconComponent = iconRegistry[name]

    if (!IconComponent) {
      throw new Error(`[Icon] Icon "${name}" is not registered.`)
    }

    return (
      <IconComponent
        ref={ref}
        className={cn(styles.icon, className)}
        aria-hidden={!(title || desc)}
        {...rest}
      >
        {title ? <title>{title}</title> : null}
        {desc ? <desc>{desc}</desc> : null}
      </IconComponent>
    )
  },
)

Icon.displayName = 'Icon'
