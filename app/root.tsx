import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import { useNonce } from "~/lib/nonce-context";
import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";

export function Layout({ children }: { children: React.ReactNode }) {
  const nonce = useNonce();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#e7e0d8" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Something went wrong.";
  let details = "Please try again.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "Page not found." : "Error.";
    details =
      error.status === 404
        ? "We could not find the page you requested."
        : details;
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-6 text-foreground">
      <div className="flex w-full max-w-160 flex-col">
        <SiteHeader />

        <main className="flex flex-1 flex-col justify-center py-24">
          <h1 className="m-0 text-pretty text-[clamp(40px,7vw,64px)] leading-[1.05] font-medium tracking-[-0.02em]">
            {message}
          </h1>
          <p className="mt-12 max-w-[46ch] text-pretty text-[clamp(17px,2.4vw,20px)] leading-[1.55]">
            {details}{" "}
            <Link to="/" className="underline">
              Click here to go to the homepage.
            </Link>
          </p>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
