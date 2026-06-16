"use client";

import { useEffect, useState } from "react";

/**
 * Scoped visual tweak panel — a dev-only direct-manipulation surface for the
 * knobs we actually iterate on. Each slider live-sets a CSS variable that the
 * stylesheet reads (with the committed value as fallback). Nothing is applied
 * until you move a slider; "Copy CSS" gives you only what you changed, which
 * Claude bakes into the stylesheet.
 *
 * Visible in `npm run dev`, or on the static build via ?tweak in the URL.
 */
type Knob = {
  var: string;
  label: string;
  min: number;
  max: number;
  step: number;
  def: number;
  unit: string;
};

const KNOBS: Knob[] = [
  { var: "--hero-max", label: "Hero image width", min: 600, max: 1200, step: 10, def: 880, unit: "px" },
  { var: "--hero-pad", label: "Hero bottom pad", min: 0, max: 120, step: 2, def: 56, unit: "px" },
  { var: "--pgap-set", label: "Pipeline gap", min: 24, max: 180, step: 2, def: 112, unit: "px" },
  { var: "--arrow-w", label: "Arrow width", min: 90, max: 220, step: 2, def: 172, unit: "px" },
  { var: "--arrow-x", label: "Arrow X nudge", min: -40, max: 40, step: 1, def: -8, unit: "px" },
  { var: "--arrow-y", label: "Arrow Y offset", min: -120, max: -60, step: 0.5, def: -93.1, unit: "%" },
  { var: "--squiggle-pad", label: "Squiggle gap", min: 0.2, max: 1.2, step: 0.02, def: 0.72, unit: "em" },
  { var: "--squiggle-w", label: "Squiggle width", min: 90, max: 140, step: 1, def: 116, unit: "%" },
  { var: "--marquee-dur", label: "Marquee speed", min: 8, max: 60, step: 1, def: 28, unit: "s" },
];

export default function TweakPanel() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(true);
  const [vals, setVals] = useState<Record<string, number>>(
    Object.fromEntries(KNOBS.map((k) => [k.var, k.def])),
  );
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  const enabled =
    process.env.NODE_ENV !== "production" ||
    new URLSearchParams(window.location.search).has("tweak");
  if (!enabled) return null;

  function set(k: Knob, value: number) {
    setVals((v) => ({ ...v, [k.var]: value }));
    setTouched((t) => ({ ...t, [k.var]: true }));
    document.documentElement.style.setProperty(k.var, `${value}${k.unit}`);
    setCopied(false);
  }

  function reset() {
    KNOBS.forEach((k) => document.documentElement.style.removeProperty(k.var));
    setVals(Object.fromEntries(KNOBS.map((k) => [k.var, k.def])));
    setTouched({});
    setCopied(false);
  }

  const changed = KNOBS.filter((k) => touched[k.var]);
  function copy() {
    const body = (changed.length ? changed : KNOBS)
      .map((k) => `  ${k.var}: ${vals[k.var]}${k.unit};`)
      .join("\n");
    navigator.clipboard?.writeText(`:root {\n${body}\n}`);
    setCopied(true);
  }

  const wrap: React.CSSProperties = {
    position: "fixed",
    right: 16,
    bottom: 16,
    zIndex: 9999,
    width: 268,
    maxHeight: "82vh",
    overflowY: "auto",
    background: "rgba(10,12,16,0.94)",
    color: "#e8edf2",
    border: "1px solid #2b333d",
    borderRadius: 12,
    padding: open ? 14 : "8px 12px",
    font: '12px/1.4 ui-monospace, "IBM Plex Mono", monospace',
    boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
  };

  return (
    <div style={wrap}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <strong style={{ letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 11 }}>
          Tweak panel
        </strong>
        <button onClick={() => setOpen((o) => !o)} style={btn}>
          {open ? "–" : "+"}
        </button>
      </div>

      {open && (
        <>
          {KNOBS.map((k) => (
            <label key={k.var} style={{ display: "block", marginTop: 12 }}>
              <span style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{k.label}</span>
                <span style={{ color: touched[k.var] ? "#7df2c8" : "#8b95a1" }}>
                  {vals[k.var]}
                  {k.unit}
                </span>
              </span>
              <input
                type="range"
                min={k.min}
                max={k.max}
                step={k.step}
                value={vals[k.var]}
                onChange={(e) => set(k, parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: "#16a0b0" }}
              />
            </label>
          ))}

          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <button onClick={copy} style={{ ...btn, flex: 1 }}>
              {copied ? "Copied ✓" : changed.length ? `Copy CSS (${changed.length})` : "Copy CSS"}
            </button>
            <button onClick={reset} style={btn}>
              Reset
            </button>
          </div>
          <p style={{ marginTop: 8, color: "#8b95a1" }}>
            Tweak, copy the CSS, paste it back to Claude to commit.
          </p>
        </>
      )}
    </div>
  );
}

const btn: React.CSSProperties = {
  background: "#1c2530",
  color: "#e8edf2",
  border: "1px solid #2b333d",
  borderRadius: 7,
  padding: "5px 10px",
  cursor: "pointer",
  font: "inherit",
};
