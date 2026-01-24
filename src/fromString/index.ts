import { BytecodecError } from "../.errors/class.js";
import { textEncoder } from "../.helpers/index.js";

export function fromString(text: string): Uint8Array {
  if (typeof text !== "string")
    throw new BytecodecError(
      "STRING_INPUT_EXPECTED",
      "fromString expects a string input",
    );

  if (textEncoder) return textEncoder.encode(text);

  if (typeof Buffer !== "undefined" && typeof Buffer.from === "function")
    return new Uint8Array(Buffer.from(text, "utf8"));

  throw new BytecodecError(
    "UTF8_ENCODER_UNAVAILABLE",
    "No UTF-8 encoder available in this environment.",
  );
}

