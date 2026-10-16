import type { ToolResult } from "./result";

export type EpochUnit = "seconds" | "milliseconds";

export type Instant = {
  seconds: number;
  milliseconds: number;
  utcIso: string;
};

export function convertEpoch(
  raw: string,
  unit: EpochUnit,
): ToolResult<Instant> {
  const trimmed = raw.trim();
  const value = Number(trimmed);
  if (trimmed === "" || !Number.isFinite(value)) {
    return { ok: false, error: "Enter a number" };
  }
  const milliseconds = unit === "seconds" ? value * 1000 : value;
  return instantFromMilliseconds(milliseconds);
}

export function convertLocalDateTime(
  raw: string,
  timezoneOffsetMinutes: number,
): ToolResult<Instant> {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(raw.trim());
  if (!match) return { ok: false, error: "Enter a date and time" };
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    hour > 23 ||
    minute > 59
  ) {
    return { ok: false, error: "Enter a date and time" };
  }
  const utcMilliseconds =
    Date.UTC(year, month - 1, day, hour, minute) +
    timezoneOffsetMinutes * 60_000;
  return instantFromMilliseconds(utcMilliseconds);
}

function instantFromMilliseconds(milliseconds: number): ToolResult<Instant> {
  const date = new Date(milliseconds);
  if (Number.isNaN(date.getTime())) {
    return { ok: false, error: "Enter a number" };
  }
  return {
    ok: true,
    value: {
      seconds: milliseconds / 1000,
      milliseconds,
      utcIso: date.toISOString(),
    },
  };
}
