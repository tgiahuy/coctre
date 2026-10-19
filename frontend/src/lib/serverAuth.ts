import { NextRequest } from "next/server";

export const ADMIN_SESSION_COOKIE = "coctre_admin_session";

export function backendApiUrl(path: string): string {
  const base = (
    process.env.INTERNAL_BACKEND_URL ||
    process.env.BACKEND_INTERNAL_URL ||
    process.env.BACKEND_API_URL ||
    "http://127.0.0.1:8080"
  ).replace(/\/$/, "");
  const apiBase = base.endsWith("/api/v1") ? base : `${base}/api/v1`;
  return `${apiBase}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getAdminToken(request: NextRequest): string | null {
  const cookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (cookie) return cookie;
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    return authHeader.substring(7).trim();
  }
  return null;
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
