import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfiguration } from "./config";

export function createSupabaseBrowserClient() {
  const { url, publishableKey } = getSupabaseConfiguration();
  return createBrowserClient(url, publishableKey);
}
