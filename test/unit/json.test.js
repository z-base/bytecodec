import assert from "node:assert/strict";
import test from "node:test";
import { fromJSON, toJSON } from "../../dist/index.js";

test("json roundtrip", () => {
  const value = { ok: true, count: 3, nested: ["x", { y: 1 }], nil: null };
  const bytes = fromJSON(value);
  assert.deepStrictEqual(toJSON(bytes), value);
  assert.deepStrictEqual(
    toJSON('{"ok":true,"count":3,"nested":["x",{"y":1}],"nil":null}'),
    value,
  );
});

test("toJSON throws on invalid JSON", () => {
  assert.throws(
    () => toJSON("{\"ok\":true"),
    /toJSON failed to parse value/,
  );
});

test("fromJSON throws on circular values", () => {
  const value = { ok: true };
  value.self = value;
  assert.throws(
    () => fromJSON(value),
    /fromJSON failed to stringify value/,
  );
});
