import type { NextRequest, NextResponse } from 'next/server'
import type { MiddlewareHandler } from './types'

export const runMiddlewarePipeline = (
  req: NextRequest,
  res: NextResponse,
  middlewares: MiddlewareHandler[],
): void => {
  for (const handler of middlewares) {
    handler(req, res)
  }
}
