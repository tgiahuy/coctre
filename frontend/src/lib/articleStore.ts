"use client";

import { Article, articles as initialArticles } from "@/data/articles";

export async function requestArticles(): Promise<Article[]> {
  return initialArticles;
}

export const getDeletedArticleIds = (): string[] => [];
export const getCustomArticles = (): Article[] => [];
export const getAllArticles = (): Article[] => initialArticles;
export const findArticleBySlug = (slug: string): Article | undefined =>
  initialArticles.find((article) => article.slug === slug || article.id === slug);

export async function saveCustomArticle(article: Article): Promise<boolean> {
  void article;
  return false;
}

export async function deleteCustomArticle(slugOrId: string): Promise<boolean> {
  void slugOrId;
  return false;
}

export function resetArticlesToDefault(): boolean {
  return true;
}

export function useArticles(): Article[] {
  return useArticlesState().data;
}

export function useArticlesState(): { data: Article[]; isLoading: boolean; error: string | null } {
  return { data: initialArticles, isLoading: false, error: null };
}
