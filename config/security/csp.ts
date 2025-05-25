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
    'img-src': ['https://cdn-icons-png.flaticon.com'],
    'font-src': ['https://cdn-icons-png.flaticon.com'],
    'style-src': ['https://cdn-icons-png.flaticon.com'],
  },
  globalAllowBySource: [
    {
      source: 'https://cdn-icons-png.flaticon.com',
      disableHeaders: ['Cross-Origin-Embedder-Policy'],
    },
  ],
  extraHeaders: {
    'Cross-Origin-Embedder-Policy': ['require-corp'],
    'Cross-Origin-Opener-Policy': ['same-origin'],
  },
  '/admin': {
    'script-src': ["'self'", 'https://admin.example.com'],
  },
}
