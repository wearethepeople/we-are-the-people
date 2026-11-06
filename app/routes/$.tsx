import { data } from "react-router";

// Catch-all for paths no other route matches. Matching them here, rather than
// letting the router fall through, means the root middleware runs first, so
// www and the Fly hostname redirect to the canonical host before the 404.
// The root ErrorBoundary renders the not-found page.
export function loader() {
  throw data(null, { status: 404 });
}

// Never rendered (the loader always throws), but a route without a component
// is a resource route and would send a bare 404 body instead of the page.
export default function NotFound() {
  return null;
}
