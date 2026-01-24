export type BytecodecErrorCode =
  | "BASE64_DECODER_UNAVAILABLE"
  | "BASE64_ENCODER_UNAVAILABLE"
  | "BASE64URL_INVALID_LENGTH"
  | "BYTE_SOURCE_EXPECTED"
  | "CONCAT_INVALID_INPUT"
  | "CONCAT_NORMALIZE_FAILED"
  | "GZIP_COMPRESSION_UNAVAILABLE"
  | "GZIP_DECOMPRESSION_UNAVAILABLE"
  | "JSON_PARSE_FAILED"
  | "JSON_STRINGIFY_FAILED"
  | "STRING_INPUT_EXPECTED"
  | "UTF8_DECODER_UNAVAILABLE"
  | "UTF8_ENCODER_UNAVAILABLE";

export class BytecodecError extends Error {
  readonly code: BytecodecErrorCode;

  constructor(code: BytecodecErrorCode, message?: string) {
    const detail = message ?? code;
    super(`{bytecodec} ${detail}`);
    this.code = code;
    this.name = "BytecodecError";
  }
}
