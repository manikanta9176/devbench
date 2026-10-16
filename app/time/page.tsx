import type { Metadata } from "next";
import { TimeTool } from "@/components/tools/time-tool";

export const metadata: Metadata = { title: "Time" };

export default function TimePage() {
  return <TimeTool />;
}
