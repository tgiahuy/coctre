"use client";

import { useEffect } from "react";
import { useSiteConfig } from "@/lib/configStore";

/**
 * Safely updates browser favicon and apple-touch-icon in place without
 * removing or destroying DOM nodes managed by React/Next.js metadata.
 */
export default function DynamicFavicon() {
  const config = useSiteConfig();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const targetFavicon = config.faviconUrl || config.logoUrl;
    if (!targetFavicon) return;

    try {
      // 1. Update existing icon links in place instead of calling el.remove()
      // Calling el.remove() detaches nodes that React virtual DOM reconciles,
      // which causes: "TypeError: Cannot read properties of null (reading 'removeChild')"
      const existingIcons = document.querySelectorAll<HTMLLinkElement>(
        "link[rel='icon'], link[rel='shortcut icon']"
      );

      if (existingIcons.length > 0) {
        existingIcons.forEach((el) => {
          el.href = targetFavicon;
        });
      } else {
        let link = document.querySelector<HTMLLinkElement>("link#dynamic-favicon");
        if (!link) {
          link = document.createElement("link");
          link.id = "dynamic-favicon";
          link.rel = "icon";
          document.head.appendChild(link);
        }
        link.href = targetFavicon;
      }

      // 2. Update apple-touch-icon in place
      const appleIcons = document.querySelectorAll<HTMLLinkElement>(
        "link[rel='apple-touch-icon']"
      );
      const targetTouchIcon = config.logoUrl || targetFavicon;
      if (appleIcons.length > 0) {
        appleIcons.forEach((el) => {
          el.href = targetTouchIcon;
        });
      }
    } catch (e) {
      console.warn("Failed to update dynamic favicon:", e);
    }
  }, [config.faviconUrl, config.logoUrl]);

  return null;
}
