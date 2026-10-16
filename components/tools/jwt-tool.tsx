"use client";

import { useState } from "react";
import { ErrorText, ResultBlock, TextArea, ToolHeader } from "@/components/tool-ui";
import { decodeJwt } from "@/lib/jwt";

export function JwtTool() {
  const [token, setToken] = useState("");
  const result = token.trim() === "" ? null : decodeJwt(token);

  return (
    <div className="grid max-w-3xl gap-5">
      <ToolHeader
        title="JWT"
        description="Show the header and payload. The signature is not checked."
      />
      <TextArea label="Token" value={token} onChange={setToken} />
      {result && !result.ok ? <ErrorText>{result.error}</ErrorText> : null}
      {result?.ok ? (
        <div className="grid gap-4">
          <p className="text-sm text-accent">{result.value.notice}</p>
          <ResultBlock label="Header" value={result.value.header} />
          <ResultBlock label="Payload" value={result.value.payload} />
          <ResultBlock label="Signature" value={result.value.signature} />
        </div>
      ) : null}
    </div>
  );
}
