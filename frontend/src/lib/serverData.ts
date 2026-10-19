import { products as staticProducts, Product } from "@/data/products";
import { articles as staticArticles, Article } from "@/data/articles";
import { projects as staticProjects, Project } from "@/data/projects";

export async function getServerProducts(): Promise<Product[]> {
  return staticProducts;
}

export async function getServerProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await getServerProducts();
  return all.find((p) => p.slug === slug || p.id === slug);
}

export async function getServerArticles(): Promise<Article[]> {
  return staticArticles;
}

export async function getServerArticleBySlug(slug: string): Promise<Article | undefined> {
  const all = await getServerArticles();
  return all.find((a) => a.slug === slug || a.id === slug);
}

export async function getServerProjects(): Promise<Project[]> {
  return staticProjects;
}

export async function getServerProjectBySlug(slug: string): Promise<Project | undefined> {
  const all = await getServerProjects();
  return all.find((p) => p.slug === slug || p.id === slug);
}
