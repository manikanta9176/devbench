import type { ToolResult } from "./result";

export function encodeBase64(input: string): ToolResult<string> {
  if (input.trim() === "") return { ok: true, value: "" };
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return { ok: true, value: btoa(binary) };
}

export function decodeBase64(input: string): ToolResult<string> {
  const trimmed = input.trim();
  if (trimmed === "") return { ok: true, value: "" };
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(trimmed) || trimmed.length % 4 !== 0) {
    return { ok: false, error: "Invalid Base64" };
  }
  try {
    const binary = atob(trimmed);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return { ok: true, value: new TextDecoder().decode(bytes) };
  } catch {
    return { ok: false, error: "Invalid Base64" };
  }
}

export function encodeUrl(input: string): ToolResult<string> {
  if (input.trim() === "") return { ok: true, value: "" };
  return { ok: true, value: encodeURIComponent(input) };
}

export function decodeUrl(input: string): ToolResult<string> {
  if (input.trim() === "") return { ok: true, value: "" };
  try {
    return { ok: true, value: decodeURIComponent(input) };
  } catch {
    return { ok: false, error: "Invalid URL encoding" };
  }
}
