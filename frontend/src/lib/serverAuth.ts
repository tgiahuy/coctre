import { NextRequest } from "next/server";

export const ADMIN_SESSION_COOKIE = "coctre_admin_session";

export function backendApiUrl(path: string): string {
  const base = (process.env.BACKEND_API_URL || "http://localhost:8080").replace(/\/$/, "");
  return `${base}/api/v1${path.startsWith("/") ? path : `/${path}`}`;
}

export function getAdminToken(request: NextRequest): string | null {
  return request.cookies.get(ADMIN_SESSION_COOKIE)?.value || null;
}

export async function fetchBackendAsAdmin(
  request: NextRequest,
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const token = getAdminToken(request);
  if (!token) return new Response(null, { status: 401 });

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  return fetch(backendApiUrl(path), { ...init, headers, cache: "no-store" });
}
