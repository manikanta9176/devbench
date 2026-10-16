"use client";

import { useState } from "react";
import { ErrorText, ResultBlock, ToolHeader } from "@/components/tool-ui";
import type { EpochUnit } from "@/lib/time";
import { convertEpoch, convertLocalDateTime } from "@/lib/time";

export function TimeTool() {
  const [raw, setRaw] = useState("");
  const [unit, setUnit] = useState<EpochUnit>("seconds");
  const [localValue, setLocalValue] = useState("");

  const epoch = raw.trim() === "" ? null : convertEpoch(raw, unit);
  const local =
    localValue.trim() === ""
      ? null
      : convertLocalDateTime(localValue, offsetForLocalValue(localValue));

  return (
    <div className="grid max-w-3xl gap-8">
      <ToolHeader
        title="Time"
        description="Convert an epoch timestamp or a local date and time."
      />
      <section className="grid gap-3">
        <label className="grid gap-2 text-sm text-muted">
          Epoch
          <input
            value={raw}
            onChange={(event) => setRaw(event.target.value)}
            inputMode="decimal"
            className="rounded-md border border-line bg-surface p-3 font-mono text-sm text-foreground outline-none focus:border-accent"
          />
        </label>
        <label className="grid gap-2 text-sm text-muted">
          Unit
          <select
            value={unit}
            onChange={(event) => setUnit(event.target.value as EpochUnit)}
            className="rounded-md border border-line bg-surface p-2 text-sm text-foreground"
          >
            <option value="seconds">Seconds</option>
            <option value="milliseconds">Milliseconds</option>
          </select>
        </label>
        {epoch && !epoch.ok ? <ErrorText>{epoch.error}</ErrorText> : null}
        {epoch?.ok ? <InstantView value={epoch.value} /> : null}
      </section>
      <section className="grid gap-3">
        <label className="grid gap-2 text-sm text-muted">
          Local date and time
          <input
            type="datetime-local"
            value={localValue}
            onChange={(event) => setLocalValue(event.target.value)}
            className="rounded-md border border-line bg-surface p-3 font-mono text-sm text-foreground outline-none focus:border-accent"
          />
        </label>
        {local && !local.ok ? <ErrorText>{local.error}</ErrorText> : null}
        {local?.ok ? <InstantView value={local.value} /> : null}
      </section>
    </div>
  );
}

function InstantView({
  value,
}: {
  value: { seconds: number; milliseconds: number; utcIso: string };
}) {
  const localClock = new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "long",
  }).format(new Date(value.utcIso));

  return (
    <div className="grid gap-4">
      <ResultBlock label="Seconds" value={String(value.seconds)} />
      <ResultBlock label="Milliseconds" value={String(value.milliseconds)} />
      <ResultBlock label="UTC" value={value.utcIso} />
      <ResultBlock label="Local" value={localClock} />
    </div>
  );
}

function offsetForLocalValue(value: string): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if (!match) return new Date().getTimezoneOffset();
  const date = new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
    Number(match[4]),
    Number(match[5]),
  );
  if (Number.isNaN(date.getTime())) return new Date().getTimezoneOffset();
  return date.getTimezoneOffset();
}
