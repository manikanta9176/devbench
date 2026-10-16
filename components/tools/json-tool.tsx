"use client";

import { useState } from "react";
import { actionClass, ErrorText, ResultBlock, TextArea, ToolHeader } from "@/components/tool-ui";
import { formatJson, minifyJson } from "@/lib/json";
import type { ToolResult } from "@/lib/result";

export function JsonTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ToolResult<string> | null>(null);

  function run(kind: "format" | "minify") {
    setResult(kind === "format" ? formatJson(input) : minifyJson(input));
  }

  return (
    <div className="grid max-w-3xl gap-5">
      <ToolHeader title="JSON" description="Format or minify JSON on this machine." />
      <TextArea label="JSON" value={input} onChange={setInput} />
      <div className="flex gap-2">
        <button type="button" className={actionClass} onClick={() => run("format")}>
          Format
        </button>
        <button type="button" className={actionClass} onClick={() => run("minify")}>
          Minify
        </button>
      </div>
      {result && !result.ok ? <ErrorText>{result.error}</ErrorText> : null}
      <ResultBlock label="Result" value={result?.ok ? result.value : ""} />
    </div>
  );
}
