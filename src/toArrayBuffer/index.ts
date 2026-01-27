import { BytecodecError } from '../.errors/class.js'
import { isSharedArrayBuffer } from '../.helpers/index.js'
import type { ByteSource } from '../index.js'

export function toArrayBuffer(bytes: ByteSource): ArrayBuffer {
  if (bytes instanceof ArrayBuffer) return bytes.slice(0)

  if (ArrayBuffer.isView(bytes)) {
    const view = new Uint8Array(
      bytes.buffer,
      bytes.byteOffset,
      bytes.byteLength
    )
    return isSharedArrayBuffer(view.buffer)
      ? view.slice().buffer
      : view.buffer.slice(view.byteOffset, view.byteOffset + view.byteLength)
  }

  if (Array.isArray(bytes)) return new Uint8Array(bytes).buffer

  throw new BytecodecError(
    'BYTE_SOURCE_EXPECTED',
    'Expected a Uint8Array, ArrayBuffer, ArrayBufferView, or number[]'
  )
}
