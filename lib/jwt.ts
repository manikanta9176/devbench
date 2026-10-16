import type { ToolResult } from "./result";

export type JwtDecoded = {
  header: string;
  payload: string;
  signature: string;
  notice: "Signature was not checked.";
};

export function decodeJwt(token: string): ToolResult<JwtDecoded> {
  const parts = token.trim().split(".");
  if (parts.length !== 3 || parts.some((part) => part.length === 0)) {
    return { ok: false, error: "Invalid JWT" };
  }
  try {
    const header = JSON.parse(decodeBase64Url(parts[0]));
    const payload = JSON.parse(decodeBase64Url(parts[1]));
    return {
      ok: true,
      value: {
        header: JSON.stringify(header, null, 2),
        payload: JSON.stringify(payload, null, 2),
        signature: parts[2],
        notice: "Signature was not checked.",
      },
    };
  } catch {
    return { ok: false, error: "Invalid JWT" };
  }
}

function decodeBase64Url(segment: string): string {
  const padded =
    segment.replace(/-/g, "+").replace(/_/g, "/") +
    "=".repeat((4 - (segment.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
