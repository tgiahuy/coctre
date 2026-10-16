"use client";

import { useEffect, useState } from "react";
import { products as initialProducts, Product } from "@/data/products";

export async function requestProducts(): Promise<Product[]> {
  const res = await fetch("/api/content/products", { cache: "no-store" });
  const json = await res.json();
  if (!res.ok || !json.success || !Array.isArray(json.data)) throw new Error(json.message || "Không thể tải sản phẩm");
  return json.data;
}

export const getDeletedProductIds = (): string[] => [];
export const getCustomProducts = (): Product[] => [];
export const getAllProducts = (): Product[] => initialProducts;
export const getProductBySlug = (slug: string): Product | undefined =>
  initialProducts.find((product) => product.slug === slug || product.id === slug);

export async function saveProduct(product: Product): Promise<boolean> {
  const res = await fetch("/api/content/products", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(product),
  });
  if (res.ok) window.dispatchEvent(new Event("coctre_products_updated"));
  return res.ok;
}

export async function deleteProduct(idOrSlug: string): Promise<boolean> {
  const res = await fetch(`/api/content/products/${encodeURIComponent(idOrSlug)}`, { method: "DELETE" });
  if (res.ok) window.dispatchEvent(new Event("coctre_products_updated"));
  return res.ok;
}

export function resetProductsToDefault(): boolean {
  window.dispatchEvent(new Event("coctre_products_updated"));
  return true;
}

export function useProducts(): Product[] {
  const [items, setItems] = useState<Product[]>(initialProducts);
  useEffect(() => {
    const refresh = () => void requestProducts().then(setItems).catch(() => undefined);
    refresh();
    window.addEventListener("coctre_products_updated", refresh);
    return () => window.removeEventListener("coctre_products_updated", refresh);
  }, []);
  return items;
}
