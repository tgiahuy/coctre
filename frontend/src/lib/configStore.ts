"use client";

import { useEffect, useState } from "react";
import { siteConfig as initialSiteConfig, SiteConfig } from "@/data/config";

const CONFIG_STORAGE_KEY = "coctre_custom_site_config";

export function getSiteConfig(): SiteConfig {
  if (typeof window === "undefined") {
    return initialSiteConfig;
  }
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!raw) return initialSiteConfig;
    const parsed = JSON.parse(raw);
    if (parsed.companyName && parsed.companyName.includes("Hòa Bình")) {
      localStorage.removeItem(CONFIG_STORAGE_KEY);
      return initialSiteConfig;
    }
    return { ...initialSiteConfig, ...parsed };
  } catch (err) {
    console.error("Error loading custom site config:", err);
    return initialSiteConfig;
  }
}

export function saveSiteConfig(updates: Partial<SiteConfig>): boolean {
  if (typeof window === "undefined") return false;
  try {
    const current = getSiteConfig();
    const merged = { ...current, ...updates };
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(merged));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("coctre_config_updated"));
    return true;
  } catch (err) {
    console.error("Error saving site config:", err);
    return false;
  }
}

export function resetSiteConfigToDefault(): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.removeItem(CONFIG_STORAGE_KEY);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("coctre_config_updated"));
    return true;
  } catch (err) {
    console.error("Error resetting site config:", err);
    return false;
  }
}

export function useSiteConfig(): SiteConfig {
  const [config, setConfig] = useState<SiteConfig>(initialSiteConfig);

  useEffect(() => {
    setConfig(getSiteConfig());

    const handleChange = () => {
      setConfig(getSiteConfig());
    };

    window.addEventListener("storage", handleChange);
    window.addEventListener("coctre_config_updated", handleChange);

    return () => {
      window.removeEventListener("storage", handleChange);
      window.removeEventListener("coctre_config_updated", handleChange);
    };
  }, []);

  return config;
}
