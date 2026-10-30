import { createMiddleware } from "hono/factory";
import { adminClient } from "../db/client.js";
import type { AppEnv } from "../types.js";

export const authMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = authHeader.slice(7);

  // Verify the JWT with Supabase
  const { data: { user }, error } = await adminClient.auth.getUser(token);
  if (error || !user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  // Resolve tenant: get this user's active mandal membership
  const { data: membership, error: membershipError } = await adminClient
    .from("mandal_memberships")
    .select("mandal_id, role")
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  if (membershipError || !membership) {
    return c.json({ error: "No active mandal membership found" }, 403);
  }

  c.set("userId", user.id);
  c.set("mandalId", membership.mandal_id);
  c.set("role", membership.role as "admin" | "member");

  await next();
});
