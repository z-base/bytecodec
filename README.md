# bytecodec

Typed JavaScript byte utilities for base64url, UTF-8 strings, JSON, and gzip that behave the same in browsers and Node. Built to make JavaScript/TypeScript projects with lots of byte-format data a breeze to build, without having to write your own utilities or boilerplate.

## Compatibility

- Runtimes: Node >= 18; Browsers: modern browsers with TextEncoder/TextDecoder + btoa/atob; Workers/Edge: runtimes with TextEncoder/TextDecoder + btoa/atob (gzip needs CompressionStream/DecompressionStream).
- Module format: ESM-only (no CJS build).
- Required globals / APIs: Node `Buffer` (base64/UTF-8 fallback); browser/edge `TextEncoder`, `TextDecoder`, `btoa`, `atob`; gzip in browser/edge needs `CompressionStream`/`DecompressionStream`.
- TypeScript: bundled types.

## Goals

- Developer-friendly API for base64url, UTF-8, JSON, gzip, concat, and equality.
- No dependencies or bundler shims.
- ESM-only and side-effect free for tree-shaking.
- Returns copies for safety when normalizing inputs.
- Consistent behavior across Node, browsers, and edge runtimes.

## Installation

```sh
npm install bytecodec
# or
pnpm add bytecodec
# or
yarn add bytecodec
```

## Usage

### Bytes wrapper

```js
import { Bytes } from "bytecodec";
// The `Bytes` convenience class wraps the same functions as static methods.
const encoded = Bytes.toBase64UrlString(new Uint8Array([1, 2, 3]));
```

### Base64URL

```js
import { toBase64UrlString, fromBase64UrlString } from "bytecodec";

const bytes = new Uint8Array([104, 101, 108, 108, 111]);
const encoded = toBase64UrlString(bytes);
const decoded = fromBase64UrlString(encoded);
```

### UTF-8 strings

```js
import { fromString, toString } from "bytecodec";

const textBytes = fromString("caffe and rockets");
const text = toString(textBytes);
```

### JSON

```js
import { fromJSON, toJSON } from "bytecodec";

const jsonBytes = fromJSON({ ok: true, count: 3 });
const obj = toJSON(jsonBytes);
```

### Compression

```js
import { toCompressed, fromCompressed } from "bytecodec";

const compressed = await toCompressed(new Uint8Array([1, 2, 3]));
const restored = await fromCompressed(compressed);
```

### Normalization

```js
import { toUint8Array, toArrayBuffer, toBufferSource } from "bytecodec";

const normalized = toUint8Array([1, 2, 3]);
const copied = toArrayBuffer(normalized);
const bufferSource = toBufferSource(normalized);
```

### Equality

```js
import { equals } from "bytecodec";

const isSame = equals(new Uint8Array([1, 2, 3]), new Uint8Array([1, 2, 3]));
```

### Concatenating

```js
import { concat } from "bytecodec";

const joined = concat([new Uint8Array([1, 2]), new Uint8Array([3, 4]), [5, 6]]);
```

## Runtime behavior

### Node

Uses `Buffer.from` for base64 and `TextEncoder`/`TextDecoder` when available, with `Buffer` fallback; gzip uses `node:zlib`.

### Browsers / Edge runtimes

Uses `TextEncoder`/`TextDecoder` and `btoa`/`atob`. Gzip uses `CompressionStream`/`DecompressionStream` when available.

### Validation & errors

Validation failures throw `BytecodecError` with a `code` string (for example `BASE64URL_INVALID_LENGTH`, `UTF8_DECODER_UNAVAILABLE`, `GZIP_COMPRESSION_UNAVAILABLE`), while underlying runtime errors may bubble through.

### Safety / copying semantics

Normalization helpers return copies (`Uint8Array`/`ArrayBuffer`) to avoid mutating caller-owned buffers.

## Tests

Suite: unit + integration (Node), E2E (Playwright)
Matrix: Chromium / Firefox / WebKit + mobile emulation (Pixel 5, iPhone 12)
Coverage: c8 — 100% statements/branches/functions/lines (Node)
Notes: no known skips

## Benchmarks

How it was run: `node benchmark/bench.js`
Environment: Node v22.14.0 (win32 x64)
Results:

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

Results vary by machine.

## License

MIT
