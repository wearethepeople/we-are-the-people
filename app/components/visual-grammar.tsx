// Recurring visual grammar from the design handoff (docs/ design-handoff
// package), factored into small reusable pieces so marketing pages compose
// them instead of repeating the same arbitrary-value Tailwind classes.

import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

// Orange inset-underline highlight for key phrases in headlines: a low-sitting
// bar so text floats on top, not a background highlight.
export function OrangeUnderline({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "relative z-0 inline-block after:absolute after:inset-x-0 after:bottom-1 after:-z-10 after:h-3.5 after:bg-accent after:content-['']",
        className,
      )}
      {...props}
    />
  );
}
