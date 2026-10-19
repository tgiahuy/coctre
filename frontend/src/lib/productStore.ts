"use client";

import { products as initialProducts, Product } from "@/data/products";

export async function requestProducts(): Promise<Product[]> {
  return initialProducts;
}

export const getDeletedProductIds = (): string[] => [];
export const getCustomProducts = (): Product[] => [];
export const getAllProducts = (): Product[] => initialProducts;
export const getProductBySlug = (slug: string): Product | undefined =>
  initialProducts.find((product) => product.slug === slug || product.id === slug);

export async function saveProduct(product: Product): Promise<boolean> {
  void product;
  return false;
}

export async function deleteProduct(idOrSlug: string): Promise<boolean> {
  void idOrSlug;
  return false;
}

export function resetProductsToDefault(): boolean {
  return true;
}

export function useProducts(): Product[] {
  return useProductsState().data;
}

export function useProductsState(): { data: Product[]; isLoading: boolean; error: string | null } {
  return { data: initialProducts, isLoading: false, error: null };
}
