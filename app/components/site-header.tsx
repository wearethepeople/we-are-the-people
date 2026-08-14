import { Link } from "react-router";
import { WrtpIcon } from "~/components/wrtp-icon";
import { WrtpTextHorizontal } from "~/components/wrtp-text";

export function SiteHeader() {
  return (
    <header className="pt-10">
      <Link to="/" className="flex w-fit items-center gap-3.5 no-underline">
        <WrtpIcon className="h-8 w-7.5 text-accent" />
        <WrtpTextHorizontal className="h-5 text-foreground" />
      </Link>
    </header>
  );
}
