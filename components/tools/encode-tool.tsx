"use client";

import { useState } from "react";
import { actionClass, ErrorText, ResultBlock, TextArea, ToolHeader } from "@/components/tool-ui";
import { decodeBase64, decodeUrl, encodeBase64, encodeUrl } from "@/lib/encode";
import type { ToolResult } from "@/lib/result";

const actions = [
  { label: "Base64 encode", run: encodeBase64 },
  { label: "Base64 decode", run: decodeBase64 },
  { label: "URL encode", run: encodeUrl },
  { label: "URL decode", run: decodeUrl },
] as const;

export function EncodeTool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ToolResult<string> | null>(null);

  return (
    <div className="grid max-w-3xl gap-5">
      <ToolHeader
        title="Encode"
        description="Base64 and URL encode or decode UTF-8 text."
      />
      <TextArea label="Text" value={input} onChange={setInput} />
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            className={actionClass}
            onClick={() => setResult(action.run(input))}
          >
            {action.label}
          </button>
        ))}
      </div>
      {result && !result.ok ? <ErrorText>{result.error}</ErrorText> : null}
      <ResultBlock label="Result" value={result?.ok ? result.value : ""} />
    </div>
  );
}
