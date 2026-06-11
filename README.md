# Magic Engraver — feature landing page

Interactive landing page for the Magic Engraver feature of Glowforge Premium
(Universal — works with any laser). Goals: account signups and 14-day trial
starts, using a try-it-now widget whose **result is auth-gated**.

Static page, no build step: open `index.html` in a browser.

## Art direction

Implements Sam's "LIKE → THAT" hero design (Canva, exported as layers in
`assets/layer-*.png`): warm paper background, heavy ink display type
(Archivo Black), hand-drawn teal marks (sparkle, dotted swoosh arrow, snap
ticks), tagline "One photo in. An heirloom out." Real hero images are
committed: `assets/milo.jpg` and `assets/milo-engraved.svg` (an actual
xTool Creative Space trace export — on-brand for "works with any laser").
The `*-placeholder.svg` files remain as `onerror` fallbacks.

Color tokens are aligned to the official Glowforge brand palette from
`samkemmis-glowforge/design_mark` → `brand/brand.json` (teal #16A0B0
primary, cream surfaces, ink #12151A, purple #821AAB accent, rust). The
brand spec marks typography/radius `needsConfirmation`, so display type
follows the hero art.

Interactive elements follow the **gf-design-system Workspace Component
System** (vendored copy: `docs/gf-design-system-workspace-components.html`):
pill buttons filled #1E93A5 with color-only hover to #26B8CE, flat surfaces
(no box-shadows on interactive components — depth from borders/fills),
mandatory 2px cyan focus outline, 6px card radius, #A6E1EB cyan active
fill, Space Grotesk for UI labels / Exo 2 for helper text, one primary
button per surface. The demo widget is styled as a mini-workspace so the
signup → app handoff feels continuous; decorative marketing chrome (hero
composition, pipeline cards) keeps the LIKE → THAT art direction.

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
