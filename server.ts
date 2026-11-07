// Production server. Serves the build the way react-router-serve does, with
// one addition: www and the Fly hostname are redirected to the canonical host
// before anything else runs, static files included. Same pattern as
// whatsyourtake.us and itsourmoney.us. HTTPS is forced and terminated at
// Fly's edge, which forwards plain HTTP to this process, so the app must
// trust the proxy (see "trust proxy" below).
// Development uses `react-router dev` and never runs this file.
import { createRequestHandler } from "@react-router/express";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import { canonicalHostRedirect } from "./app/lib/seo.ts";

const BUILD_PATH = "./build/server/index.js";
const PORT = Number(process.env.PORT ?? 3000);

const app = express();
app.disable("x-powered-by");
// Fly terminates TLS and talks plain HTTP to us. Without this, req.protocol is
// "http", React Router builds request URLs as http://wearethepeople.us/..., and
// its CSRF check rejects every form POST (including the newsletter signup)
// because the browser's Origin header is https://wearethepeople.us. Trusting
// one hop makes Express read Fly's X-Forwarded-Proto / X-Forwarded-Host.
app.set("trust proxy", 1);

const getHost = (req: express.Request) => req.get("X-Forwarded-Host") ?? req.get("host") ?? "";

app.use((req, res, next) => {
  const target = canonicalHostRedirect(new URL(req.originalUrl, `http://${getHost(req)}`));
  if (target) return res.redirect(301, target);
  next();
});

app.use(compression());
// Fingerprinted by the build, so safe to cache forever.
app.use("/assets", express.static("build/client/assets", { immutable: true, maxAge: "1y" }));
app.use(express.static("build/client"));
app.use(morgan("tiny"));
app.all(
  "/{*splat}",
  createRequestHandler({ build: await import(BUILD_PATH), mode: process.env.NODE_ENV }),
);

const server = app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
for (const signal of ["SIGTERM", "SIGINT"]) {
  process.once(signal, () => server.close());
}
