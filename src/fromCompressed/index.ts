import { BytecodecError } from '../.errors/class.js'
import { isNodeRuntime } from '../.helpers/index.js'
import { toUint8Array } from '../index.js'
import type { ByteSource } from '../index.js'

export async function fromCompressed(bytes: ByteSource): Promise<Uint8Array> {
  const view = toUint8Array(bytes)

  if (isNodeRuntime()) {
    const { gunzip } = await import('node:zlib')
    const { promisify } = await import('node:util')
    const gunzipAsync = promisify(gunzip)
    const decompressed = await gunzipAsync(view)
    return toUint8Array(decompressed)
  }

  if (typeof DecompressionStream === 'undefined')
    throw new BytecodecError(
      'GZIP_DECOMPRESSION_UNAVAILABLE',
      'gzip decompression not available in this environment.'
    )

  return decompressWithStream(view, 'gzip')
}

async function decompressWithStream(
  bytes: BufferSource,
  format: CompressionFormat
) {
  const ds = new DecompressionStream(format)
  const writer = ds.writable.getWriter()
  await writer.write(bytes)
  await writer.close()
  const arrayBuffer = await new Response(ds.readable).arrayBuffer()
  return new Uint8Array(arrayBuffer)
}
