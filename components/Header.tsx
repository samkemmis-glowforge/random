export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-6">
        <div className="flex items-baseline gap-2">
          <span className="text-[1.05rem] text-teal" aria-hidden="true">
            ✦
          </span>
          <span className="font-display text-base tracking-[0.02em]">MAGIC&nbsp;ENGRAVER</span>
          <span className="font-mono text-[0.7rem] text-ink-soft">by Glowforge&nbsp;Premium</span>
        </div>
        <nav className="flex items-center gap-[18px]">
          <a className="text-[0.92rem] font-bold text-ink-soft no-underline hover:text-ink" href="#" data-auth-link>
            Sign in
          </a>
          <a className="btn btn-small" href="#try">
            Try it free
          </a>
        </nav>
      </div>
    </header>
  );
}
