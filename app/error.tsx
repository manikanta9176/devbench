"use client";

import Link from "next/link";

export default function ToolError({
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return (
    <div className="grid max-w-lg gap-4">
      <p className="text-lg">This tool hit a problem</p>
      <div className="flex gap-4 text-sm">
        <Link href="/" className="text-accent underline">
          Back to devbench
        </Link>
        <button type="button" onClick={() => retry()} className="text-muted">
          Try again
        </button>
      </div>
    </div>
  );
}
