"use client";

export interface AdminUser {
  email: string;
  fullName: string;
  role: string;
  token: string;
}

const AUTH_USER_KEY = "coctre_admin_user";
const AUTH_TOKEN_KEY = "coctre_admin_token";

export function getStoredUser(): AdminUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(AUTH_USER_KEY) || localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isUserAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const token = sessionStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem(AUTH_TOKEN_KEY);
    const user = getStoredUser();
    return Boolean(token || user);
  } catch {
    return false;
  }
}

export function saveUserAuth(user: AdminUser, rememberMe: boolean = false): void {
  if (typeof window === "undefined") return;
  try {
    const data = JSON.stringify(user);
    if (rememberMe) {
      localStorage.setItem(AUTH_USER_KEY, data);
      localStorage.setItem(AUTH_TOKEN_KEY, user.token);
      localStorage.setItem("coctre_admin_auth", "true");
    } else {
      sessionStorage.setItem(AUTH_USER_KEY, data);
      sessionStorage.setItem(AUTH_TOKEN_KEY, user.token);
      sessionStorage.setItem("coctre_admin_auth", "true");
    }
    window.dispatchEvent(new Event("coctre_auth_changed"));
  } catch (e) {
    console.warn("Storage write error", e);
  }
}

export function clearUserAuth(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(AUTH_USER_KEY);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem("coctre_admin_auth");
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem("coctre_admin_auth");
    window.dispatchEvent(new Event("coctre_auth_changed"));
  } catch (e) {
    console.warn("Storage clear error", e);
  }
}
