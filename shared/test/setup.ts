import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})

declare global {
  var IS_TEST_ENV: boolean
}

globalThis.IS_TEST_ENV = true
