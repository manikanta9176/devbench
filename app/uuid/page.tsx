import type { Metadata } from "next";
import { UuidTool } from "@/components/tools/uuid-tool";

export const metadata: Metadata = { title: "UUID" };

export default function UuidPage() {
  return <UuidTool />;
}
