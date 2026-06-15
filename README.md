# Magic Engraver — feature landing page

Interactive landing page for the Magic Engraver feature of Glowforge Premium
(Universal — works with any laser). Goals: account signups and 14-day trial
starts, using a try-it-now widget whose **result is auth-gated**.

Static page, no build step: open `index.html` in a browser.

## Art direction

Hero is Sam's "JUST LIKE THAT" triptych (`assets/hero-triptych.png`,
1920×1080) — photo → vector → engraved board in three panels — with an
Archivo Black eyebrow + "Put any picture on anything" tagline below.
High-level sensibility: BIG and fun (inspired by the scale/energy of
Lenny's Product Pass, no specific elements lifted) — oversized display
type, full-width hero, scrolling any-laser marquee on pine teal (#0E454D).
(The manifest's flattened `hero-1920` and `milo-coaster-composite` were
tried and rejected in favor of these.)

The doodle marks and the two photo/vector pipeline cards are sourced from
the `samkemmis-glowforge/design_mark` asset manifest (`assets/manifest.json`
on branch `claude/gifted-davinci-YFc85`), fetched via raw URLs and
committed here:
- `milo-photo-popout.png`, `milo-trace-transparent.png` — pipeline cards
  1 & 2; the coaster card 3 uses `milo-3-coaster.png`
- `mark-arrow-swoosh-teal.png` — pipeline connectors
- `mark-burst-teal.png` (hero CTA accent), `mark-burst-cream.png` (on the
  pine final-CTA), `mark-underline-squiggle-teal.png` (under "any laser")

The manifest also offers `currentColor` SVG marks, all three mark colorways
(ink/teal/cream), and separated hero layers — available if we want to
recolor or animate later.

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

1. **Hero widget invites a real upload.** Visitor picks a picture (or a
   sample) and an object. In production, an account-signup modal appears
   when they try to use the tool — inputs are preserved through the modal.
2. **Processing with honest intermediate signals** — trace, fit, settings —
   so the result feels earned, not theater.
3. **Result rendered but blurred** behind a gate: *"Create a free account to
   reveal it."* Signup = trial start = reveal. One CTA, one moment.
4. **Deeplink into the app** with the design already processing/processed.

Below the fold: any-laser brand strip → photo → vector → object pipeline
showcase → FAQ → final CTA.

## What's placeholder vs. real

| Piece | Status |
|---|---|
| Page layout, copy, styles | Real draft (copy needs review) |
| Widget interaction flow | Real (fully client-side; uploads never leave the browser) |
| Image processing | Faked (scripted log + CSS-composited blurred preview) |
| Auth gate | Stub modal showing the URL the CTA would hit |
| Sample art / object renders | Inline SVG placeholders |

## Auth gating contract (to implement)

The stub in `app.js` (`AUTH_BASE`, `data-auth-link` handler) encodes the
intended contract:

1. **Use-time signup modal.** Widget inputs (picture + object) are held
   client-side; when the visitor tries to use the tool, the signup modal
   appears. After auth, POST the preserved inputs to create the design —
   no unauthenticated processing endpoint needed.
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
