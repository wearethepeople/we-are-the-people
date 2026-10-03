function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-start justify-between gap-4 border-border pt-6 pb-10 text-[13px] text-foreground/60">
      <div className="flex flex-col gap-1">
        <span>&copy; 2026 We (ARE) the People</span>
        <div className="flex items-center gap-2">
          <a
            href="https://www.instagram.com/wrtp.us/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram: @wrtp.us"
            className="text-foreground/60 hover:text-accent"
          >
            <InstagramIcon className="size-4" />
          </a>
          <a href="mailto:info@wearethepeople.us" className="text-foreground/60 hover:text-accent">
            info@wearethepeople.us
          </a>
        </div>
      </div>
      <span>
        We're not red&ensp;&middot;&ensp;We're not blue&ensp;&middot;&ensp;We are the People
      </span>
    </footer>
  );
}
