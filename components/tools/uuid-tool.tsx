"use client";

import { useState } from "react";
import { actionClass, ResultBlock, ToolHeader } from "@/components/tool-ui";
import { generateUuid } from "@/lib/uuid";

export function UuidTool() {
  const [value, setValue] = useState("");

  return (
    <div className="grid max-w-3xl gap-5">
      <ToolHeader title="UUID" description="Generate one UUID v4. Nothing is stored." />
      <button
        type="button"
        className={`${actionClass} w-fit`}
        onClick={() => setValue(generateUuid())}
      >
        Generate
      </button>
      <ResultBlock label="UUID" value={value} />
    </div>
  );
}
