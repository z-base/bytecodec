import { BytecodecError } from "../0-ERRORS/class.js";
import { fromString } from "../fromString/index.js";
export function fromJSON(value) {
    try {
        return fromString(JSON.stringify(value));
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new BytecodecError("JSON_STRINGIFY_FAILED", `fromJSON failed to stringify value: ${message}`);
    }
}
//# sourceMappingURL=index.js.map