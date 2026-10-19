import { products as staticProducts, Product } from "@/data/products";
import { articles as staticArticles, Article } from "@/data/articles";
import { projects as staticProjects, Project } from "@/data/projects";

function getBackendInternalUrl(): string {
  const raw = (
    process.env.INTERNAL_BACKEND_URL ||
    process.env.BACKEND_INTERNAL_URL ||
    process.env.BACKEND_API_URL ||
    "http://127.0.0.1:8080"
  ).replace(/\/$/, "");
  return raw.endsWith("/api/v1") ? raw : `${raw}/api/v1`;
}

async function fetchFromBackend<T>(endpoint: string): Promise<T[] | null> {
  try {
    const res = await fetch(`${getBackendInternalUrl()}${endpoint}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json?.success && Array.isArray(json?.data)) {
      return json.data as T[];
    }
    return null;
  } catch {
    return null;
  }
}

export async function getServerProducts(): Promise<Product[]> {
  const backendData = await fetchFromBackend<Product>("/products");
  if (backendData !== null) return backendData;
  return staticProducts;
}

export async function getServerProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await getServerProducts();
  return all.find((p) => p.slug === slug || p.id === slug);
}

export async function getServerArticles(): Promise<Article[]> {
  const backendData = await fetchFromBackend<Article>("/articles");
  if (backendData !== null) return backendData;
  return staticArticles;
}

export async function getServerArticleBySlug(slug: string): Promise<Article | undefined> {
  const all = await getServerArticles();
  return all.find((a) => a.slug === slug || a.id === slug);
}

export async function getServerProjects(): Promise<Project[]> {
  const backendData = await fetchFromBackend<Project>("/projects");
  if (backendData !== null) return backendData;
  return staticProjects;
}

export async function getServerProjectBySlug(slug: string): Promise<Project | undefined> {
  const all = await getServerProjects();
  return all.find((p) => p.slug === slug || p.id === slug);
}
