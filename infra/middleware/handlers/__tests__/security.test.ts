import { describe, expect, it } from 'vitest'
import { createMockRequestResponse } from '../../__test-utils__/mockRequestResponse'
import { withSecurityHeaders } from '../security'

describe('withSecurityHeaders middleware', () => {
  it('должен выставлять X-Nonce и CSP заголовки', () => {
    const { req, res } = createMockRequestResponse('/admin')

    withSecurityHeaders(req, res)

    const nonce = res.headers.get('X-Nonce')
    const csp = res.headers.get('Content-Security-Policy')

    expect(nonce).toMatch(/^[a-f0-9]{32}$/)
    expect(csp).toContain(`'nonce-${nonce}'`)
    expect(csp).toContain('script-src')
  })
})
