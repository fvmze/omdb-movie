import { describe, expect, it, vi } from 'vitest'
import { resolveDirectives } from '../resolver'

vi.mock('@config/security/csp', () => ({
  cspConfig: {
    default: {
      'default-src': ["'self'"],
    },
    globalAllow: {
      'style-src': ['https://fonts.googleapis.com'],
    },
    '/admin': {
      'script-src': ['https://admin.example.com'],
    },
  },
}))

describe.each([
  { pathname: '/', expected: ["'self'"] },
  { pathname: '/admin', expected: ['https://admin.example.com'] },
])('resolveDirectives($pathname)', ({ pathname, expected }) => {
  it(`должен вернуть корректные директивы для ${pathname}`, () => {
    const directives = resolveDirectives(pathname)
    if (pathname === '/') {
      expect(directives['default-src']).toEqual(expect.arrayContaining(expected))
      expect(directives['style-src']).toContain('https://fonts.googleapis.com')
    } else if (pathname === '/admin') {
      expect(directives['script-src']).toEqual(expect.arrayContaining(expected))
    }
  })
})
