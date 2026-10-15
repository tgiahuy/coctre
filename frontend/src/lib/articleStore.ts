"use client";

import { useEffect, useState } from "react";
import { Article, articles as initialArticles } from "@/data/articles";

const STORAGE_KEY = "coctre_custom_articles";
const STORAGE_DELETED_KEY = "coctre_deleted_article_ids";

export function getDeletedArticleIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_DELETED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

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
    const deletedIds = getDeletedArticleIds();

    // Remove from deleted list if re-saving
    const newDeleted = deletedIds.filter((id) => id !== article.id && id !== article.slug);
    localStorage.setItem(STORAGE_DELETED_KEY, JSON.stringify(newDeleted));

    const existingIndex = current.findIndex((a) => a.slug === article.slug || a.id === article.id);
    let updated: Article[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = article;
    } else {
      updated = [article, ...current];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("coctre_articles_updated"));
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

    const deletedIds = getDeletedArticleIds();
    if (!deletedIds.includes(slugOrId)) {
      deletedIds.push(slugOrId);
      localStorage.setItem(STORAGE_DELETED_KEY, JSON.stringify(deletedIds));
    }

    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("coctre_articles_updated"));
    return true;
  } catch (err) {
    console.error("Error deleting article", err);
    return false;
  }
}

export function resetArticlesToDefault(): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_DELETED_KEY);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("coctre_articles_updated"));
    return true;
  } catch (err) {
    console.error("Error resetting articles", err);
    return false;
  }
}

export function getAllArticles(): Article[] {
  if (typeof window === "undefined") return initialArticles;
  const deletedIds = getDeletedArticleIds();
  const custom = getCustomArticles();

  const initialFiltered = initialArticles.filter((init) => {
    if (deletedIds.includes(init.id) || deletedIds.includes(init.slug)) return false;
    const hasCustom = custom.some((c) => c.slug === init.slug || c.id === init.id);
    return !hasCustom;
  });

  return [...custom, ...initialFiltered];
}

export function findArticleBySlug(slug: string): Article | undefined {
  const all = getAllArticles();
  return all.find((a) => a.slug === slug || a.id === slug);
}

export function useArticles(): Article[] {
  const [items, setItems] = useState<Article[]>(initialArticles);

  useEffect(() => {
    setItems(getAllArticles());

    const handleChange = () => {
      setItems(getAllArticles());
    };

    window.addEventListener("storage", handleChange);
    window.addEventListener("coctre_articles_updated", handleChange);

    return () => {
      window.removeEventListener("storage", handleChange);
      window.removeEventListener("coctre_articles_updated", handleChange);
    };
  }, []);

  return items;
}
