import {
  normalizeToUint8Array,
  isNodeRuntime,
} from "../0-HELPERS/index.js";

/**
 * Gzip-compress bytes. Returns a Promise to support browser streams.
 * @param {import("../index.d.ts").ByteSource} bytes
 * @returns {Promise<Uint8Array>}
 */
export async function toCompressed(bytes) {
  const view = normalizeToUint8Array(bytes);

  // Node: use built-in zlib
  if (isNodeRuntime()) {
    const { gzipSync } = await import("node:zlib");
    return normalizeToUint8Array(gzipSync(view));
  }

  // Browser/edge runtimes: CompressionStream with gzip
  if (typeof CompressionStream === "undefined")
    throw new Error("gzip compression not available in this environment.");

  return compressWithStream(view, "gzip");
}

async function compressWithStream(bytes, format) {
  const cs = new CompressionStream(format);
  const writer = cs.writable.getWriter();
  await writer.write(bytes);
  await writer.close();
  const arrayBuffer = await new Response(cs.readable).arrayBuffer();
  return new Uint8Array(arrayBuffer);
}
