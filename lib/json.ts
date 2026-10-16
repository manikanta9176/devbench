import type { ToolResult } from "./result";

export function formatJson(input: string): ToolResult<string> {
  return transformJson(input, (value) => JSON.stringify(value, null, 2));
}

export function minifyJson(input: string): ToolResult<string> {
  return transformJson(input, (value) => JSON.stringify(value));
}

function transformJson(
  input: string,
  present: (value: unknown) => string,
): ToolResult<string> {
  if (input.trim() === "") return { ok: true, value: "" };
  try {
    return { ok: true, value: present(JSON.parse(input)) };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected token";
    return { ok: false, error: `Invalid JSON: ${message}` };
  }
}
