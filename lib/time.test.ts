import { describe, expect, test } from "vitest";
import { convertEpoch, convertLocalDateTime } from "./time";

describe("convertEpoch", () => {
  test("converts seconds to milliseconds and UTC", () => {
    expect(convertEpoch("0", "seconds")).toEqual({
      ok: true,
      value: {
        seconds: 0,
        milliseconds: 0,
        utcIso: "1970-01-01T00:00:00.000Z",
      },
    });
  });

  test("converts milliseconds to seconds", () => {
    expect(convertEpoch("1500", "milliseconds")).toEqual({
      ok: true,
      value: {
        seconds: 1.5,
        milliseconds: 1500,
        utcIso: "1970-01-01T00:00:01.500Z",
      },
    });
  });

  test("rejects a non-numeric timestamp", () => {
    expect(convertEpoch("noon", "seconds")).toEqual({
      ok: false,
      error: "Enter a number",
    });
  });
});

describe("convertLocalDateTime", () => {
  test("applies a fixed offset to local parts", () => {
    expect(convertLocalDateTime("2026-10-16T12:00", -330)).toEqual({
      ok: true,
      value: {
        seconds: Date.parse("2026-10-16T06:30:00.000Z") / 1000,
        milliseconds: Date.parse("2026-10-16T06:30:00.000Z"),
        utcIso: "2026-10-16T06:30:00.000Z",
      },
    });
  });
});
