import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, fetchBackendAsAdmin } from "@/lib/serverAuth";

export async function POST(request: NextRequest) {
  try {
    await fetchBackendAsAdmin(request, "/auth/logout", { method: "POST", signal: AbortSignal.timeout(5000) });
  } catch {
    // The local cookie is still removed even if the backend is unavailable.
  }
  const response = NextResponse.json({ success: true });
  response.cookies.delete(ADMIN_SESSION_COOKIE);
  return response;
}
