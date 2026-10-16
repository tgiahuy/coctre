export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  projectType: string;
  bambooSupplied: string;
  totalQuantity: string;
  completionYear: string;
  coverImage: string;
  gallery: string[];
  shortDescription: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string;
  productsUsed: string[];
  featured?: boolean;
}

export const projects: Project[] = [];


export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string, limit = 3): Project[] {
  return projects.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
