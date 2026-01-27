import { BytecodecError } from '../.errors/class.js'
import type { ByteSource } from '../index.js'

export function toUint8Array(input: ByteSource): Uint8Array<ArrayBuffer> {
  if (input instanceof Uint8Array) return new Uint8Array(input)
  if (input instanceof ArrayBuffer) return new Uint8Array(input.slice(0))
  if (ArrayBuffer.isView(input)) {
    const view = new Uint8Array(
      input.buffer,
      input.byteOffset,
      input.byteLength
    )
    return new Uint8Array(view)
  }
  if (Array.isArray(input)) return new Uint8Array(input)
  throw new BytecodecError(
    'BYTE_SOURCE_EXPECTED',
    'Expected a Uint8Array, ArrayBuffer, ArrayBufferView, or number[]'
  )
}
