import { type NextRequest, NextResponse } from 'next/server'
import { withSecurityHeaders } from './handlers/security'
import { runMiddlewarePipeline } from './pipeline'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  runMiddlewarePipeline(req, res, [
    withSecurityHeaders,
    // future: withAuth(), withGeo(), ...
  ])

  return res
}

export const config = {
  matcher: ['/', '/(.*)'],
}
