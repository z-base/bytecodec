import { performance } from "node:perf_hooks";
import { randomBytes } from "node:crypto";
import {
  toBase64UrlString,
  fromBase64UrlString,
  toString,
  fromString,
  toJSON,
  fromJSON,
  concat,
  normalizeToUint8Array,
  equals,
  Bytes,
} from "../dist/index.js";

function formatOps(iterations, durationMs) {
  const opsPerSec = Math.round((iterations / durationMs) * 1000);
  const ms = durationMs.toFixed(1);
  return `${opsPerSec.toLocaleString()} ops/s (${ms} ms)`;
}

function bench(name, iterations, fn) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) fn();
  const duration = performance.now() - start;
  console.log(`${name.padEnd(18)} ${formatOps(iterations, duration)}`);
}

async function benchAsync(name, iterations, fn) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) await fn();
  const duration = performance.now() - start;
  console.log(`${name.padEnd(18)} ${formatOps(iterations, duration)}`);
}

console.log("Benchmarking bytecodec...");

const sampleBytes = randomBytes(64);
const sampleBytesDiff = Uint8Array.from(sampleBytes, (value, idx) =>
  idx === sampleBytes.length - 1 ? value ^ 1 : value
);
const sampleView = new DataView(sampleBytes.buffer, 0, sampleBytes.byteLength);
const sampleText = "caffeinated rockets at dawn";
const sampleJson = { ok: true, count: 42, note: "bytecodec" };
const base64 = toBase64UrlString(sampleBytes);

bench("base64 encode", 50000, () => toBase64UrlString(sampleBytes));
bench("base64 decode", 50000, () => fromBase64UrlString(base64));
bench("utf8 roundtrip", 50000, () => toString(fromString(sampleText)));
bench("json roundtrip", 20000, () => toJSON(fromJSON(sampleJson)));
bench("concat 3 buffers", 50000, () => concat([sampleBytes, sampleBytes, sampleBytes]));
bench("normalize view", 200000, () => normalizeToUint8Array(sampleView));
bench("equals same", 200000, () => equals(sampleBytes, sampleBytes));
bench("equals diff", 200000, () => equals(sampleBytes, sampleBytesDiff));

await benchAsync("gzip roundtrip", 400, async () => {
  const compressed = await Bytes.toCompressed(sampleBytes);
  await Bytes.fromCompressed(compressed);
});

console.log("Benchmark complete.");
