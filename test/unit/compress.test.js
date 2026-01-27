import assert from 'node:assert/strict'
import test from 'node:test'
import { fromCompressed, fromString, toCompressed } from '../../dist/index.js'

test('gzip roundtrip in Node', async () => {
  const payload = fromString('compress me, please')
  const compressed = await toCompressed(payload)
  const restored = await fromCompressed(compressed)
  assert.deepStrictEqual([...restored], [...payload])
})
