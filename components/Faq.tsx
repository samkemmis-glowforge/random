const ITEMS = [
  {
    q: "Does it really work with my laser?",
    a: "If your machine takes SVG, DXF, or GCode, yes. Magic Engraver exports laser-ready files with suggested power/speed settings per material, tuned for popular machines from xTool, OmTech, Creality, Thunder, Epilog, and generic K40s — plus native support on Glowforge hardware.",
  },
  {
    q: "What exactly is gated behind the account?",
    a: "Seeing your finished engraving preview — and exporting the laser-ready file — requires a free Glowforge account, which starts your 14-day Premium trial. No credit card.",
  },
  {
    q: "What happens after the 14 days?",
    a: "Your designs stay yours. Magic Engraver and other Premium tools require a subscription after the trial; we'll tell you before anything changes, and there's no auto-charge because we never took a card.",
  },
  {
    q: "Is my photo private?",
    a: "Yes. Uploaded images are used only to generate your design, are never used to train models, and can be deleted from your account at any time.",
  },
];

export default function Faq() {
  return (
    <section className="px-6 pb-[clamp(64px,9vw,110px)]">
      <div className="mx-auto max-w-[780px]">
        <h2 className="mb-9 font-display text-[clamp(2.4rem,6.5vw,4.6rem)] uppercase leading-[0.98] tracking-[-0.015em]">
          Questions
        </h2>
        {ITEMS.map((it) => (
          <details className="faq-item" key={it.q}>
            <summary>{it.q}</summary>
            <p className="mt-3 max-w-[62ch] font-medium text-ink-soft">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
