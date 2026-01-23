# bytecodec

Typed JavaScript byte utilities for base64url, UTF-8 strings, JSON, and BufferSource helpers that behave the same in browsers and Node.

## Highlights

- URL-safe base64 without padding; no external deps or bundler shims.
- UTF-8 encode/decode for `Uint8Array`, `ArrayBuffer`, `ArrayBufferView`, or `number[]`.
- JSON helpers (JSON.stringify/parse + UTF-8) for payloads, tokens, and storage.
- BufferSource helper that returns a Uint8Array copy for safe normalization.
- Explicit ArrayBuffer/Uint8Array helpers that return copies for safety.
- Built on ES2015 typed arrays (Uint8Array/ArrayBuffer), widely available since 2015 across modern browsers; Node >=18 supported.
- `equals()` for any supported byte input.
- ESM-only, tree-shakeable, bundled TypeScript definitions, side-effect free.

## Install

```sh
npm install bytecodec
# or
pnpm add bytecodec
# or
yarn add bytecodec
```

## Quick start

```js
import {
  toBase64UrlString,
  fromBase64UrlString,
  fromString,
  toString,
  toJSON, // bytes/string -> value
  fromJSON, // value -> bytes
  toCompressed, // gzip: bytes -> bytes (Promise)
  fromCompressed, // gzip: bytes -> bytes (Promise)
  concat, // join multiple byte sources
  toBufferSource, // ByteSource -> BufferSource (Uint8Array copy)
  toArrayBuffer, // ByteSource -> ArrayBuffer copy
  toUint8Array, // ByteSource -> Uint8Array copy
  equals, // constant-time compare for any ByteSource
  Bytes, // optional class wrapper
} from "bytecodec";

// Base64URL
const payload = new Uint8Array([104, 101, 108, 108, 111]); // "hello"
const encoded = toBase64UrlString(payload); // aGVsbG8
const decoded = fromBase64UrlString(encoded); // Uint8Array [104, 101, 108, 108, 111]

// UTF-8 strings
const textBytes = fromString("caffe and rockets"); // Uint8Array
const text = toString(textBytes); // "caffe and rockets"

// JSON
const jsonBytes = fromJSON({ ok: true, count: 3 }); // Uint8Array
const obj = toJSON(jsonBytes); // { ok: true, count: 3 }
const objFromString = toJSON('{"ok":true,"count":3}'); // also works with a JSON string

// Gzip (bytes in/out)
const compressed = await toCompressed(textBytes);
const restored = await fromCompressed(compressed);

// Concatenate
const joined = concat([textBytes, [33, 34]]); // Uint8Array [..textBytes, 33, 34]

// BufferSource (Uint8Array copy)
const view = payload.subarray(1, 4);
const bufferSource = toBufferSource(view); // Uint8Array copy

// Normalize to Uint8Array (copy)
const normalized = toUint8Array([1, 2, 3]); // Uint8Array [1, 2, 3]

// Copy to ArrayBuffer
const copied = toArrayBuffer(view); // ArrayBuffer with bytes 101, 108, 108

// Constant-time compare
const isSame = equals(joined, concat([textBytes, [33, 34]])); // true

// Wrapper mirrors the same methods (value -> bytes via fromJSON, bytes -> value via toJSON)
Bytes.toBase64UrlString(payload);
Bytes.fromBase64UrlString(encoded);
Bytes.fromString("text");
Bytes.toString(textBytes);
Bytes.fromJSON({ ok: true });
Bytes.toJSON(jsonBytes); // or Bytes.toJSON('{"ok":true}')
await Bytes.toCompressed(payload);
await Bytes.fromCompressed(compressed);
Bytes.concat([payload, [1, 2, 3]]);
Bytes.toBufferSource(payload);
Bytes.toUint8Array(payload);
Bytes.toArrayBuffer(payload);
Bytes.equals(payload, Uint8Array.from(payload));
```

## API snapshot

- `toBase64UrlString(bytes: ByteSource): Base64URLString` - RFC 4648 base64url encoding (no padding).
- `fromBase64UrlString(base64UrlString: Base64URLString): Uint8Array` - decode with length validation.
- `fromString(text: string): Uint8Array` - UTF-8 encode.
- `toString(bytes: ByteSource): string` - UTF-8 decode.
- `toJSON(input: ByteSource | string): any` - UTF-8 decode + `JSON.parse` (bytes or JSON string -> value).
- `fromJSON(value: any): Uint8Array` - `JSON.stringify` + UTF-8 encode (value -> bytes).
- `toCompressed(bytes: ByteSource): Promise<Uint8Array>` - gzip compress bytes (Node zlib or browser CompressionStream).
- `fromCompressed(bytes: ByteSource): Promise<Uint8Array>` - gzip decompress bytes (Node zlib or browser DecompressionStream).
- `concat(sources: ByteSource[]): Uint8Array` - normalize and join multiple byte sources into one Uint8Array.
- `toBufferSource(bytes: ByteSource): BufferSource` - normalize to Uint8Array typed as BufferSource.
- `toArrayBuffer(bytes: ByteSource): ArrayBuffer` - normalize to ArrayBuffer copy.
- `toUint8Array(bytes: ByteSource): Uint8Array` - normalize to a Uint8Array copy.
- `equals(a: ByteSource, b: ByteSource): boolean` - equality check for any supported byte inputs.
- `Bytes` - class wrapper exposing the same static methods above.

### Types

```ts
type ByteSource = Uint8Array | ArrayBuffer | ArrayBufferView | number[];
```

`Base64URLString` and `BufferSource` are built-in DOM types in TypeScript.

## Runtime behavior

- Node: uses `Buffer.from` for base64; UTF-8 uses `TextEncoder`/`TextDecoder` when available, with `Buffer` fallback.
- Browsers/edge runtimes: uses `TextEncoder`/`TextDecoder` and `btoa`/`atob`.
- Throws clear errors when the host cannot encode/decode.

## Testing

Tests currently pass with 100% c8 coverage in Node. Browser E2E runs across
Chromium, Firefox, WebKit, plus mobile emulation (Pixel 5, iPhone 12).

## Benchmarks

`node benchmark/bench.js` on Node v22.14.0 (win32 x64). Results vary by machine.

| Benchmark        | Result                     |
| ---------------- | -------------------------- |
| base64 encode    | 514,743 ops/s (97.1 ms)    |
| base64 decode    | 648,276 ops/s (77.1 ms)    |
| utf8 encode      | 1,036,895 ops/s (48.2 ms)  |
| utf8 decode      | 2,893,954 ops/s (17.3 ms)  |
| json encode      | 698,985 ops/s (28.6 ms)    |
| json decode      | 791,690 ops/s (25.3 ms)    |
| concat 3 buffers | 617,497 ops/s (81.0 ms)    |
| toUint8Array     | 10,149,502 ops/s (19.7 ms) |
| toArrayBuffer    | 620,992 ops/s (322.1 ms)   |
| toBufferSource   | 8,297,585 ops/s (24.1 ms)  |
| equals same      | 4,035,195 ops/s (49.6 ms)  |
| equals diff      | 2,760,784 ops/s (72.4 ms)  |
| gzip compress    | 10,275 ops/s (38.9 ms)     |
| gzip decompress  | 18,615 ops/s (21.5 ms)     |

## License

MIT
