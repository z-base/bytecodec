import { BytecodecError } from "../.errors/class.js";
import type { ByteSource } from "../index.js";
import { toString } from "../toString/index.js";

export function toJSON(input: ByteSource | string): any {
  const jsonString = typeof input === "string" ? input : toString(input);
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new BytecodecError(
      "JSON_PARSE_FAILED",
      `toJSON failed to parse value: ${message}`,
    );
  }
}

