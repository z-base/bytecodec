import { BytecodecError } from "../0-ERRORS/class.js";
import { toUint8Array } from "../index.js";
const chunkSize = 0x8000;
export function toBase64UrlString(bytes) {
    const view = toUint8Array(bytes);
    const base64 = encodeBase64(view);
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function encodeBase64(bytes) {
    if (typeof Buffer !== "undefined" && typeof Buffer.from === "function")
        return Buffer.from(bytes).toString("base64");
    let binaryString = "";
    for (let offset = 0; offset < bytes.length; offset += chunkSize) {
        const end = Math.min(offset + chunkSize, bytes.length);
        let chunkString = "";
        for (let index = offset; index < end; index++) {
            chunkString += String.fromCharCode(bytes[index]);
        }
        binaryString += chunkString;
    }
    if (typeof btoa !== "function")
        throw new BytecodecError("BASE64_ENCODER_UNAVAILABLE", "No base64 encoder available in this environment.");
    return btoa(binaryString);
}
//# sourceMappingURL=index.js.map