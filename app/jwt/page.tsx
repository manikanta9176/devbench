import type { Metadata } from "next";
import { JwtTool } from "@/components/tools/jwt-tool";

export const metadata: Metadata = { title: "JWT" };

export default function JwtPage() {
  return <JwtTool />;
}
