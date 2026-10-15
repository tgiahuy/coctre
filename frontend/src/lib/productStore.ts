"use client";

import { useEffect, useState } from "react";
import { products as initialProducts, Product } from "@/data/products";

const STORAGE_CUSTOM_KEY = "coctre_custom_products";
const STORAGE_DELETED_KEY = "coctre_deleted_product_ids";

export function getDeletedProductIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_DELETED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function getCustomProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_CUSTOM_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function getAllProducts(): Product[] {
  if (typeof window === "undefined") return initialProducts;
  const deletedIds = getDeletedProductIds();
  const customList = getCustomProducts();

  // Filter out any default product that has been deleted or has a custom override
  const filteredDefaults = initialProducts.filter((init) => {
    if (deletedIds.includes(init.id) || deletedIds.includes(init.slug)) return false;
    const hasCustomOverride = customList.some((c) => c.id === init.id || c.slug === init.slug);
    return !hasCustomOverride;
  });

  return [...customList, ...filteredDefaults];
}

export function getProductBySlug(slug: string): Product | undefined {
  const all = getAllProducts();
  return all.find((p) => p.slug === slug || p.id === slug);
}

export function saveProduct(product: Product): boolean {
  if (typeof window === "undefined") return false;
  try {
    const customList = getCustomProducts();
    const deletedIds = getDeletedProductIds();

    // Remove from deleted list if resurrecting/editing
    const newDeleted = deletedIds.filter((id) => id !== product.id && id !== product.slug);
    localStorage.setItem(STORAGE_DELETED_KEY, JSON.stringify(newDeleted));

    const existingIndex = customList.findIndex(
      (p) => p.id === product.id || p.slug === product.slug
    );

    let updated: Product[];
    if (existingIndex >= 0) {
      updated = [...customList];
      updated[existingIndex] = product;
    } else {
      updated = [product, ...customList];
    }

    localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("coctre_products_updated"));
    return true;
  } catch (err) {
    console.error("Error saving product:", err);
    return false;
  }
}

export function deleteProduct(idOrSlug: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const customList = getCustomProducts();
    const updatedCustom = customList.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug);
    localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(updatedCustom));

    const deletedIds = getDeletedProductIds();
    if (!deletedIds.includes(idOrSlug)) {
      deletedIds.push(idOrSlug);
      localStorage.setItem(STORAGE_DELETED_KEY, JSON.stringify(deletedIds));
    }

    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("coctre_products_updated"));
    return true;
  } catch (err) {
    console.error("Error deleting product:", err);
    return false;
  }
}

export function resetProductsToDefault(): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.removeItem(STORAGE_CUSTOM_KEY);
    localStorage.removeItem(STORAGE_DELETED_KEY);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("coctre_products_updated"));
    return true;
  } catch (err) {
    console.error("Error resetting products:", err);
    return false;
  }
}

export function useProducts(): Product[] {
  const [items, setItems] = useState<Product[]>(initialProducts);

  useEffect(() => {
    setItems(getAllProducts());

    const handleChange = () => {
      setItems(getAllProducts());
    };

    window.addEventListener("storage", handleChange);
    window.addEventListener("coctre_products_updated", handleChange);

    return () => {
      window.removeEventListener("storage", handleChange);
      window.removeEventListener("coctre_products_updated", handleChange);
    };
  }, []);

  return items;
}
