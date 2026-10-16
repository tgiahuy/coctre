"use client";

import { useEffect, useState } from "react";
import { projects as initialProjects, Project } from "@/data/projects";

export async function requestProjects(): Promise<Project[]> {
  const res = await fetch("/api/content/projects", { cache: "no-store" });
  const json = await res.json();
  if (!res.ok || !json.success || !Array.isArray(json.data)) throw new Error(json.message || "Không thể tải dự án");
  return json.data;
}

export const getDeletedProjectIds = (): string[] => [];
export const getCustomProjects = (): Project[] => [];
export const getAllProjects = (): Project[] => initialProjects;
export const getProjectBySlug = (slug: string): Project | undefined =>
  initialProjects.find((project) => project.slug === slug || project.id === slug);

export async function saveProject(project: Project): Promise<boolean> {
  const res = await fetch("/api/content/projects", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(project),
  });
  if (res.ok) window.dispatchEvent(new Event("coctre_projects_updated"));
  return res.ok;
}

export async function deleteProject(idOrSlug: string): Promise<boolean> {
  const res = await fetch(`/api/content/projects/${encodeURIComponent(idOrSlug)}`, { method: "DELETE" });
  if (res.ok) window.dispatchEvent(new Event("coctre_projects_updated"));
  return res.ok;
}

export function resetProjectsToDefault(): boolean {
  window.dispatchEvent(new Event("coctre_projects_updated"));
  return true;
}

export function useProjects(): Project[] {
  return useProjectsState().data;
}

export function useProjectsState(): { data: Project[]; isLoading: boolean; error: string | null } {
  const [items, setItems] = useState<Project[]>(initialProjects);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const refresh = () => {
      void requestProjects()
        .then((data) => { setItems(data); setError(null); })
        .catch((err: unknown) => setError(err instanceof Error ? err.message : "Không thể tải dự án"))
        .finally(() => setIsLoading(false));
    };
    refresh();
    window.addEventListener("coctre_projects_updated", refresh);
    return () => window.removeEventListener("coctre_projects_updated", refresh);
  }, []);
  return { data: items, isLoading, error };
}
