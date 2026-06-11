# Magic Engraver — feature landing page

Interactive landing page for the Magic Engraver feature of Glowforge Premium
(Universal — works with any laser). Goals: account signups and 14-day trial
starts, using a try-it-now widget whose **result is auth-gated**.

Static page, no build step: open `index.html` in a browser.

## Art direction

Implements Sam's "LIKE → THAT" hero design (Canva, exported as layers in
`assets/layer-*.png`): warm paper background, heavy ink display type
(#1c1813, Archivo Black), hand-drawn teal marks (#16a0b0 — sparkle, dotted
swoosh arrow, snap ticks), tagline "One photo in. An heirloom out."

Two hero images are referenced but not committed (too large to transfer in
this session): `assets/milo.jpg` and `assets/milo-engraved.svg` (both in
Sam's Drive folder). The page falls back to `*-placeholder.svg` stand-ins
until the real files are dropped into `assets/`.

## Funnel (xTool AImake-style "the page is the demo", with a result gate)

1. **Hero widget, no account needed.** Visitor uploads a picture (or picks a
   sample), picks an object (cutting board, slate, leather, tumbler).
2. **Processing with honest intermediate signals** — trace, fit, settings —
   so the result feels earned, not theater.
3. **Result rendered but blurred** behind a gate: *"Create a free account to
   reveal it."* Signup = trial start = reveal. One CTA, one moment.
4. **Deeplink into the app** with the design already processing/processed.

Below the fold: any-laser brand strip → photo → vector → object pipeline
showcase → gallery → FAQ → final CTA.

## What's placeholder vs. real

| Piece | Status |
|---|---|
| Page layout, copy, styles | Real draft (copy needs review) |
| Widget interaction flow | Real (fully client-side; uploads never leave the browser) |
| Image processing | Faked (scripted log + CSS-composited blurred preview) |
| Auth gate | Stub modal showing the URL the CTA would hit |
| Gallery images | CSS gradient placeholders |
| Sample art / object renders | Inline SVG placeholders |

## Auth gating contract (to implement)

The stub in `app.js` (`AUTH_BASE`, `data-auth-link` handler) encodes the
intended contract:

1. **Anonymous design creation.** When the visitor hits "Generate my
   engraving", POST the inputs to an unauthenticated endpoint that returns a
   short-lived `design_id` (claim token). Rate-limit / size-cap this endpoint;
   processing can be queued — the gate hides the result anyway.
2. **Gate → signup redirect.**
   `https://app.glowforge.com/signup?design=<design_id>&trial=premium-14d&next=/magic-engraver/<design_id>&utm_…`
3. **On signup:** account created, 14-day Premium trial auto-activated
   (no card), `design_id` claimed to the new account.
4. **Deeplink:** user lands at `next` inside the app with their design
   processing or processed — work is preserved through the auth hop
   (the single most important conversion detail per PLG research).
5. **Existing users:** "Sign in" path claims the design the same way.

Open product questions: blur vs. partial reveal of the result; whether the
anonymous endpoint does real processing pre-auth or defers it; per-machine
qualification (ask which laser they own) before or after signup.
