import { supabase } from "@/integrations/supabase/client";
import { isInstalledPwa } from "@/lib/pwa";

export type PushSupport = "push" | "ios-not-installed" | "unsupported";

const VAPID_PUBLIC_KEY = (import.meta.env["VITE_VAPID_PUBLIC_KEY"] as string | undefined) ?? "";

function isIos(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && "ontouchend" in document);
}

/** What this browser can do right now. Never asks for permission. */
export function getPushSupport(): PushSupport {
  if (typeof window === "undefined") return "unsupported";
  const hasApis =
    "Notification" in window && "PushManager" in window && "serviceWorker" in navigator;
  if (hasApis && VAPID_PUBLIC_KEY) return "push";
  if (isIos() && !isInstalledPwa()) return "ios-not-installed";
  return "unsupported";
}

/** Registers the notifications-only service worker. Safe to call repeatedly. */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return null;
  try {
    return await navigator.serviceWorker.register("/sw.js");
  } catch {
    return null;
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) output[i] = raw.charCodeAt(i);
  return output;
}

function keyToBase64(sub: PushSubscription, name: "p256dh" | "auth"): string {
  const key = sub.getKey(name);
  if (!key) return "";
  const bytes = new Uint8Array(key);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

async function upsertSubscription(sub: PushSubscription): Promise<boolean> {
  const { data } = await supabase.auth.getUser();
  const uid = data.user?.id;
  if (!uid) return false;
  const p256dh = keyToBase64(sub, "p256dh");
  const auth = keyToBase64(sub, "auth");
  if (!p256dh || !auth) return false;
  const { error } = await supabase.from("push_subscriptions").upsert(
    {
      user_id: uid,
      endpoint: sub.endpoint,
      p256dh,
      auth,
      user_agent: typeof navigator === "undefined" ? null : navigator.userAgent,
      last_seen_at: new Date().toISOString(),
      failed_at: null,
    },
    { onConflict: "endpoint" },
  );
  return !error;
}

/**
 * Asks for permission and stores the subscription. This is the ONLY place the
 * notification permission is ever requested.
 */
export async function subscribeToPush(): Promise<boolean> {
  if (getPushSupport() !== "push") return false;
  try {
    const permission =
      Notification.permission === "granted"
        ? "granted"
        : await Notification.requestPermission();
    if (permission !== "granted") return false;

    const registration = (await registerServiceWorker()) ?? (await navigator.serviceWorker.ready);
    if (!registration) return false;
    await navigator.serviceWorker.ready;

    const existing = await registration.pushManager.getSubscription();
    const sub =
      existing ??
      (await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      }));
    return await upsertSubscription(sub);
  } catch {
    return false;
  }
}

/**
 * Refreshes a subscription that already exists in this browser (endpoints
 * rotate). Never asks for permission.
 */
export async function syncPushSubscription(): Promise<void> {
  if (typeof window === "undefined") return;
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  if (!("serviceWorker" in navigator)) return;
  try {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.getSubscription();
    if (!sub) return;
    await upsertSubscription(sub);
  } catch {
    /* silent: this is a background refresh */
  }
}

/** 'default' | 'granted' | 'denied' — 'unsupported' when the API is missing. */
export function notificationPermission(): NotificationPermission | "unsupported" {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  return Notification.permission;
}
