"use client";

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
  return normalizeConfig(initialSiteConfig);
}

export function getSiteConfig(): SiteConfig {
  return initialSiteConfig;
}

export async function saveSiteConfig(updates: Partial<SiteConfig>): Promise<boolean> {
  void updates;
  return false;
}

export function resetSiteConfigToDefault(): boolean {
  return true;
}

export function useSiteConfig(): SiteConfig {
  return initialSiteConfig;
}
