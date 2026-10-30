import { Hono } from "hono";
import { adminClient } from "../db/client.js";
import type { AppEnv } from "../types.js";

const events = new Hono<AppEnv>();

events.get("/", async (c) => {
  const mandalId = c.get("mandalId");

  const { data, error } = await adminClient
    .from("events")
    .select("id, title, event_date, location, has_fine, fine_amount")
    .eq("mandal_id", mandalId)
    .order("event_date", { ascending: false });

  if (error) return c.json({ error: error.message }, 500);
  return c.json({ data });
});

events.get("/:id", async (c) => {
  const mandalId = c.get("mandalId");
  const id = c.req.param("id");

  const { data, error } = await adminClient
    .from("events")
    .select("*")
    .eq("mandal_id", mandalId)
    .eq("id", id)
    .maybeSingle();

  if (error) return c.json({ error: error.message }, 500);
  if (!data) return c.json({ error: "Not found" }, 404);
  return c.json({ data });
});

export default events;
