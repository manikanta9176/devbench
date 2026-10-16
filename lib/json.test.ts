import { describe, expect, test } from "vitest";
import { formatJson, minifyJson } from "./json";

describe("formatJson", () => {
  test("pretty-prints with two-space indent", () => {
    expect(formatJson('{"a":1}')).toEqual({
      ok: true,
      value: '{\n  "a": 1\n}',
    });
  });

  test("returns an empty result for whitespace", () => {
    expect(formatJson("   ")).toEqual({ ok: true, value: "" });
  });

  test("reports invalid JSON with the parser message", () => {
    const result = formatJson("{");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.startsWith("Invalid JSON")).toBe(true);
      expect(result.error.length).toBeGreaterThan("Invalid JSON".length);
    }
  });
});

describe("minifyJson", () => {
  test("removes insignificant whitespace", () => {
    expect(minifyJson('{\n  "a": 1\n}')).toEqual({
      ok: true,
      value: '{"a":1}',
    });
  });
});
