import type { CSPDirectives } from '../types'
import { cspConfig } from './config'

const isCspRoute = (key: string): key is `/${string}` =>
  key.startsWith('/') &&
  key !== '/default' &&
  !['globalAllow', 'globalAllowBySource', 'extraHeaders'].includes(key)

export const resolveDirectives = (pathname: string): CSPDirectives => {
  const result: CSPDirectives = {}

  const merge = (source?: CSPDirectives) => {
    for (const [key, values] of Object.entries(source ?? {})) {
      result[key] = Array.from(new Set([...(result[key] ?? []), ...(values ?? [])]))
    }
  }

  merge(cspConfig.default)
  merge(cspConfig.globalAllow)

  const matched = Object.entries(cspConfig)
    .filter(([key]) => isCspRoute(key) && pathname.startsWith(key))
    .sort((a, b) => b[0].length - a[0].length)[0]

  if (matched) {
    const directives = matched[1] as CSPDirectives
    merge(directives)
  }

  return result
}
