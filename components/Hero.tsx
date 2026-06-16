export default function Hero() {
  return (
    <section
      className="px-6 pb-14 pt-9"
      aria-label="Magic Engraver — photo to vector to engraved object, just like that"
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-5 text-center text-[clamp(0.85rem,1.7vw,1.05rem)] font-extrabold uppercase tracking-[0.42em]">
          <span className="tracking-normal text-teal">✦</span> Magic Engraver{" "}
          <span className="tracking-normal text-teal">✦</span>
        </p>

        <h1 className="visually-hidden">
          Magic Engraver: your photo, traced to vector art, engraved on anything — just like that.
        </h1>

        <figure className="relative mx-auto max-w-[min(100%,880px)]">
          <img
            className="block h-auto w-full rounded-[18px] border-[3px] border-ink"
            src="/assets/hero-triptych.png"
            alt="Triptych: a photo of Milo the dog, the same dog as traced vector line art, and the dog engraved on a round wooden board — captioned JUST LIKE THAT"
          />
        </figure>

        <div className="mt-[clamp(28px,4vw,44px)] text-center">
          <p className="font-display text-[clamp(2.6rem,7.5vw,5.6rem)] uppercase leading-[0.98] tracking-[-0.015em]">
            Put any picture
            <br />
            on anything.
          </p>
          <p className="mt-5 text-[clamp(1.05rem,2vw,1.4rem)] font-semibold text-ink-soft">
            Any photo → laser-ready art → burned onto the real thing.
            <br />
            Works with <strong className="squiggle">any laser</strong>.
          </p>
          <div className="mt-[30px] flex flex-col items-center gap-3">
            <span className="cta-burst">
              <a className="btn btn-big" href="#try">
                Try it with your photo ↓
              </a>
            </span>
            <p className="font-mono text-[0.78rem] text-ink-soft">free to try · no credit card</p>
          </div>
        </div>
      </div>
    </section>
  );
}
