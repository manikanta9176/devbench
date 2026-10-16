import Link from "next/link";
import { tools } from "@/lib/tools";

export default function Home() {
  return (
    <div className="grid gap-8">
      <header className="grid max-w-xl gap-2">
        <h1 className="text-3xl font-medium tracking-tight">A bench for the code in front of you</h1>
        <p className="text-muted">
          Format JSON, convert a timestamp, diff two snippets, or decode a token.
          What you paste stays in this browser.
        </p>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2">
        {tools.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="grid gap-1 rounded-lg border border-line bg-surface px-4 py-4 hover:border-accent"
            >
              <span className="font-medium">{tool.label}</span>
              <span className="text-sm text-muted">{tool.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
