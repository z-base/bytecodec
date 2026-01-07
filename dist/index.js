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
export { fromBase64UrlString, toBase64UrlString, fromString, toString, fromJSON, toJSON, toCompressed, fromCompressed, concat, generateNonce, toBufferSource, equals, normalizeToUint8Array, };
/**
 * Convenience wrapper around the codec functions.
 */
export class Bytes {
    static fromBase64UrlString(base64UrlString) {
        return fromBase64UrlString(base64UrlString);
    }
    static toBase64UrlString(bytes) {
        return toBase64UrlString(bytes);
    }
    static fromString(text) {
        return fromString(text);
    }
    static toString(bytes) {
        return toString(bytes);
    }
    static toJSON(bytes) {
        return toJSON(bytes);
    }
    static fromJSON(value) {
        return fromJSON(value);
    }
    static toCompressed(bytes) {
        return toCompressed(bytes);
    }
    static fromCompressed(bytes) {
        return fromCompressed(bytes);
    }
    static concat(sources) {
        return concat(sources);
    }
    static equals(a, b) {
        return equals(a, b);
    }
    static toBufferSource(bytes) {
        return toBufferSource(bytes);
    }
    static toUint8Array(bytes) {
        return normalizeToUint8Array(bytes);
    }
}
