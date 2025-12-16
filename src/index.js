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
  equals,
};

/**
 * Convenience wrapper around the codec functions.
 */
export class Bytes {
  /**
   * Decode a base64url string into raw bytes.
   * @param {import("./index.d.ts").Base64URLString} base64UrlString
   * @returns {Uint8Array}
   */
  static fromBase64UrlString(base64UrlString) {
    return fromBase64UrlString(base64UrlString);
  }

  /**
   * Encode bytes into a base64url string.
   * @param {import("./index.d.ts").ByteSource} bytes
   * @returns {import("./index.d.ts").Base64URLString}
   */
  static toBase64UrlString(bytes) {
    return toBase64UrlString(bytes);
  }

  /**
   * Encode a UTF-8 string into bytes.
   * @param {string} text
   * @returns {Uint8Array}
   */
  static fromString(text) {
    return fromString(text);
  }

  /**
   * Decode bytes into a UTF-8 string.
   * @param {import("./index.d.ts").ByteSource} bytes
   * @returns {string}
   */
  static toString(bytes) {
    return toString(bytes);
  }

  /**
   * Parse JSON (string or bytes) into a JS object or value.
   * @param {import("./index.d.ts").ByteSource | string} value
   * @returns {any}
   */
  static toJSON(value) {
    return toJSON(value);
  }

  /**
   * Serialize a JS object or value into bytes.
   * @param {any} value
   * @returns {Uint8Array}
   */
  static fromJSON(value) {
    return fromJSON(value);
  }

  /**
   * Gzip-compress bytes. Returns a Uint8Array in a Promise.
   * @param {import("./index.d.ts").ByteSource} bytes
   * @returns {Promise<Uint8Array>}
   */
  static toCompressed(bytes) {
    return toCompressed(bytes);
  }

  /**
   * Gzip-decompress bytes. Returns a Uint8Array in a Promise.
   * @param {import("./index.d.ts").ByteSource} bytes
   * @returns {Promise<Uint8Array>}
   */
  static fromCompressed(bytes) {
    return fromCompressed(bytes);
  }

  /**
   * Combines ByteSources into one ByteSource / Byte array
   * @param {import("./index.d.ts").ByteSource[]} sources
   * @returns {Uint8Array}
   */
  static concat(sources) {
    return concat(sources);
  }

  /**
   * Constant-time compare for two ByteSources.
   * @param {import("./index.d.ts").ByteSource} a
   * @param {import("./index.d.ts").ByteSource} b
   * @returns {boolean}
   */
  static equals(a, b) {
    return equals(a, b);
  }
}
