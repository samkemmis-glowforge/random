export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-paper py-6">
      <div className="mx-auto flex max-w-[1120px] flex-wrap justify-between gap-3 px-6 text-[0.82rem] font-semibold text-ink-soft">
        <span>© 2026 Glowforge, Inc.</span>
        <nav className="flex gap-[18px]">
          <a className="no-underline hover:text-ink" href="#">
            Privacy
          </a>
          <a className="no-underline hover:text-ink" href="#">
            Terms
          </a>
          <a className="no-underline hover:text-ink" href="#">
            Support
          </a>
        </nav>
      </div>
    </footer>
  );
}
