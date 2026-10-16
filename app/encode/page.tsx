import type { Metadata } from "next";
import { EncodeTool } from "@/components/tools/encode-tool";

export const metadata: Metadata = { title: "Encode" };

export default function EncodePage() {
  return <EncodeTool />;
}
