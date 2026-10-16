"use client";

import { useEffect } from "react";
import { useSiteConfig } from "@/lib/configStore";

export default function DynamicFavicon() {
  const config = useSiteConfig();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const targetFavicon = config.faviconUrl || config.logoUrl || "/favicon.ico";
    if (!targetFavicon) return;

    try {
      const head = document.head || document.getElementsByTagName("head")[0];
      if (!head) return;

      // Clean up previous icon links
      const existingIcons = document.querySelectorAll(
        "link[rel='icon'], link[rel='shortcut icon'], link[rel='apple-touch-icon']"
      );
      existingIcons.forEach((el) => el.remove());

      // Create new icon link
      const iconLink = document.createElement("link");
      iconLink.rel = "icon";
      if (targetFavicon.endsWith(".ico")) iconLink.type = "image/x-icon";
      else if (targetFavicon.endsWith(".svg")) iconLink.type = "image/svg+xml";
      else if (targetFavicon.endsWith(".png")) iconLink.type = "image/png";
      else if (targetFavicon.endsWith(".webp")) iconLink.type = "image/webp";
      iconLink.href = targetFavicon;
      head.appendChild(iconLink);

      // Create shortcut icon link
      const shortcutLink = document.createElement("link");
      shortcutLink.rel = "shortcut icon";
      shortcutLink.href = targetFavicon;
      head.appendChild(shortcutLink);

      // Create apple-touch-icon link
      const appleTouchLink = document.createElement("link");
      appleTouchLink.rel = "apple-touch-icon";
      appleTouchLink.href = config.logoUrl || targetFavicon;
      head.appendChild(appleTouchLink);
    } catch (e) {
      console.warn("Failed to update dynamic favicon:", e);
    }
  }, [config.faviconUrl, config.logoUrl]);

  return null;
}
