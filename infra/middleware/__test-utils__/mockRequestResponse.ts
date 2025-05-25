import { type NextRequest, NextResponse } from 'next/server'

export const createMockRequestResponse = (pathname = '/') => {
  const url = new URL(`http://localhost${pathname}`)

  const req = {
    nextUrl: url,
  } as unknown as NextRequest

  const res = NextResponse.next()

  return { req, res }
}
