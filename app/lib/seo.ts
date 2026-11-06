// The one canonical origin. Absolute URLs in metadata (canonical, og:url,
// og:image, JSON-LD) are built from this, and every other host that reaches
// the app is redirected to it (see canonicalHostRedirect).
export const SITE_ORIGIN = "https://wearethepeople.us";

// www and the Fly hostname serve the same site as the apex, so they are sent
// to it with a permanent redirect: one address in links and in search results.
// A 301 consolidates them outright, where a canonical tag is only a hint.
// The health check path is never redirected so Fly's checks keep answering
// whatever host they arrive on; localhost is left alone for local dev.
// Returns the destination, or null. Applied in server.ts, ahead of static
// files. Same rule as whatsyourtake.us and itsourmoney.us.
const CANONICAL_HOST = new URL(SITE_ORIGIN).hostname;
const HEALTHCHECK_PATH = "/resources/healthcheck";

export function canonicalHostRedirect(url: URL): string | null {
  if (url.pathname === HEALTHCHECK_PATH) return null;
  if (url.hostname !== `www.${CANONICAL_HOST}` && !url.hostname.endsWith(".fly.dev")) return null;
  return `${SITE_ORIGIN}${url.pathname}${url.search}`;
}
