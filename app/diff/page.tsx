import type { Metadata } from "next";
import { DiffTool } from "@/components/tools/diff-tool";

export const metadata: Metadata = { title: "Diff" };

export default function DiffPage() {
  return <DiffTool />;
}
