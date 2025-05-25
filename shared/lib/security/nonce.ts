export const generateNonce = (): string => {
  const buffer = new Uint8Array(16)
  globalThis.crypto.getRandomValues(buffer)
  return [...buffer].map((b) => b.toString(16).padStart(2, '0')).join('')
}
