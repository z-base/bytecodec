import { BytecodecError } from "../.errors/class.js";
import { textDecoder } from "../.helpers/index.js";
import { toUint8Array } from "../index.js";
import type { ByteSource } from "../index.js";

export function toString(bytes: ByteSource): string {
  const view = toUint8Array(bytes);

  if (textDecoder) return textDecoder.decode(view);

  if (typeof Buffer !== "undefined" && typeof Buffer.from === "function")
    return Buffer.from(view).toString("utf8");

  throw new BytecodecError(
    "UTF8_DECODER_UNAVAILABLE",
    "No UTF-8 decoder available in this environment.",
  );
}

