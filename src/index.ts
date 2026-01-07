import { fromBase64UrlString } from "./fromBase64UrlString/index.js";
import { toBase64UrlString } from "./toBase64UrlString/index.js";
import { fromString } from "./fromString/index.js";
import { toString } from "./toString/index.js";
import { fromJSON } from "./fromJSON/index.js";
import { toJSON } from "./toJSON/index.js";
import { toCompressed } from "./toCompressed/index.js";
import { fromCompressed } from "./fromCompressed/index.js";
import { concat } from "./concat/index.js";
import { generateNonce } from "./nonce/index.js";
import { equals } from "./equals/index.js";
import { toBufferSource } from "./toBufferSource/index.js";
import { normalizeToUint8Array } from "./0-HELPERS/index.js";

export type ByteSource = Uint8Array | ArrayBuffer | ArrayBufferView | number[];

export {
  fromBase64UrlString,
  toBase64UrlString,
  fromString,
  toString,
  fromJSON,
  toJSON,
  toCompressed,
  fromCompressed,
  concat,
  generateNonce,
  toBufferSource,
  equals,
  normalizeToUint8Array,
};

/**
 * Convenience wrapper around the codec functions.
 */
export class Bytes {
  static fromBase64UrlString(base64UrlString: Base64URLString): Uint8Array {
    return fromBase64UrlString(base64UrlString);
  }

  static toBase64UrlString(bytes: ByteSource): Base64URLString {
    return toBase64UrlString(bytes);
  }

  static fromString(text: string): Uint8Array {
    return fromString(text);
  }

  static toString(bytes: ByteSource): string {
    return toString(bytes);
  }

  static toJSON(bytes: ByteSource | string): any {
    return toJSON(bytes);
  }

  static fromJSON(value: any): Uint8Array {
    return fromJSON(value);
  }

  static toCompressed(bytes: ByteSource): Promise<Uint8Array> {
    return toCompressed(bytes);
  }

  static fromCompressed(bytes: ByteSource): Promise<Uint8Array> {
    return fromCompressed(bytes);
  }

  static concat(sources: ByteSource[]): Uint8Array {
    return concat(sources);
  }

  static equals(a: ByteSource, b: ByteSource): boolean {
    return equals(a, b);
  }

  static toBufferSource(bytes: ByteSource): BufferSource {
    return toBufferSource(bytes);
  }
  static toUint8Array(bytes: ByteSource): Uint8Array {
    return normalizeToUint8Array(bytes);
  }
}
