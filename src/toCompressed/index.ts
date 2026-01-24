import { BytecodecError } from "../.errors/class.js";
import type { ByteSource } from "../index.js";
import { isNodeRuntime } from "../.helpers/index.js";
import { toUint8Array } from "../index.js";

export async function toCompressed(bytes: ByteSource): Promise<Uint8Array> {
  const view = toUint8Array(bytes);

  // Node: use built-in zlib
  if (isNodeRuntime()) {
    const { gzipSync } = await import("node:zlib");
    return toUint8Array(gzipSync(view));
  }

  // Browser/edge runtimes: CompressionStream with gzip
  if (typeof CompressionStream === "undefined")
    throw new BytecodecError(
      "GZIP_COMPRESSION_UNAVAILABLE",
      "gzip compression not available in this environment.",
    );

  return compressWithStream(view, "gzip");
}

async function compressWithStream(
  bytes: BufferSource,
  format: CompressionFormat,
) {
  const cs = new CompressionStream(format);
  const writer = cs.writable.getWriter();
  await writer.write(bytes);
  await writer.close();
  const arrayBuffer = await new Response(cs.readable).arrayBuffer();
  return new Uint8Array(arrayBuffer);
}

