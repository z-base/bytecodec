import { BytecodecError } from "../0-ERRORS/class.js";
import { toUint8Array } from "../index.js";
export function concat(sources) {
    if (!Array.isArray(sources))
        throw new BytecodecError("CONCAT_INVALID_INPUT", "concat expects an array of ByteSource items");
    if (sources.length === 0)
        return new Uint8Array(0);
    const arrays = sources.map((source, index) => {
        try {
            return toUint8Array(source);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new BytecodecError("CONCAT_NORMALIZE_FAILED", `concat failed to normalize input at index ${index}: ${message}`);
        }
    });
    const totalLength = arrays.reduce((sum, array) => sum + array.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const array of arrays) {
        if (array.length === 0)
            continue;
        result.set(array, offset);
        offset += array.length;
    }
    return result;
}
//# sourceMappingURL=index.js.map