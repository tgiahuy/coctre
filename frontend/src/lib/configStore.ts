"use client";

import { useEffect, useState } from "react";
import { siteConfig as initialSiteConfig, SiteConfig } from "@/data/config";

function normalizeConfig(config: Partial<SiteConfig>): SiteConfig {
  return {
    ...initialSiteConfig,
    ...config,
    address: config.headquarters || config.address || initialSiteConfig.address,
    hotline2: config.hotlineSecondary?.replace(/\D/g, "") || config.hotline2 || initialSiteConfig.hotline2,
    hotline2Formatted: config.hotlineSecondary || config.hotline2Formatted || initialSiteConfig.hotline2Formatted,
  };
}

export async function requestConfig(): Promise<SiteConfig> {
  const res = await fetch("/api/content/config", { cache: "no-store" });
  const json = await res.json();
  if (!res.ok || !json.success || !json.data) throw new Error(json.message || "Không thể tải cấu hình");
  return normalizeConfig(json.data);
}

export function getSiteConfig(): SiteConfig {
  return initialSiteConfig;
}

export async function saveSiteConfig(updates: Partial<SiteConfig>): Promise<boolean> {
  const payload = { ...updates, headquarters: updates.headquarters || updates.address };
  const res = await fetch("/api/content/config", {
    method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
  });
  if (res.ok) window.dispatchEvent(new Event("coctre_config_updated"));
  return res.ok;
}

export function resetSiteConfigToDefault(): boolean {
  window.dispatchEvent(new Event("coctre_config_updated"));
  return true;
}

export function useSiteConfig(): SiteConfig {
  const [config, setConfig] = useState<SiteConfig>(initialSiteConfig);
  useEffect(() => {
    const refresh = () => void requestConfig().then(setConfig).catch(() => undefined);
    refresh();
    window.addEventListener("coctre_config_updated", refresh);
    return () => window.removeEventListener("coctre_config_updated", refresh);
  }, []);
  return config;
}
