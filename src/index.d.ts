export type Base64URLString = string;

export type ByteSource =
  | Uint8Array
  | ArrayBuffer
  | ArrayBufferView
  | number[];

export function toBase64UrlString(bytes: ByteSource): Base64URLString;

export function fromBase64UrlString(
  base64UrlString: Base64URLString,
): Uint8Array;

export function fromString(text: string): Uint8Array;

export function toString(bytes: ByteSource): string;

export function toJSON(input: ByteSource | string): any;

export function fromJSON(value: any): Uint8Array;

export function toCompressed(bytes: ByteSource): Promise<Uint8Array>;

export function fromCompressed(bytes: ByteSource): Promise<Uint8Array>;

export function concat(sources: ByteSource[]): Uint8Array;

export function generateNonce(): Base64URLString;

export function equals(a: ByteSource, b: ByteSource): boolean;

export declare class Bytes {
  static toBase64UrlString(bytes: ByteSource): Base64URLString;
  static fromBase64UrlString(base64UrlString: Base64URLString): Uint8Array;
  static fromString(text: string): Uint8Array;
  static toString(bytes: ByteSource): string;
  static toJSON(input: ByteSource | string): any;
  static fromJSON(value: any): Uint8Array;
  static toCompressed(bytes: ByteSource): Promise<Uint8Array>;
  static fromCompressed(bytes: ByteSource): Promise<Uint8Array>;
  static concat(sources: ByteSource[]): Uint8Array;
  static equals(a: ByteSource, b: ByteSource): boolean;
}
