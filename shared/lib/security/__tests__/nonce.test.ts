import { describe, expect, it } from 'vitest'
import { generateNonce } from '../nonce'

describe('generateNonce()', () => {
  it('возвращает 32-символьную hex-строку', () => {
    const nonce = generateNonce()
    expect(nonce).toMatch(/^[a-f0-9]{32}$/)
    expect(typeof nonce).toBe('string')
  })

  it('возвращает разные значения при повторных вызовах', () => {
    const a = generateNonce()
    const b = generateNonce()
    expect(a).not.toBe(b)
  })
})
