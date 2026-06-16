import { asset } from "@/lib/base";

const STEPS = [
  {
    img: "/assets/milo-photo-popout.png",
    framed: false,
    alt: "A snapshot of Milo the dog",
    arrow: true,
    num: "01",
    title: "The photo you have",
    note: "Any picture works — phone photo, kid's drawing, old logo.",
  },
  {
    img: "/assets/milo-trace-transparent.png",
    framed: false,
    alt: "The same dog traced as clean vector line art",
    arrow: true,
    num: "02",
    title: "The vector we trace",
    note: "Background removed, clean engraving paths, fitted to your object.",
  },
  {
    img: "/assets/milo-3-coaster.png",
    framed: true,
    alt: "The dog engraved on a round wooden coaster",
    arrow: false,
    num: "03",
    title: "The thing you keep",
    note: "Dialed-in power & speed for your machine and material. Then burn.",
  },
];

export default function Pipeline() {
  return (
    <section className="px-6 py-[clamp(64px,9vw,110px)]" id="how">
      <div className="mx-auto max-w-[1120px]">
        <h2 className="font-display text-[clamp(2.4rem,6.5vw,4.6rem)] uppercase leading-[0.98] tracking-[-0.015em]">
          Three steps.
          <br />
          Zero guesswork.
        </h2>
        <p className="mt-[18px] max-w-[52ch] text-[clamp(1rem,1.6vw,1.18rem)] font-semibold text-ink-soft">
          No prompt-roulette. Magic Engraver works from the picture you already have — and shows its work at every step.
        </p>

        <div className="pipe-grid mt-12 grid grid-cols-1 max-[920px]:mx-auto max-[920px]:max-w-[420px] min-[921px]:grid-cols-3 min-[921px]:items-start">
          {STEPS.map((s) => (
            <figure className="pipe-card m-0" key={s.num}>
              <div className="pipe-shot">
                <img className={`pipe-img${s.framed ? " pipe-img--framed" : ""}`} src={asset(s.img)} alt={s.alt} />
                {s.arrow && (
                  <img className="pipe-arrow" src={asset("/assets/mark-arrow-swoosh.png")} alt="" aria-hidden="true" />
                )}
              </div>
              <figcaption className="mt-4 font-display text-[clamp(1.05rem,1.8vw,1.35rem)] uppercase tracking-[-0.01em]">
                <span className="mr-[10px] text-teal">{s.num}</span>
                {s.title}
              </figcaption>
              <p className="mt-2 max-w-[30ch] text-[0.95rem] font-semibold text-ink-soft">{s.note}</p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
