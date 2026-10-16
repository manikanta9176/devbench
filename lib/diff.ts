import { diffLines } from "diff";
import type { ToolResult } from "./result";

export type DiffLine = {
  type: "unchanged" | "added" | "removed";
  text: string;
};

export function diffText(before: string, after: string): ToolResult<DiffLine[]> {
  const lines: DiffLine[] = [];
  for (const change of diffLines(
    withTrailingNewline(before),
    withTrailingNewline(after),
  )) {
    const type = change.added
      ? "added"
      : change.removed
        ? "removed"
        : "unchanged";
    const parts = change.value.split("\n");
    if (parts.at(-1) === "") parts.pop();
    for (const text of parts) lines.push({ type, text });
  }
  return { ok: true, value: lines };
}

function withTrailingNewline(value: string): string {
  if (value === "" || value.endsWith("\n")) return value;
  return `${value}\n`;
}
