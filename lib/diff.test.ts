import { describe, expect, test } from "vitest";
import { diffText } from "./diff";

describe("diffText", () => {
  test("marks an added line", () => {
    expect(diffText("alpha", "alpha\nbeta")).toEqual({
      ok: true,
      value: [
        { type: "unchanged", text: "alpha" },
        { type: "added", text: "beta" },
      ],
    });
  });

  test("marks a removed line", () => {
    expect(diffText("alpha\nbeta", "alpha")).toEqual({
      ok: true,
      value: [
        { type: "unchanged", text: "alpha" },
        { type: "removed", text: "beta" },
      ],
    });
  });

  test("marks identical text unchanged", () => {
    expect(diffText("same", "same")).toEqual({
      ok: true,
      value: [{ type: "unchanged", text: "same" }],
    });
  });
});
