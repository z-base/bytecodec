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
export { fromBase64UrlString, toBase64UrlString, fromString, toString, fromJSON, toJSON, toCompressed, fromCompressed, concat, generateNonce, toBufferSource, equals, normalizeToUint8Array, };
/**
 * Convenience wrapper around the codec functions.
 */
export declare class Bytes {
    static fromBase64UrlString(base64UrlString: Base64URLString): Uint8Array;
    static toBase64UrlString(bytes: ByteSource): Base64URLString;
    static fromString(text: string): Uint8Array;
    static toString(bytes: ByteSource): string;
    static toJSON(bytes: ByteSource | string): any;
    static fromJSON(value: any): Uint8Array;
    static toCompressed(bytes: ByteSource): Promise<Uint8Array>;
    static fromCompressed(bytes: ByteSource): Promise<Uint8Array>;
    static concat(sources: ByteSource[]): Uint8Array;
    static equals(a: ByteSource, b: ByteSource): boolean;
    static toBufferSource(bytes: ByteSource): BufferSource;
    static toUint8Array(bytes: ByteSource): Uint8Array;
}
