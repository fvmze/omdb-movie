import type { Nonce } from '../types'
import { cspConfig } from './config'
import { resolveDirectives } from './resolver'

const STANDARD_HEADERS = [
  'Cross-Origin-Embedder-Policy',
  'Cross-Origin-Opener-Policy',
  'Referrer-Policy',
  'X-Frame-Options',
  'X-Content-Type-Options',
  'X-DNS-Prefetch-Control',
  'Strict-Transport-Security',
  'Permissions-Policy',
  'Cache-Control',
  'Expect-CT',
]

const toStrictRecord = (partial: Partial<Record<string, string[]>>): Record<string, string[]> =>
  Object.entries(partial).reduce(
    (acc, [key, value]) => {
      if (Array.isArray(value)) acc[key] = value
      return acc
    },
    {} as Record<string, string[]>,
  )

export const generateCSPHeader = (pathname: string, nonce?: Nonce): string | undefined => {
  const directives = toStrictRecord(resolveDirectives(pathname))

  const entries = Object.entries(directives)
    .filter(
      ([key]) => key.endsWith('-src') || ['default-src', 'style-src', 'font-src'].includes(key),
    )
    .map(([key, values]) => {
      const list = [...values]
      if (key === 'script-src' && nonce) {
        list.push(`'nonce-${nonce}'`)
      }
      return `${key} ${list.join(' ')}`
    })

  return entries.length ? entries.join('; ') : undefined
}

const isRuleSourceUsed = (source: string, directives: Record<string, string[]>): boolean =>
  Object.values(directives).some((values) => values.includes(source))

const collectDisabledHeaders = (directives: Record<string, string[]>): Set<string> => {
  const disabled = new Set<string>()
  const rules = cspConfig.globalAllowBySource ?? []

  for (const rule of rules) {
    if (!isRuleSourceUsed(rule.source, directives)) continue
    for (const header of rule.disableHeaders) {
      disabled.add(header)
    }
  }

  return disabled
}

const getExtraHeaders = (
  disabled: Set<string>,
  extraHeaders: Record<string, string[]>,
): { key: string; value: string }[] =>
  Object.entries(extraHeaders)
    .filter(([key]) => !disabled.has(key))
    .map(([key, value]) => ({ key, value: value.join(' ') }))

const getStandardHeaders = (
  directives: Record<string, string[]>,
  disabled: Set<string>,
): { key: string; value: string }[] =>
  STANDARD_HEADERS.flatMap((header) => {
    if (disabled.has(header)) return []
    const val = directives[header]
    return val?.length ? [{ key: header, value: val.join(' ') }] : []
  })

export const generateSecurityHeaders = (
  pathname: string,
  nonce?: Nonce,
): { key: string; value: string }[] => {
  const rawDirectives = resolveDirectives(pathname)
  const directives = toStrictRecord(rawDirectives)
  const disabled = collectDisabledHeaders(directives)

  const headers: { key: string; value: string }[] = [
    ...getExtraHeaders(disabled, cspConfig.extraHeaders ?? {}),
  ]

  const csp = generateCSPHeader(pathname, nonce)
  if (csp) {
    headers.push({ key: 'Content-Security-Policy', value: csp })
  }

  headers.push(...getStandardHeaders(directives, disabled))

  return headers
}
