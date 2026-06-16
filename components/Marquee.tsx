const LINE =
  "works with any laser ✦ xTool ✦ OmTech ✦ Creality Falcon ✦ Thunder ✦ K40 ✦ Epilog ✦ LaserPecker ✦ Atomstack ✦ Glowforge ✦ ";

export default function Marquee() {
  return (
    <section className="overflow-hidden border-y-[3px] border-ink bg-pine py-[18px] text-paper" aria-label="Compatible laser brands">
      <div className="marquee-track" aria-hidden="true">
        <span className="whitespace-nowrap font-display text-[clamp(1.3rem,3vw,2.1rem)] uppercase tracking-[0.04em]">
          {LINE}
        </span>
        <span className="whitespace-nowrap font-display text-[clamp(1.3rem,3vw,2.1rem)] uppercase tracking-[0.04em]">
          {LINE}
        </span>
      </div>
      <p className="visually-hidden">
        Works with any laser: xTool, OmTech, Creality Falcon, Thunder, K40, Epilog, LaserPecker, Atomstack, Glowforge, and any GCode laser.
      </p>
    </section>
  );
}
