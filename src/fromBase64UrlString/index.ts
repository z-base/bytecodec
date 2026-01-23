import { BytecodecError } from "../0-ERRORS/class.js";

export function fromBase64UrlString(
  base64UrlString: Base64URLString,
): Uint8Array {
  const base64String = toBase64String(base64UrlString);
  return decodeBase64(base64String);
}

/**
 * From b64 URL to b64 string
 */
function toBase64String(base64UrlString: Base64URLString): string {
  let base64String = base64UrlString.replace(/-/g, "+").replace(/_/g, "/");
  const mod = base64String.length & 3;
  if (mod === 2) base64String += "==";
  else if (mod === 3) base64String += "=";
  else if (mod !== 0)
    throw new BytecodecError(
      "BASE64URL_INVALID_LENGTH",
      "Invalid base64url length",
    );
  return base64String;
}

function decodeBase64(base64String: string): Uint8Array {
  if (typeof Buffer !== "undefined" && typeof Buffer.from === "function")
    return new Uint8Array(Buffer.from(base64String, "base64"));

  if (typeof atob !== "function")
    throw new BytecodecError(
      "BASE64_DECODER_UNAVAILABLE",
      "No base64 decoder available in this environment.",
    );

  const binaryString = atob(base64String);
  const bytes = new Uint8Array(binaryString.length);
  for (let index = 0; index < binaryString.length; index++)
    bytes[index] = binaryString.charCodeAt(index);
  return bytes;
}
