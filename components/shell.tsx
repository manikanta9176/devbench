"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tools } from "@/lib/tools";

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-full md:grid md:grid-cols-[13.5rem_minmax(0,1fr)]">
      <aside className="border-b border-line md:min-h-full md:border-r md:border-b-0">
        <Link href="/" className="block px-4 py-4 text-lg tracking-tight">
          devbench
        </Link>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:grid md:px-2">
          {tools.map((tool) => {
            const active = pathname === tool.href;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm whitespace-nowrap ${
                  active ? "bg-surface text-accent" : "text-muted hover:text-foreground"
                }`}
              >
                {tool.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="px-4 py-6 md:px-8 md:py-8">{children}</div>
    </div>
  );
}
