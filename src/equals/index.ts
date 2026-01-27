import type { ByteSource } from '../index.js'
import { toUint8Array } from '../index.js'
export function equals(x: ByteSource, y: ByteSource): boolean {
  const a = toUint8Array(x)
  const b = toUint8Array(y)
  if (a.byteLength !== b.byteLength) return false
  let diff = 0
  for (let index = 0; index < a.length; index++) diff |= a[index] ^ b[index]
  return diff === 0
}
