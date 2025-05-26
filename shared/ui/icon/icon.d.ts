declare module '*.svg' {
  import type { FC, SVGProps } from 'react'
  const Component: FC<SVGProps<SVGSVGElement>>
  export default Component
}

declare module '*.svg?url' {
  const url: string
  export default url
}

import type { SVGProps } from 'react'
import type { iconRegistry } from './icon.registry'

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: keyof typeof iconRegistry
  title?: string
  desc?: string
}
