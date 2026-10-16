import { describe, expect, test } from "vitest";
import { decodeJwt } from "./jwt";

const token =
  "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiJkZXZiZW5jaCIsIm5hbWUiOiJBZGEifQ.sig";

describe("decodeJwt", () => {
  test("pretty-prints header and payload and leaves the signature opaque", () => {
    expect(decodeJwt(token)).toEqual({
      ok: true,
      value: {
        header: '{\n  "alg": "none",\n  "typ": "JWT"\n}',
        payload: '{\n  "sub": "devbench",\n  "name": "Ada"\n}',
        signature: "sig",
        notice: "Signature was not checked.",
      },
    });
  });

  test("rejects a token with two segments", () => {
    expect(decodeJwt("aaa.bbb")).toEqual({ ok: false, error: "Invalid JWT" });
  });

  test("rejects a segment that is not JSON", () => {
    expect(
      decodeJwt("eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.bm90LWpzb24.sig"),
    ).toEqual({ ok: false, error: "Invalid JWT" });
  });
});
