import { NextRequest, NextResponse } from "next/server";
import { backendApiUrl, fetchBackendAsAdmin } from "@/lib/serverAuth";

const ALLOWED_RESOURCES = new Set(["products", "articles", "projects", "config", "quotes"]);

async function proxy(request: NextRequest, context: { params: Promise<{ resource: string; rest?: string[] }> }) {
  const { resource, rest = [] } = await context.params;
  if (!ALLOWED_RESOURCES.has(resource)) {
    return NextResponse.json({ success: false, message: "Tài nguyên không hợp lệ" }, { status: 404 });
  }

  const suffix = rest.length ? `/${rest.map(encodeURIComponent).join("/")}` : "";
  const query = request.nextUrl.search;
  const path = `/${resource}${suffix}${query}`;
  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("Content-Type", contentType);
  const init: RequestInit = {
    method: request.method,
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(7000),
  };
  if (!["GET", "HEAD"].includes(request.method)) init.body = await request.text();

  try {
    const isPublicRead = request.method === "GET" && resource !== "quotes";
    const backendRes = isPublicRead
      ? await fetch(backendApiUrl(path), init)
      : await fetchBackendAsAdmin(request, path, init);
    const body = await backendRes.text();
    return new NextResponse(body, {
      status: backendRes.status,
      headers: { "Content-Type": backendRes.headers.get("content-type") || "application/json" },
    });
  } catch {
    return NextResponse.json({ success: false, message: "Backend tạm thời không khả dụng" }, { status: 503 });
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
