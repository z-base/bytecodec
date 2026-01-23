import assert from "node:assert/strict";
import test from "node:test";
import { concat } from "../../dist/index.js";

test("concat joins mixed sources", () => {
  const left = Uint8Array.from([1, 2, 3]);
  const right = [4, 5];
  const buffer = new Uint8Array([6, 7]).buffer;
  const view = new DataView(new Uint8Array([8, 9, 10, 11]).buffer, 1, 2);

  const merged = concat([left, right, buffer, view]);
  assert.deepStrictEqual([...merged], [1, 2, 3, 4, 5, 6, 7, 9, 10]);
});

test("concat handles empty array", () => {
  const merged = concat([]);
  assert.equal(merged.length, 0);
});

test("concat skips empty entries", () => {
  const merged = concat([new Uint8Array(0), [1, 2], new Uint8Array(0)]);
  assert.deepStrictEqual([...merged], [1, 2]);
});

test("concat rejects non-array input", () => {
  assert.throws(() => concat("nope"), /concat expects an array of ByteSource/);
});

test("concat adds index info on invalid entries", () => {
  assert.throws(
    () => concat([new Uint8Array([1]), "bad"]),
    /index 1/i,
  );
});
