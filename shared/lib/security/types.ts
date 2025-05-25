export type CSPDirective = string[]
export type CSPDirectives = Partial<Record<string, CSPDirective>>

export type CSPConfig = {
  default: CSPDirectives
  globalAllow?: Record<string, string[]>
  globalAllowBySource?: {
    source: string
    disableHeaders: string[]
  }[]
  extraHeaders?: Record<string, string[]>
  [route: `/${string}`]: CSPDirectives | undefined
}

export type Nonce = string | undefined
