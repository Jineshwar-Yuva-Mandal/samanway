import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { serve } from "@hono/node-server";
import { authMiddleware } from "./middleware/auth.js";
import members from "./routes/members.js";
import events from "./routes/events.js";
import attendance from "./routes/attendance.js";
import fines from "./routes/fines.js";

const app = new Hono();

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3001",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Health check — no auth required
app.get("/health", (c) => c.json({ status: "ok" }));

// All API routes require auth + tenant resolution
app.use("/api/*", authMiddleware);
app.route("/api/members",    members);
app.route("/api/events",     events);
app.route("/api/attendance", attendance);
app.route("/api/fines",      fines);

const port = Number(process.env.PORT ?? 3002);
console.log(`Samanway backend running on http://localhost:${port}`);

serve({ fetch: app.fetch, port });
