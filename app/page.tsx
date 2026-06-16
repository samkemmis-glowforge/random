import AuthModal from "@/components/AuthModal";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Pipeline from "@/components/Pipeline";
import TryWidget from "@/components/TryWidget";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />

        {/* try-it widget */}
        <section className="border-b-[3px] border-ink bg-paper-deep px-6 py-[clamp(56px,8vw,96px)]" id="try">
          <div className="mx-auto max-w-[1120px]">
            <div className="mb-10 text-center">
              <h2 className="font-display text-[clamp(2.4rem,6.5vw,4.6rem)] uppercase leading-[0.98] tracking-[-0.015em]">
                Go on.
                <br />
                Try it.
              </h2>
              <p className="mx-auto mt-[18px] max-w-[52ch] text-[clamp(1rem,1.6vw,1.18rem)] font-semibold text-ink-soft">
                Your photo stays on your device in this demo.
              </p>
            </div>
            <TryWidget />
          </div>
        </section>

        <Pipeline />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <AuthModal />
    </>
  );
}
