import { data } from "react-router";

// Catch-all for paths no other route matches. Without it the router throws
// "No route matches URL" and logs a stack trace for every 404. The root
// ErrorBoundary renders the not-found page. Same as whatsyourtake.us and
// itsourmoney.us.
export function loader() {
  throw data(null, { status: 404 });
}

// Never rendered (the loader always throws), but a route without a component
// is a resource route and would send a bare 404 body instead of the page.
export default function NotFound() {
  return null;
}
