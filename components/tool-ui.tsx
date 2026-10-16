"use client";

import { CopyButton } from "@/components/copy-button";

export function ToolHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="grid gap-1">
      <h1 className="text-2xl font-medium tracking-tight">{title}</h1>
      <p className="text-sm text-muted">{description}</p>
    </header>
  );
}

export function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm text-muted">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        spellCheck={false}
        className="min-h-40 w-full rounded-md border border-line bg-surface p-3 font-mono text-sm text-foreground outline-none focus:border-accent"
      />
    </label>
  );
}

export function ErrorText({ children }: { children: string }) {
  return (
    <p role="alert" className="text-sm text-removed-text">
      {children}
    </p>
  );
}

export function ResultBlock({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <section className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm text-muted">{label}</h2>
        <CopyButton text={value} />
      </div>
      <pre className="overflow-auto rounded-md border border-line bg-surface p-3 font-mono text-sm">
        {value}
      </pre>
    </section>
  );
}

export const actionClass =
  "rounded-md bg-accent px-3 py-2 text-sm font-medium text-background";
