import { toBase64UrlString } from "../toBase64UrlString/index.js";
export function generateNonce() {
  return toBase64UrlString(crypto.getRandomValues(new Uint8Array(32)));
}
