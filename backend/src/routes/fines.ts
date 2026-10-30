import { Hono } from "hono";
import { adminClient } from "../db/client.js";
import type { AppEnv } from "../types.js";

const fines = new Hono<AppEnv>();

fines.get("/", async (c) => {
  const mandalId = c.get("mandalId");
  const status = c.req.query("status"); // pending | paid | waived

  let query = adminClient
    .from("fines")
    .select("id, user_id, event_id, amount, status, due_date, paid_date")
    .eq("mandal_id", mandalId);

  if (status) query = query.eq("status", status);

  const { data, error } = await query.order("due_date", { ascending: true });
  if (error) return c.json({ error: error.message }, 500);
  return c.json({ data });
});

fines.patch("/:id/pay", async (c) => {
  const mandalId = c.get("mandalId");
  const id = c.req.param("id");
  const body = await c.req.json<{ payment_mode: string; payment_reference?: string }>();

  const { data, error } = await adminClient
    .from("fines")
    .update({
      status: "paid",
      paid_date: new Date().toISOString().split("T")[0],
      payment_mode: body.payment_mode,
      payment_reference: body.payment_reference ?? null,
      recorded_by: c.get("userId"),
      recorded_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("mandal_id", mandalId)
    .select()
    .maybeSingle();

  if (error) return c.json({ error: error.message }, 500);
  if (!data) return c.json({ error: "Not found" }, 404);
  return c.json({ data });
});

export default fines;
