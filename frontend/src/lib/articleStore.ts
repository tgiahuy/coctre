"use client";

import { Article, articles as initialArticles } from "@/data/articles";

const STORAGE_KEY = "coctre_custom_articles";

export function getCustomArticles(): Article[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading custom articles from localStorage", err);
    return [];
  }
}

export function saveCustomArticle(article: Article): boolean {
  if (typeof window === "undefined") return false;
  try {
    const current = getCustomArticles();
    const existingIndex = current.findIndex((a) => a.slug === article.slug || a.id === article.id);
    let updated: Article[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = article;
    } else {
      updated = [article, ...current];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Trigger storage event for reactivity across tabs/components
    window.dispatchEvent(new Event("storage"));
    return true;
  } catch (err) {
    console.error("Error saving article to localStorage", err);
    return false;
  }
}

export function deleteCustomArticle(slugOrId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const current = getCustomArticles();
    const updated = current.filter((a) => a.slug !== slugOrId && a.id !== slugOrId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    return true;
  } catch (err) {
    console.error("Error deleting article", err);
    return false;
  }
}

export function getAllArticles(): Article[] {
  if (typeof window === "undefined") return initialArticles;
  const custom = getCustomArticles();
  // Merge custom articles on top of initial articles (custom takes precedence)
  const initialFiltered = initialArticles.filter(
    (init) => !custom.some((c) => c.slug === init.slug || c.id === init.id)
  );
  return [...custom, ...initialFiltered];
}

export function findArticleBySlug(slug: string): Article | undefined {
  const all = getAllArticles();
  return all.find((a) => a.slug === slug);
}
