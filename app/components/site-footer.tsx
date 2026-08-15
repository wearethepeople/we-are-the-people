export function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-start justify-between gap-4 border-border pt-6 pb-10 text-[13px] text-foreground/60">
      <div className="flex flex-col gap-1">
        <span>&copy; 2026 We (ARE) the People</span>
        <a href="mailto:info@wearethepeople.us" className="text-foreground/60 hover:text-accent">
          info@wearethepeople.us
        </a>
      </div>
      <span>
        We're not red&ensp;&middot;&ensp;We're not blue&ensp;&middot;&ensp;We are the People
      </span>
    </footer>
  );
}
