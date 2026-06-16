"use client";

import { useEffect, useRef } from "react";

// Placeholder for the real signup redirect. Delegated click handling mirrors
// the production contract: any [data-auth-link] opens the modal; the gated
// result CTA additionally carries data-deeplink + data-design so the URL
// includes the anonymous design's claim token.
const AUTH_BASE = "https://app.glowforge.com/signup";
const UTM = "utm_source=magic-engraver-lp&utm_medium=widget";

export default function AuthModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const urlRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-auth-link]");
      if (!el) return;
      e.preventDefault();
      const design = el.dataset.design;
      const params =
        el.hasAttribute("data-deeplink") && design
          ? `?design=${design}&trial=premium-14d&next=/magic-engraver/${design}&${UTM}`
          : `?trial=premium-14d&next=/magic-engraver&${UTM}`;
      if (urlRef.current) urlRef.current.textContent = AUTH_BASE + params;
      dialogRef.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <dialog ref={dialogRef} className="auth-modal">
      <p className="modal-eyebrow">placeholder · real flow documented in README</p>
      <h3>This is where signup happens</h3>
      <p>In production this button redirects to:</p>
      <code ref={urlRef} />
      <p>
        After auth, the 14-day trial activates and the user deeplinks into the app where this design is
        already processing.
      </p>
      <button className="btn" type="button" onClick={() => dialogRef.current?.close()}>
        Got it
      </button>
    </dialog>
  );
}
