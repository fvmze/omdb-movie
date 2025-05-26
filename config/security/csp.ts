import type { CSPConfig } from '@/shared/lib/security/types'

export const cspConfig: CSPConfig = {
  default: {
    'default-src': ["'self'"],
    'script-src': ["'self'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'"],
    'font-src': ["'self'"],
    'connect-src': ["'self'"],
    'frame-src': ["'self'"],
  },
  globalAllow: {
    'connect-src': ['https://www.omdbapi.com'],
  },
  globalAllowBySource: [],
  extraHeaders: {
    'Cross-Origin-Embedder-Policy': ['require-corp'],
    'Cross-Origin-Opener-Policy': ['same-origin'],
  },
}
