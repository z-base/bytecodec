import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import {
  toBase64UrlString,
  fromBase64UrlString,
  fromString,
  toString,
  toJSON,
  fromJSON,
  toCompressed,
  fromCompressed,
  concat,
  toBufferSource,
  normalizeToUint8Array,
  generateNonce,
  equals,
  Bytes,
} from "./dist/index.js";

async function runTest(name, fn) {
  console.time(name);
  await fn();
  console.timeEnd(name);
  console.log(`✔ ${name}`);
}

async function testBase64() {
  const payload = randomBytes(32);
  const encoded = toBase64UrlString(payload);
  const decoded = fromBase64UrlString(encoded);
  assert.deepStrictEqual(Buffer.from(decoded), Buffer.from(payload));
  console.log("base64 sample encoded:", encoded);
  console.log("base64 payload length:", payload.byteLength);

  const helloBytes = fromString("hello");
  assert.equal(toBase64UrlString(helloBytes), "aGVsbG8");
  assert.deepStrictEqual(fromBase64UrlString("aGVsbG8"), helloBytes);
  console.log("base64 hello bytes:", [...helloBytes]);
}

async function testStrings() {
  const text = "héllo ✓ rocket 🚀";
  const bytes = fromString(text);
  assert.equal(toString(bytes), text);
  console.log("strings input:", text);
  console.log("strings byte length:", bytes.byteLength);
}

async function testJSON() {
  const value = { ok: true, count: 3, nested: ["x", { y: 1 }], nil: null };
  const jsonBytes = fromJSON(value);
  assert.ok(jsonBytes instanceof Uint8Array);
  assert.deepStrictEqual(toJSON(jsonBytes), value);
  assert.deepStrictEqual(
    toJSON('{"ok":true,"count":3,"nested":["x",{"y":1}],"nil":null}'),
    value
  );
  console.log("json value:", JSON.stringify(value));
  console.log("json bytes length:", jsonBytes.byteLength);
}

async function testCompression() {
  const payload = fromString("compress me, please!");
  const compressed = await toCompressed(payload);
  const restored = await fromCompressed(compressed);
  assert.deepStrictEqual(Buffer.from(restored), Buffer.from(payload));
  console.log("compression original length:", payload.byteLength);
  console.log("compression compressed length:", compressed.byteLength);
}

async function testConcat() {
  const left = Uint8Array.from([1, 2, 3]);
  const right = [4, 5];
  const buffer = new Uint8Array([6, 7]).buffer;
  const dataView = new DataView(new Uint8Array([8, 9, 10, 11]).buffer, 1, 2); // bytes 9, 10

  const merged = concat([left, right, buffer, dataView]);
  assert.deepStrictEqual([...merged], [1, 2, 3, 4, 5, 6, 7, 9, 10]);
  assert.deepStrictEqual(concat([]), new Uint8Array(0));

  assert.throws(() => concat("oops"), /array of ByteSource/i);
  assert.throws(() => concat([new Uint8Array([1]), "oops"]), /index 1/i);

  console.log("concat merged length:", merged.byteLength);
}

async function testBufferSource() {
  const source = Uint8Array.from([10, 20, 30, 40]);
  const slice = source.subarray(1, 3);
  const view = toBufferSource(slice);
  assert.strictEqual(view, slice);
  assert.deepStrictEqual([...view], [20, 30]);

  const dataView = new DataView(source.buffer, 2, 2);
  const dataViewResult = toBufferSource(dataView);
  assert.ok(dataViewResult instanceof Uint8Array);
  assert.deepStrictEqual([...dataViewResult], [30, 40]);

  const fromBuffer = toBufferSource(source.buffer);
  assert.ok(fromBuffer instanceof Uint8Array);
  assert.strictEqual(fromBuffer.buffer, source.buffer);

  const wrapperView = Bytes.toBufferSource(slice);
  assert.strictEqual(wrapperView, slice);

  console.log("buffersource length:", view.byteLength);
}

async function testNormalizeToUint8Array() {
  const source = Uint8Array.from([1, 2, 3, 4]);
  const normalized = normalizeToUint8Array(source);
  assert.strictEqual(normalized, source);

  const fromBuffer = normalizeToUint8Array(source.buffer);
  assert.ok(fromBuffer instanceof Uint8Array);
  assert.strictEqual(fromBuffer.buffer, source.buffer);
  assert.deepStrictEqual([...fromBuffer], [1, 2, 3, 4]);

  const dataView = new DataView(source.buffer, 1, 2);
  const fromView = normalizeToUint8Array(dataView);
  assert.ok(fromView instanceof Uint8Array);
  assert.deepStrictEqual([...fromView], [2, 3]);

  const fromArray = normalizeToUint8Array([9, 8]);
  assert.deepStrictEqual([...fromArray], [9, 8]);

  assert.throws(() => normalizeToUint8Array("oops"), /Expected/);

  const wrapper = Bytes.toUint8Array(source);
  assert.strictEqual(wrapper, source);

  const wrapperArray = Bytes.toUint8Array([7, 8]);
  assert.deepStrictEqual([...wrapperArray], [7, 8]);

  console.log("normalize length:", normalized.byteLength);
}

async function testEquals() {
  const left = Uint8Array.from([1, 2, 3, 4]);
  const same = new Uint8Array(left);
  const numberArray = [1, 2, 3, 4];
  const buffer = new Uint8Array([1, 2, 3, 4]).buffer;
  const view = new DataView(new Uint8Array([0, 1, 2, 3, 9]).buffer, 1, 4); // 1,2,3,9

  assert.equal(equals(left, same), true);
  assert.equal(equals(left, numberArray), true);
  assert.equal(equals(left, buffer), true);
  assert.equal(equals(left, view), false);
  assert.equal(equals(left, [1, 2, 3, 5]), false);
  assert.throws(() => equals("oops", left), /Expected/);
  assert.equal(Bytes.equals(left, numberArray), true);

  console.log("equals sample:", equals(left, numberArray));
}

async function testNonce() {
  const nonceA = generateNonce();
  const nonceB = generateNonce();

  assert.equal(typeof nonceA, "string");
  assert.equal(nonceA.length, 43);
  assert.match(nonceA, /^[A-Za-z0-9_-]+$/);
  assert.notEqual(nonceA, nonceB);
  assert.equal(fromBase64UrlString(nonceA).byteLength, 32);

  console.log("nonce sample:", nonceA);
}

async function testBytesWrapper() {
  const payload = Uint8Array.from([1, 2, 3, 4]);
  const encoded = Bytes.toBase64UrlString(payload);
  assert.deepStrictEqual(Bytes.fromBase64UrlString(encoded), payload);

  const text = "wrapper check";
  assert.equal(Bytes.toString(Bytes.fromString(text)), text);

  const value = { wrapper: true, items: [1, 2, 3] };
  const jsonBytes = Bytes.fromJSON(value);
  assert.ok(jsonBytes instanceof Uint8Array);
  assert.deepStrictEqual(Bytes.toJSON(jsonBytes), value);

  const compressed = await Bytes.toCompressed(payload);
  const restored = await Bytes.fromCompressed(compressed);
  assert.deepStrictEqual(Buffer.from(restored), Buffer.from(payload));

  const joined = Bytes.concat([payload, [5, 6]]);
  assert.deepStrictEqual([...joined], [1, 2, 3, 4, 5, 6]);

  console.log("bytes wrapper encoded:", encoded);
  console.log("bytes wrapper json bytes length:", jsonBytes.byteLength);
  console.log("bytes wrapper compressed length:", compressed.byteLength);
}

async function main() {
  console.log("Running bytecodec tests...");
  console.time("total");
  await runTest("base64", testBase64);
  await runTest("strings", testStrings);
  await runTest("json", testJSON);
  await runTest("compression", testCompression);
  await runTest("concat", testConcat);
  await runTest("buffersource", testBufferSource);
  await runTest("normalize", testNormalizeToUint8Array);
  await runTest("equals", testEquals);
  await runTest("nonce", testNonce);
  await runTest("bytes-wrapper", testBytesWrapper);
  console.timeEnd("total");
  console.log("All tests passed ✅");
}

main();
