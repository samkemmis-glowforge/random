"use client";

import { useEffect, useRef, useState } from "react";

// Placeholder widget — everything runs client-side; no image leaves the
// browser. Real auth/deeplink contract lives in AuthModal + README.
type GfObject = {
  id: string;
  name: string;
  material: string;
  settings: string;
  svg: string;
};

const OBJECTS: GfObject[] = [
  {
    id: "board",
    name: "Maple cutting board",
    material: "maple",
    settings: "power 70 · speed 1200 · 1 pass",
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="6" width="104" height="68" rx="10" fill="#d9b780"/><circle cx="98" cy="16" r="4.5" fill="#161b22"/><path d="M14 24 q46 4 92 0 M14 44 q46 -4 92 0 M14 64 q46 4 92 0" stroke="#bb9359" stroke-width="1" fill="none"/></svg>`,
  },
  {
    id: "slate",
    name: "Slate coaster",
    material: "slate",
    settings: "power 95 · speed 2000 · 1 pass",
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="40" r="34" fill="#39424d"/><circle cx="60" cy="40" r="34" fill="none" stroke="#4a5662" stroke-width="2" stroke-dasharray="3 5"/></svg>`,
  },
  {
    id: "wallet",
    name: "Leather wallet",
    material: "leather",
    settings: "power 45 · speed 1600 · 1 pass",
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="14" width="88" height="52" rx="8" fill="#7a5236"/><rect x="16" y="14" width="88" height="52" rx="8" fill="none" stroke="#5c3d26" stroke-width="2" stroke-dasharray="4 4"/><rect x="16" y="40" width="88" height="26" rx="8" fill="#6b4730"/></svg>`,
  },
  {
    id: "tumbler",
    name: "Steel tumbler",
    material: "stainless steel",
    settings: "power 100 · speed 900 · 2 passes",
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg"><path d="M44 8 h32 l-4 64 h-24 z" fill="#aeb6bd"/><path d="M48 8 h6 l-3 64 h-5 z" fill="#d6dbdf" opacity="0.7"/><ellipse cx="60" cy="8" rx="16" ry="4" fill="#8b949c"/></svg>`,
  },
];

const PROC_STEPS = [
  "analyzing your picture…",
  "removing background…",
  "tracing engraving vectors…",
  "fitting to surface…",
  "tuning laser power & speed…",
];

type Step = "art" | "object" | "processing" | "result";

export default function TryWidget() {
  const [step, setStep] = useState<Step>("art");
  const [art, setArt] = useState<string | null>(null);
  const [artName, setArtName] = useState("");
  const [object, setObject] = useState<GfObject | null>(null);
  const [designId, setDesignId] = useState<string | null>(null);
  const [activeProc, setActiveProc] = useState(-1);
  const fileRef = useRef<HTMLInputElement>(null);

  function readFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setArt(reader.result as string);
      setArtName(file.name);
      setStep("object");
    };
    reader.readAsDataURL(file);
  }

  // fake processing: advance through PROC_STEPS, then reveal the gated result
  useEffect(() => {
    if (step !== "processing") return;
    setActiveProc(0);
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      if (i < PROC_STEPS.length) {
        setActiveProc(i);
        timer = setTimeout(tick, 650 + Math.random() * 350);
      } else {
        setDesignId("dsn_" + Math.random().toString(36).slice(2, 10));
        setStep("result");
      }
    };
    timer = setTimeout(tick, 650 + Math.random() * 350);
    return () => clearTimeout(timer);
  }, [step]);

  function reset() {
    setStep("art");
    setArt(null);
    setArtName("");
    setObject(null);
    setDesignId(null);
    setActiveProc(-1);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="widget" aria-label="Try Magic Engraver">
      <div className="widget-titlebar">
        <span className="widget-dot" />
        <span className="widget-title">magic engraver — live demo</span>
        {step !== "art" && (
          <button className="widget-reset" type="button" onClick={reset}>
            start over
          </button>
        )}
      </div>

      {/* STEP 1 — pick art */}
      {step === "art" && (
        <div className="widget-step">
          <p className="step-label">
            <span className="step-num">1/3</span> Pick a picture
          </p>
          <label
            className="dropzone"
            onDragOver={(e) => {
              e.preventDefault();
              (e.currentTarget as HTMLElement).classList.add("dragover");
            }}
            onDragLeave={(e) => (e.currentTarget as HTMLElement).classList.remove("dragover")}
            onDrop={(e) => {
              e.preventDefault();
              (e.currentTarget as HTMLElement).classList.remove("dragover");
              if (e.dataTransfer.files[0]) readFile(e.dataTransfer.files[0]);
            }}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => e.target.files?.[0] && readFile(e.target.files[0])}
            />
            <svg viewBox="0 0 24 24" className="dz-icon" aria-hidden="true">
              <path
                d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="dz-main">Drop a photo here, or click to upload</span>
            <span className="dz-sub">stays on your device for this demo</span>
          </label>
        </div>
      )}

      {/* STEP 2 — pick object */}
      {step === "object" && (
        <div className="widget-step">
          <p className="step-label">
            <span className="step-num">2/3</span> Put it on…
          </p>
          <div className="chosen-art">
            {art && <img src={art} alt="Your selected picture" />}
            <span>{artName}</span>
            <button className="mini-link" type="button" onClick={() => setStep("art")}>
              change
            </button>
          </div>
          <div className="object-grid">
            {OBJECTS.map((o) => (
              <button
                key={o.id}
                type="button"
                className={`object-card${object?.id === o.id ? " selected" : ""}`}
                onClick={() => setObject(o)}
                dangerouslySetInnerHTML={{ __html: `${o.svg}<span>${o.name}</span>` }}
              />
            ))}
          </div>
          <button className="btn" type="button" disabled={!object} onClick={() => setStep("processing")}>
            Make it an heirloom →
          </button>
        </div>
      )}

      {/* STEP 3 — processing */}
      {step === "processing" && (
        <div className="widget-step">
          <p className="step-label">
            <span className="step-num">3/3</span> Working…
          </p>
          <div className="proc-stage">
            <div className="proc-visual">
              {art && <img src={art} alt="Your picture being processed" />}
              <div className="scanline" />
            </div>
            <ul className="proc-log">
              {PROC_STEPS.map((t, i) => (
                <li key={t} className={i < activeProc ? "done" : i === activeProc ? "active" : ""}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* STEP 4 — gated result */}
      {step === "result" && object && (
        <div className="widget-step">
          <div className="result-frame">
            <div
              className="result-render"
              dangerouslySetInnerHTML={{
                __html: `${object.svg}<img class="result-art" src="${art}" alt="">`,
              }}
            />
            <div className="gate-overlay">
              <p className="gate-ready">
                <span className="gate-check">✓</span> Your engraving is ready
              </p>
              <p className="gate-meta">
                {object.material} · {object.settings} · design {designId}
              </p>
              <a className="btn gate-cta" href="#" data-auth-link data-deeplink data-design={designId ?? ""}>
                Create a free account to see it →
              </a>
              <p className="gate-fine">
                Includes a 14-day Glowforge Premium trial — engrave this on the real thing. No credit card.
                Your design will be waiting in the app.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
