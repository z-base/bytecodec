export const textEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder() : null;
export const textDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder() : null;
export function isNodeRuntime() {
    return typeof process !== "undefined" && !!process.versions?.node;
}
export function isSharedArrayBuffer(buffer) {
    return (typeof SharedArrayBuffer !== "undefined" &&
        buffer instanceof SharedArrayBuffer);
}
//# sourceMappingURL=index.js.map