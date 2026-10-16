# devbench design

Date: 2026-10-16

devbench is a browser-only toolbox for developers. You bookmark it and use it while coding. JSON, timestamps, text diffs, encoding, JWT decoding, and UUID generation all run on the machine in front of you. Pasted text is never sent to a server.

shiplog (end-of-day log) and devnow (shareable status) are separate future repos. They are out of scope for this repository.

## Decisions

- One Next.js App Router app, TypeScript, Tailwind CSS, pnpm.
- Each tool has its own route so a single tool can be bookmarked.
- No API routes, no database, no accounts, no environment variables.
- Parsing and formatting live in plain functions under `lib/`, with Vitest tests. Pages only collect input and render the result.
- Deploy target is Vercel from the GitHub repo `manikanta9176/devbench`. The signed-in GitHub account in this environment is `akhil-naidu`, so the push waits until `manikanta9176` is the account that can receive it.

Rejected alternatives:

- Server-side parsing. These tools do not need a server, and server parsing would upload pasted secrets and tokens.
- A single page with every tool stacked. That is harder to bookmark and harder to keep on screen while coding.

## v1 tools

| Route | Job |
| --- | --- |
| `/` | Name the six tools and link to each one |
| `/json` | Pretty-print or minify JSON |
| `/time` | Convert epoch timestamps and civil datetimes |
| `/diff` | Line diff of two texts |
| `/encode` | Base64 and URL encode or decode |
| `/jwt` | Show a JWT header and payload |
| `/uuid` | Generate one UUID v4 and copy it |

Later tools (cron, hashes, regex) are not part of v1.

## Shared UI

- A shell with the product name, a nav of the six tools, and the active tool's workspace.
- Dark background, monospace text for every input and result, readable labels on every field.
- A result can be copied with one button. The button is absent when there is no result.
- Invalid input shows one inline message under the field. The page does not throw.
- Empty input is idle: no error, no result.

## Tool behavior

### JSON

- Actions: Format (two-space indent) and Minify.
- Valid JSON produces a string result.
- Invalid JSON produces `Invalid JSON` plus the parser message.
- Whitespace-only input returns `{ ok: true, value: "" }`. The page treats that as no result.

### Time

- The user chooses the input unit: seconds or milliseconds. Default is seconds.
- A numeric value becomes seconds, milliseconds, and a UTC ISO-8601 string. The page formats the local clock from that instant with `Intl.DateTimeFormat`.
- A `datetime-local` value is converted with an offset the page supplies for that chosen local time (`Date.getTimezoneOffset()` on those parts). The library applies the offset and returns seconds, milliseconds, and a UTC ISO-8601 string. Tests pass a fixed offset.
- A non-numeric timestamp produces `Enter a number`.
- No automatic guess between seconds and milliseconds.

### Diff

- Two labeled fields: Before and After.
- Compare with line diff (`diff` package, `diffLines`).
- Render unchanged, added, and removed lines. Added and removed lines are visually distinct.
- Both fields empty produces no diff. The page skips the library in that case.
- If only one side has text, every line on that side is added or removed.
- Whitespace is significant. v1 has no "ignore whitespace" mode.

### Encode

- Actions: Base64 encode, Base64 decode, URL encode, URL decode.
- Text is UTF-8. Base64 uses the standard alphabet with padding.
- Base64 decode of a string that is not valid Base64 produces `Invalid Base64`.
- URL decode of a malformed escape produces `Invalid URL encoding`.
- Empty input produces no result.

### JWT

- Input is a single token string.
- A token has three dot-separated segments. Header and payload are base64url-decoded and pretty-printed as JSON.
- The page states, in the result, that the signature was not checked.
- The signature segment is shown as opaque text and is not parsed.
- Anything else (wrong segment count, bad base64url, non-JSON header or payload) produces `Invalid JWT`.

### UUID

- One button generates a new UUID v4 via `crypto.randomUUID()`.
- The current value stays on screen with a copy button.
- Generating again replaces the previous value. Nothing is stored.

## Architecture

```
app/layout.tsx              shell, metadata
app/error.tsx               "This tool hit a problem" plus a link to /
app/page.tsx                tool index
app/{json,time,diff,encode,jwt,uuid}/page.tsx
components/shell.tsx        nav and page frame
components/copy-button.tsx
lib/json.ts
lib/time.ts
lib/diff.ts
lib/encode.ts
lib/jwt.ts
lib/uuid.ts
lib/*.test.ts
```

Each `lib` module exports pure functions and returns a result object of this shape:

```ts
type ToolResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string }
```

Pages branch on `ok`. They do not catch library exceptions, because the library functions catch parse failures and return `ok: false`.

Data flow for every tool: field input → library function → inline error or result. No `fetch`.

## Error handling

- Library functions return `{ ok: false, error }` for bad input.
- Pages render `error` as text. They do not alert, toast, or log the user's text.
- Unexpected UI failures fall through to the Next.js error boundary with a one-line "This tool hit a problem" message and a link back to `/`.

## Testing

Vitest covers the library functions only.

- JSON: format, minify, invalid syntax, whitespace-only.
- Time: seconds to milliseconds and UTC ISO, milliseconds to seconds, local parts plus a fixed offset to both epochs, non-numeric input. Assert the UTC instant, not a local clock string.
- Diff: one added line, one removed line, identical text.
- Encode: UTF-8 round trip for Base64 (include a non-ASCII character), invalid Base64, URL round trip, bad percent-encoding.
- JWT: a known fixture header and payload, a two-segment string, a segment that is not JSON.
- UUID: `crypto.randomUUID()` result matches the v4 shape. Do not assert a fixed value.

`pnpm test` must pass before the app is called done. `pnpm dev` must serve `/` and each tool route.

## Deploy

- `pnpm build` succeeds with no environment variables.
- The repo is pushed to `github.com/manikanta9176/devbench` when that account is available, then imported into Vercel.
- Until that account is connected, the app lives in this local git repo only.

## Success

A developer can open the deployed site, paste JSON, a timestamp, two texts, a token, or a string, and get a correct result without creating an account and without that text leaving the browser.
