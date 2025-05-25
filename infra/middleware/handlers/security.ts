import { generateNonce, generateSecurityHeaders } from '@/shared/lib/security'
import type { MiddlewareHandler } from '../types'

export const withSecurityHeaders: MiddlewareHandler = (req, res) => {
  const nonce = generateNonce()
  const headers = generateSecurityHeaders(req.nextUrl.pathname, nonce)

  for (const { key, value } of headers) {
    res.headers.set(key, value)
  }

  res.headers.set('X-Nonce', nonce)
}
