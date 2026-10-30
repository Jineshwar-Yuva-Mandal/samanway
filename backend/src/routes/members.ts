import { Hono } from "hono";
import { adminClient } from "../db/client.js";
import type { AppEnv } from "../types.js";

const members = new Hono<AppEnv>();

members.get("/", async (c) => {
  const mandalId = c.get("mandalId");

  const { data, error } = await adminClient
    .from("profiles")
    .select("id, full_name, phone, role, joined_date")
    .eq("mandal_id", mandalId)
    .order("full_name");

  if (error) return c.json({ error: error.message }, 500);
  return c.json({ data });
});

members.get("/:id", async (c) => {
  const mandalId = c.get("mandalId");
  const id = c.req.param("id");

  const { data, error } = await adminClient
    .from("profiles")
    .select("*")
    .eq("mandal_id", mandalId)
    .eq("id", id)
    .maybeSingle();

  if (error) return c.json({ error: error.message }, 500);
  if (!data) return c.json({ error: "Not found" }, 404);
  return c.json({ data });
});

export default members;
