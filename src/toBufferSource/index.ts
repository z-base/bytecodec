import { toUint8Array } from "../index.js";
import type { ByteSource } from "../index.js";

export function toBufferSource(bytes: ByteSource): BufferSource {
  return toUint8Array(bytes);
}
