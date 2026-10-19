"use client";

import { projects as initialProjects, Project } from "@/data/projects";

export async function requestProjects(): Promise<Project[]> {
  return initialProjects;
}

export const getDeletedProjectIds = (): string[] => [];
export const getCustomProjects = (): Project[] => [];
export const getAllProjects = (): Project[] => initialProjects;
export const getProjectBySlug = (slug: string): Project | undefined =>
  initialProjects.find((project) => project.slug === slug || project.id === slug);

export async function saveProject(project: Project): Promise<boolean> {
  void project;
  return false;
}

export async function deleteProject(idOrSlug: string): Promise<boolean> {
  void idOrSlug;
  return false;
}

export function resetProjectsToDefault(): boolean {
  return true;
}

export function useProjects(): Project[] {
  return useProjectsState().data;
}

export function useProjectsState(): { data: Project[]; isLoading: boolean; error: string | null } {
  return { data: initialProjects, isLoading: false, error: null };
}
