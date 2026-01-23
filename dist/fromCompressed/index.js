import { BytecodecError } from "../0-ERRORS/class.js";
import { isNodeRuntime } from "../0-HELPERS/index.js";
import { toUint8Array } from "../index.js";
export async function fromCompressed(bytes) {
    const view = toUint8Array(bytes);
    if (isNodeRuntime()) {
        const { gunzipSync } = await import("node:zlib");
        return toUint8Array(gunzipSync(view));
    }
    if (typeof DecompressionStream === "undefined")
        throw new BytecodecError("GZIP_DECOMPRESSION_UNAVAILABLE", "gzip decompression not available in this environment.");
    return decompressWithStream(view, "gzip");
}
async function decompressWithStream(bytes, format) {
    const ds = new DecompressionStream(format);
    const writer = ds.writable.getWriter();
    await writer.write(bytes);
    await writer.close();
    const arrayBuffer = await new Response(ds.readable).arrayBuffer();
    return new Uint8Array(arrayBuffer);
}
//# sourceMappingURL=index.js.map