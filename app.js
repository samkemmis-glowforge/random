/* Magic Engraver landing — placeholder widget.
   Everything runs client-side; no image leaves the browser.
   The real auth/deeplink contract is documented in README.md. */

(function () {
  "use strict";

  // ---------- config: where the real gate points ----------
  // Production: redirect to signup with a claim token for the anonymous
  // design, so the result survives the auth hop and the app resumes it.
  const AUTH_BASE = "https://app.glowforge.com/signup";
  const UTM = "utm_source=magic-engraver-lp&utm_medium=widget";

  // ---------- sample art (inline SVG → data URIs) ----------
  const svgUri = (svg) => "data:image/svg+xml," + encodeURIComponent(svg);

  const SAMPLES = [
    {
      name: "pet photo",
      uri: svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
        <rect width="200" height="150" fill="#c9b8a0"/>
        <ellipse cx="100" cy="146" rx="100" ry="18" fill="#a08a6c"/>
        <path d="M70 128 q-6 -32 10 -49 q-12 -9 -8 -24 q13 2 19 11 q8 -6 21 -6 t21 6 q6 -9 19 -11 q4 15 -8 24 q16 17 10 49 q-2 9 -13 11 l-58 0 q-11 -2 -13 -11z" fill="#7a5a3f"/>
        <ellipse cx="99" cy="93" rx="24" ry="20" fill="#97744e"/>
        <ellipse cx="91" cy="86" rx="3" ry="3.6" fill="#221810"/>
        <ellipse cx="107" cy="86" rx="3" ry="3.6" fill="#221810"/>
        <ellipse cx="99" cy="96" rx="4.4" ry="3" fill="#221810"/>
        <path d="M93 99 q6 6 12 0 q-2 7 -6 7 t-6 -7z" fill="#221810"/>
      </svg>`),
    },
    {
      name: "kid's drawing",
      uri: svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
        <rect width="200" height="150" fill="#f4eee2"/>
        <g fill="none" stroke="#3a59c7" stroke-width="4" stroke-linecap="round">
          <circle cx="100" cy="60" r="22"/>
          <path d="M100 82 v34 M100 95 l-20 14 M100 95 l20 14 M100 116 l-14 22 M100 116 l14 22"/>
        </g>
        <g fill="#e0533a"><circle cx="92" cy="56" r="3"/><circle cx="108" cy="56" r="3"/></g>
        <path d="M90 66 q10 8 20 0" fill="none" stroke="#e0533a" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M30 30 l8 -14 8 14z M164 32 q6 -16 12 0" fill="#f0b429"/>
      </svg>`),
    },
    {
      name: "shop logo",
      uri: svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">
        <rect width="200" height="150" fill="#1d242c"/>
        <circle cx="100" cy="70" r="42" fill="none" stroke="#e8edf2" stroke-width="5"/>
        <path d="M80 84 l14 -36 6 16 8 -10 12 30z" fill="#e8edf2"/>
        <text x="100" y="132" text-anchor="middle" font-family="monospace" font-size="15" fill="#e8edf2" letter-spacing="4">SUMMIT CO.</text>
      </svg>`),
    },
  ];

  // ---------- objects ----------
  const OBJECTS = [
    {
      id: "board", name: "Maple cutting board", material: "maple",
      settings: "power 70 · speed 1200 · 1 pass",
      svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="6" width="104" height="68" rx="10" fill="#d9b780"/>
        <circle cx="98" cy="16" r="4.5" fill="#161b22"/>
        <path d="M14 24 q46 4 92 0 M14 44 q46 -4 92 0 M14 64 q46 4 92 0" stroke="#bb9359" stroke-width="1" fill="none"/>
      </svg>`,
    },
    {
      id: "slate", name: "Slate coaster", material: "slate",
      settings: "power 95 · speed 2000 · 1 pass",
      svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="40" r="34" fill="#39424d"/>
        <circle cx="60" cy="40" r="34" fill="none" stroke="#4a5662" stroke-width="2" stroke-dasharray="3 5"/>
      </svg>`,
    },
    {
      id: "wallet", name: "Leather wallet", material: "leather",
      settings: "power 45 · speed 1600 · 1 pass",
      svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="14" width="88" height="52" rx="8" fill="#7a5236"/>
        <rect x="16" y="14" width="88" height="52" rx="8" fill="none" stroke="#5c3d26" stroke-width="2" stroke-dasharray="4 4"/>
        <rect x="16" y="40" width="88" height="26" rx="8" fill="#6b4730"/>
      </svg>`,
    },
    {
      id: "tumbler", name: "Steel tumbler", material: "stainless steel",
      settings: "power 100 · speed 900 · 2 passes",
      svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M44 8 h32 l-4 64 h-24 z" fill="#aeb6bd"/>
        <path d="M48 8 h6 l-3 64 h-5 z" fill="#d6dbdf" opacity="0.7"/>
        <ellipse cx="60" cy="8" rx="16" ry="4" fill="#8b949c"/>
      </svg>`,
    },
  ];

  const PROC_STEPS = [
    "analyzing your picture…",
    "removing background…",
    "tracing engraving vectors…",
    "fitting to surface…",
    "tuning laser power & speed…",
  ];

  // ---------- state ----------
  const state = { art: null, artName: "", object: null, designId: null };

  // ---------- elements ----------
  const $ = (id) => document.getElementById(id);
  const steps = {
    art: $("step-art"),
    object: $("step-object"),
    processing: $("step-processing"),
    result: $("step-result"),
  };

  function showStep(name) {
    Object.entries(steps).forEach(([k, el]) => (el.hidden = k !== name));
    $("widget-reset").hidden = name === "art";
  }

  // ---------- step 1: art ----------
  const sampleRow = $("sample-row");
  SAMPLES.forEach((s) => {
    const card = document.createElement("button");
    card.className = "sample-card";
    card.type = "button";
    card.innerHTML = `<img src="${s.uri}" alt="${s.name} sample"><span>${s.name}</span>`;
    card.addEventListener("click", () => selectArt(s.uri, s.name));
    sampleRow.appendChild(card);
  });

  const dropzone = $("dropzone");
  const fileInput = $("file-input");
  dropzone.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    if (fileInput.files[0]) readFile(fileInput.files[0]);
  });
  ["dragover", "dragleave", "drop"].forEach((evt) =>
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.toggle("dragover", evt === "dragover");
      if (evt === "drop" && e.dataTransfer.files[0]) readFile(e.dataTransfer.files[0]);
    })
  );

  function readFile(file) {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => selectArt(reader.result, file.name);
    reader.readAsDataURL(file);
  }

  function selectArt(uri, name) {
    state.art = uri;
    state.artName = name;
    $("chosen-art-img").src = uri;
    $("chosen-art-name").textContent = name;
    showStep("object");
  }

  $("change-art").addEventListener("click", () => showStep("art"));

  // ---------- step 2: object ----------
  const objectGrid = $("object-grid");
  OBJECTS.forEach((o) => {
    const card = document.createElement("button");
    card.className = "object-card";
    card.type = "button";
    card.innerHTML = `${o.svg}<span>${o.name}</span>`;
    card.addEventListener("click", () => {
      state.object = o;
      objectGrid.querySelectorAll(".object-card").forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      $("engrave-btn").disabled = false;
    });
    objectGrid.appendChild(card);
  });

  $("engrave-btn").addEventListener("click", runProcessing);

  // ---------- step 3: fake processing ----------
  function runProcessing() {
    showStep("processing");
    $("proc-img").src = state.art;
    const log = $("proc-log");
    log.innerHTML = "";
    PROC_STEPS.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      log.appendChild(li);
    });
    const items = [...log.children];
    let i = 0;
    const tick = () => {
      if (i > 0) {
        items[i - 1].classList.remove("active");
        items[i - 1].classList.add("done");
      }
      if (i < items.length) {
        items[i].classList.add("active");
        i++;
        setTimeout(tick, 650 + Math.random() * 350);
      } else {
        state.designId = "dsn_" + Math.random().toString(36).slice(2, 10);
        showResult();
      }
    };
    tick();
  }

  // ---------- step 4: gated result ----------
  function showResult() {
    const render = $("result-render");
    render.innerHTML = state.object.svg + `<img class="result-art" src="${state.art}" alt="">`;
    $("gate-meta").textContent =
      `${state.object.material} · ${state.object.settings} · design ${state.designId}`;
    showStep("result");
  }

  // ---------- reset ----------
  $("widget-reset").addEventListener("click", () => {
    state.art = null;
    state.object = null;
    state.designId = null;
    fileInput.value = "";
    $("engrave-btn").disabled = true;
    objectGrid.querySelectorAll(".object-card").forEach((c) => c.classList.remove("selected"));
    showStep("art");
  });

  // ---------- auth gate (placeholder) ----------
  // Real flow: navigate to AUTH_BASE with a design claim token; after
  // signup the trial auto-activates and the app deeplinks to the design.
  const modal = $("auth-modal");
  document.querySelectorAll("[data-auth-link]").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const params = el.hasAttribute("data-deeplink") && state.designId
        ? `?design=${state.designId}&trial=premium-14d&next=/magic-engraver/${state.designId}&${UTM}`
        : `?trial=premium-14d&next=/magic-engraver&${UTM}`;
      $("auth-url").textContent = AUTH_BASE + params;
      modal.showModal();
    })
  );
  $("modal-close").addEventListener("click", () => modal.close());
})();
