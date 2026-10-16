import { describe, expect, test } from "vitest";
import { decodeBase64, decodeUrl, encodeBase64, encodeUrl } from "./encode";

const sample = "héllo ☕";

describe("base64", () => {
  test("round-trips UTF-8 text", () => {
    const encoded = encodeBase64(sample);
    expect(encoded.ok).toBe(true);
    if (!encoded.ok) return;
    expect(decodeBase64(encoded.value)).toEqual({ ok: true, value: sample });
  });

  test("rejects invalid base64", () => {
    expect(decodeBase64("!!!!")).toEqual({
      ok: false,
      error: "Invalid Base64",
    });
  });
});

describe("url encoding", () => {
  test("round-trips text", () => {
    const encoded = encodeUrl("a b/c");
    expect(encoded).toEqual({ ok: true, value: "a%20b%2Fc" });
    expect(decodeUrl("a%20b%2Fc")).toEqual({ ok: true, value: "a b/c" });
  });

  test("rejects a bad percent escape", () => {
    expect(decodeUrl("%")).toEqual({
      ok: false,
      error: "Invalid URL encoding",
    });
  });
});
