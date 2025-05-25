import type { NextRequest, NextResponse } from 'next/server'

export type MiddlewareHandler = (req: NextRequest, res: NextResponse) => void
