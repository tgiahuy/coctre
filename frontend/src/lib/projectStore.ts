"use client";

import { useEffect, useState } from "react";
import { projects as initialProjects, Project } from "@/data/projects";

const STORAGE_CUSTOM_KEY = "coctre_custom_projects";
const STORAGE_DELETED_KEY = "coctre_deleted_project_ids";

export function getDeletedProjectIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_DELETED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function getCustomProjects(): Project[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_CUSTOM_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function getAllProjects(): Project[] {
  if (typeof window === "undefined") return initialProjects;
  const deletedIds = getDeletedProjectIds();
  const customList = getCustomProjects();

  const filteredDefaults = initialProjects.filter((init) => {
    if (deletedIds.includes(init.id) || deletedIds.includes(init.slug)) return false;
    const hasCustomOverride = customList.some((c) => c.id === init.id || c.slug === init.slug);
    return !hasCustomOverride;
  });

  return [...customList, ...filteredDefaults];
}

export function getProjectBySlug(slug: string): Project | undefined {
  const all = getAllProjects();
  return all.find((p) => p.slug === slug || p.id === slug);
}

export function saveProject(project: Project): boolean {
  if (typeof window === "undefined") return false;
  try {
    const customList = getCustomProjects();
    const deletedIds = getDeletedProjectIds();

    const newDeleted = deletedIds.filter((id) => id !== project.id && id !== project.slug);
    localStorage.setItem(STORAGE_DELETED_KEY, JSON.stringify(newDeleted));

    const existingIndex = customList.findIndex(
      (p) => p.id === project.id || p.slug === project.slug
    );

    let updated: Project[];
    if (existingIndex >= 0) {
      updated = [...customList];
      updated[existingIndex] = project;
    } else {
      updated = [project, ...customList];
    }

    localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("coctre_projects_updated"));
    return true;
  } catch (err) {
    console.error("Error saving project:", err);
    return false;
  }
}

export function deleteProject(idOrSlug: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const customList = getCustomProjects();
    const updatedCustom = customList.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug);
    localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(updatedCustom));

    const deletedIds = getDeletedProjectIds();
    if (!deletedIds.includes(idOrSlug)) {
      deletedIds.push(idOrSlug);
      localStorage.setItem(STORAGE_DELETED_KEY, JSON.stringify(deletedIds));
    }

    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("coctre_projects_updated"));
    return true;
  } catch (err) {
    console.error("Error deleting project:", err);
    return false;
  }
}

export function resetProjectsToDefault(): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.removeItem(STORAGE_CUSTOM_KEY);
    localStorage.removeItem(STORAGE_DELETED_KEY);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("coctre_projects_updated"));
    return true;
  } catch (err) {
    console.error("Error resetting projects:", err);
    return false;
  }
}

export function useProjects(): Project[] {
  const [items, setItems] = useState<Project[]>(initialProjects);

  useEffect(() => {
    setItems(getAllProjects());

    const handleChange = () => {
      setItems(getAllProjects());
    };

    window.addEventListener("storage", handleChange);
    window.addEventListener("coctre_projects_updated", handleChange);

    return () => {
      window.removeEventListener("storage", handleChange);
      window.removeEventListener("coctre_projects_updated", handleChange);
    };
  }, []);

  return items;
}
