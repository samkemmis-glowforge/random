import { asset } from "@/lib/base";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t-[3px] border-ink bg-pine px-6 py-[clamp(80px,12vw,140px)] text-paper">
      <img
        className="pointer-events-none absolute right-[clamp(20px,8vw,110px)] top-[clamp(18px,5vw,54px)] w-[clamp(54px,9vw,116px)] opacity-90"
        src={asset("/assets/mark-burst-cream.png")}
        alt=""
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-[1120px] justify-items-center gap-[30px] text-center">
        <h2 className="font-display text-[clamp(2.8rem,8vw,6rem)] uppercase leading-[0.98] tracking-[-0.015em]">
          One photo in.
          <br />
          An heirloom out.
        </h2>
        <a className="btn btn-big btn-ondark" href="#" data-auth-link>
          Start my free 14-day trial →
        </a>
        <p className="font-mono text-[0.8rem] opacity-75">works with any laser · no credit card</p>
      </div>
    </section>
  );
}
