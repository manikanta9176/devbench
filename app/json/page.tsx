import type { Metadata } from "next";
import { JsonTool } from "@/components/tools/json-tool";

export const metadata: Metadata = { title: "JSON" };

export default function JsonPage() {
  return <JsonTool />;
}
