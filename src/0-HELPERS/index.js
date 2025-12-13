/**
 * @param {import("../index.d.ts").ByteSource} input
 * @returns {Uint8Array}
 */
export function normalizeToUint8Array(input) {
  if (input instanceof Uint8Array) return input;
  if (input instanceof ArrayBuffer) return new Uint8Array(input);
  if (ArrayBuffer.isView(input))
    return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
  if (Array.isArray(input)) return new Uint8Array(input);
  throw new TypeError(
    "Expected a Uint8Array, ArrayBuffer, ArrayBufferView, or number[]"
  );
}

export const textEncoder =
  typeof TextEncoder !== "undefined" ? new TextEncoder() : null;

export const textDecoder =
  typeof TextDecoder !== "undefined" ? new TextDecoder() : null;

/**
 * Detect Node runtime.
 * @returns {boolean}
 */
export function isNodeRuntime() {
  return typeof process !== "undefined" && !!process.versions?.node;
}
