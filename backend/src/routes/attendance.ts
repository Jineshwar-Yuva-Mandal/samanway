import { Hono } from "hono";
import { adminClient } from "../db/client.js";
import type { AppEnv } from "../types.js";

const attendance = new Hono<AppEnv>();

attendance.get("/", async (c) => {
  const mandalId = c.get("mandalId");
  const eventId = c.req.query("event_id");

  let query = adminClient
    .from("event_attendance")
    .select("id, event_id, user_id, status, rsvp_status, marked_at")
    .eq("mandal_id", mandalId);

  if (eventId) query = query.eq("event_id", eventId);

  const { data, error } = await query.order("marked_at", { ascending: false });
  if (error) return c.json({ error: error.message }, 500);
  return c.json({ data });
});

attendance.patch("/:id", async (c) => {
  const mandalId = c.get("mandalId");
  const id = c.req.param("id");
  const body = await c.req.json<{ status: string }>();

  const { data, error } = await adminClient
    .from("event_attendance")
    .update({ status: body.status, marked_by: c.get("userId"), marked_at: new Date().toISOString() })
    .eq("id", id)
    .eq("mandal_id", mandalId)
    .select()
    .maybeSingle();

  if (error) return c.json({ error: error.message }, 500);
  if (!data) return c.json({ error: "Not found" }, 404);
  return c.json({ data });
});

export default attendance;
