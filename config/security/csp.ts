import type { CSPConfig } from '@/shared/lib/security/types'

export const cspConfig: CSPConfig = {
  default: {
    'default-src': ["'self'"],
    'script-src': ["'self'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'https://m.media-amazon.com'],
    'font-src': ["'self'"],
    'connect-src': ["'self'"],
    'frame-src': ["'self'"],
  },
  globalAllow: {
    'connect-src': ['https://www.omdbapi.com'],
  },
  globalAllowBySource: [],
  extraHeaders: {
    'Cross-Origin-Embedder-Policy': ['unsafe-none'],
    'Cross-Origin-Opener-Policy': ['same-origin'],
  },
}
