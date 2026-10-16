"use client";

import { useEffect, useState } from "react";
import { Article, articles as initialArticles } from "@/data/articles";

export async function requestArticles(): Promise<Article[]> {
  const res = await fetch("/api/content/articles", { cache: "no-store" });
  const json = await res.json();
  if (!res.ok || !json.success || !Array.isArray(json.data)) throw new Error(json.message || "Không thể tải bài viết");
  return json.data;
}

export const getDeletedArticleIds = (): string[] => [];
export const getCustomArticles = (): Article[] => [];
export const getAllArticles = (): Article[] => initialArticles;
export const findArticleBySlug = (slug: string): Article | undefined =>
  initialArticles.find((article) => article.slug === slug || article.id === slug);

export async function saveCustomArticle(article: Article): Promise<boolean> {
  const res = await fetch("/api/content/articles", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(article),
  });
  if (res.ok) window.dispatchEvent(new Event("coctre_articles_updated"));
  return res.ok;
}

export async function deleteCustomArticle(slugOrId: string): Promise<boolean> {
  const res = await fetch(`/api/content/articles/${encodeURIComponent(slugOrId)}`, { method: "DELETE" });
  if (res.ok) window.dispatchEvent(new Event("coctre_articles_updated"));
  return res.ok;
}

export function resetArticlesToDefault(): boolean {
  window.dispatchEvent(new Event("coctre_articles_updated"));
  return true;
}

export function useArticles(): Article[] {
  return useArticlesState().data;
}

export function useArticlesState(): { data: Article[]; isLoading: boolean; error: string | null } {
  const [items, setItems] = useState<Article[]>(initialArticles);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const refresh = () => {
      void requestArticles()
        .then((data) => { setItems(data); setError(null); })
        .catch((err: unknown) => setError(err instanceof Error ? err.message : "Không thể tải bài viết"))
        .finally(() => setIsLoading(false));
    };
    refresh();
    window.addEventListener("coctre_articles_updated", refresh);
    return () => window.removeEventListener("coctre_articles_updated", refresh);
  }, []);
  return { data: items, isLoading, error };
}
