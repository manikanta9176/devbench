"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { TextArea, ToolHeader } from "@/components/tool-ui";
import { diffText, type DiffLine } from "@/lib/diff";

export function DiffTool() {
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");
  const lines =
    before === "" && after === "" ? null : diffText(before, after);

  return (
    <div className="grid max-w-5xl gap-5">
      <ToolHeader title="Diff" description="Compare two texts line by line." />
      <div className="grid gap-4 md:grid-cols-2">
        <TextArea label="Before" value={before} onChange={setBefore} />
        <TextArea label="After" value={after} onChange={setAfter} />
      </div>
      {lines?.ok && lines.value.length > 0 ? (
        <DiffView lines={lines.value} />
      ) : null}
    </div>
  );
}

function DiffView({ lines }: { lines: DiffLine[] }) {
  const copyText = lines
    .map((line) => {
      const mark = line.type === "added" ? "+" : line.type === "removed" ? "-" : " ";
      return `${mark} ${line.text}`;
    })
    .join("\n");

  return (
    <section className="grid gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-muted">Changes</h2>
        <CopyButton text={copyText} />
      </div>
      <pre className="overflow-auto rounded-md border border-line bg-surface font-mono text-sm">
        {lines.map((line, index) => (
          <div
            key={`${line.type}-${index}`}
            className={
              line.type === "added"
                ? "bg-added px-3 text-added-text"
                : line.type === "removed"
                  ? "bg-removed px-3 text-removed-text"
                  : "px-3"
            }
          >
            {line.type === "added" ? "+ " : line.type === "removed" ? "- " : "  "}
            {line.text || " "}
          </div>
        ))}
      </pre>
    </section>
  );
}
