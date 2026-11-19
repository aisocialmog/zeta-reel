// editkit.js: seek-safe GSAP helpers for HyperFrames talking-head edits.
// Expects these globals to exist before this file loads (template.html defines them):
//   TOTAL (seconds), tl (paused gsap timeline), behind (#behind: between footage and cut-out),
//   front (#front: above everything), rnd (seeded PRNG), SVGNS.
// Every helper takes absolute times in seconds. Call finish() once at the very end.

// ---------------------------------------------------------------- helpers
const _fromTo = tl.fromTo.bind(tl);
tl.fromTo = (targets, a, b, pos) => {
  const r = _fromTo(targets, a, b, pos);
  if (typeof pos === "number") {
    const els = gsap.utils.toArray(targets), st = typeof b.stagger === "number" ? b.stagger : 0;
    els.forEach((e, i) => { const end = pos + (b.duration ?? 0.5) + st * i;
      if (e && typeof e === "object") { e._inEnd = Math.max(e._inEnd ?? -1, end); e._inStart = Math.min(e._inStart ?? 1e9, pos); } });
  }
  return r;
};
function div(parent, html, css, cls = "abs el") {
  const d = document.createElement("div"); d._tin = -1; d.className = cls; d.innerHTML = html; Object.assign(d.style, css); parent.appendChild(d); return d;
}
function letters(el) { el.innerHTML = [...el.textContent].map(c => `<span class="l">${c === " " ? "&nbsp;" : c}</span>`).join(""); return el.querySelectorAll(".l"); }
// explicit on-screen windows, enforced every frame: outside its window an element is hidden whatever
// state its tweens were left in (keeps renders identical for any seek order)
const WINDOWS = [];
function gate() { const now = tl.time(); for (const [el, a, b] of WINDOWS) if (now < a - 0.001 || now > b) el.style.visibility = "hidden"; }
function hideAt(el, t, d = 0.22) { WINDOWS.push([el, Math.min(el._tin >= 0 ? el._tin : 1e9, el._inStart ?? 1e9, t - d), t + 0.02]); const st = Math.max(t - d, (el._tin ?? -1) + 0.08, (el._inEnd ?? -1) + 0.005); const dd = Math.max(0.05, t - st);
  tl.to(el, { autoAlpha: 0, filter: "blur(10px)", duration: dd, ease: "power2.in" }, st); tl.set(el, { filter: "blur(0px)" }, t + 0.01); }
// tall condensed word: letters shoot up from a mask line (reference "TRYING", "FILM", "HOME")
function tall(parent, text, css, tin, tout, stagger = 0.035) {
  const el = div(parent, text, css, "abs el anton"); el._tin = tin; el.style.whiteSpace = "nowrap"; el.style.overflow = "hidden"; el.style.paddingTop = "10px";
  const ls = letters(el);
  tl.set(el, { autoAlpha: 1 }, tin);
  tl.fromTo(ls, { yPercent: 110, scaleY: 1.6 }, { yPercent: 0, scaleY: 1, duration: 0.42, ease: "expo.out", stagger, immediateRender: false }, tin);
  gsap.set(ls, { yPercent: 110 });
  if (tout) hideAt(el, tout);
  return el;
}
// script word: handwriting wipe left -> right
function script(parent, text, css, tin, tout, dur = 0.45) {
  const el = div(parent, text, css, "abs el vibes glow"); el._tin = tin; el.style.whiteSpace = "nowrap";
  tl.set(el, { autoAlpha: 1 }, tin);
  tl.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: dur, ease: "power2.out", immediateRender: false }, tin);
  if (tout) hideAt(el, tout);
  return el;
}
// chunky word: pop + blur in
function chunky(parent, text, css, tin, tout, cls = "abs el pop glow") {
  const el = div(parent, text, css, cls); el._tin = tin; el.style.whiteSpace = "nowrap";
  tl.fromTo(el, { autoAlpha: 0, scale: 1.5, filter: "blur(10px)" }, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.32, ease: "back.out(2)", immediateRender: false }, tin);
  if (tout) hideAt(el, tout);
  return el;
}
// neon sign flicker-on (reference "Toronto", "FASTER")
function neon(parent, text, css, tin, tout) {
  const el = div(parent, text, css, "abs el neon"); el._tin = tin; el.style.whiteSpace = "nowrap";
  tl.set(el, { autoAlpha: 1, opacity: 0 }, tin);
  [[0, .9], [.05, .15], [.09, 1], [.14, .3], [.2, 1]].forEach(([d, o]) => tl.set(el, { opacity: o }, tin + d));
  if (tout) hideAt(el, tout);
  return el;
}
// text on a curved path around the head, letters popping in as each word is spoken
function arc(parent, words, cx, cy, r, a0, a1, size, color, tout, cls = "pop") {
  const svg = document.createElementNS(SVGNS, "svg"); svg.setAttribute("width", 1080); svg.setAttribute("height", 1920);
  svg.setAttribute("class", "abs el"); svg.style.left = 0; svg.style.top = 0; svg.style.overflow = "visible";
  const id = "arc" + Math.floor(rnd() * 1e9);
  const rad = a => (a - 90) * Math.PI / 180, P = a => [cx + r * Math.cos(rad(a)), cy + r * Math.sin(rad(a))];
  const [x0, y0] = P(a0), [x1, y1] = P(a1), large = Math.abs(a1 - a0) > 180 ? 1 : 0, sweep = a1 > a0 ? 1 : 0;
  svg.innerHTML = `<path id="${id}" d="M${x0} ${y0} A ${r} ${r} 0 ${large} ${sweep} ${x1} ${y1}" fill="none"/>
    <text font-family="${cls === "vibes" ? "Vibes" : "Pop"}" font-weight="800" font-size="${size}" fill="${color}" stroke="rgba(0,0,0,.35)" stroke-width="2"
      style="filter:drop-shadow(0 6px 16px rgba(0,0,0,.55))"><textPath href="#${id}" startOffset="50%" text-anchor="middle"></textPath></text>`;
  const tp = svg.querySelector("textPath");
  words.forEach(([w, t, col], wi) => {
    [...(wi ? " " + w : w)].forEach((c, ci) => {
      const s = document.createElementNS(SVGNS, "tspan"); s.textContent = c; if (col) s.setAttribute("fill", col);
      s.style.fillOpacity = 0; tp.appendChild(s);
      tl.to(s, { fillOpacity: 1, duration: 0.05 }, t + ci * 0.022);
    });
  });
  parent.appendChild(svg); svg._tin = words[0][1];
  tl.set(svg, { autoAlpha: 1 }, words[0][1]);
  if (tout) hideAt(svg, tout);
  return svg;
}
// scene switches
const STATES = {
  full: { scale: 1, x: 0, y: 0, transformOrigin: "50% 30.5%" },
  push: { scale: 1.08, x: 0, y: 0, transformOrigin: "50% 30.5%" },
  punch: { scale: 1.14, x: 0, y: 0, transformOrigin: "50% 30.5%" },
};
function cam(state, t, d = 0) {
  const v = typeof state === "string" ? STATES[state] : state;
  d ? tl.to("#cam", { ...v, duration: d, ease: "expo.out" }, t) : tl.set("#cam", v, t);
}
const small = s => ({ scale: s, x: 0, y: 0, transformOrigin: "50% 100%" });
let curBg = null;
function bg(id, t) {          // swap background: hide original footage, show cut-out on the new backdrop
  if (curBg) tl.set(curBg, { autoAlpha: 0 }, t);
  if (id) { tl.set("#" + id, { autoAlpha: 1 }, t); tl.set("#spkw", { autoAlpha: 0 }, t); curBg = "#" + id; }
  else { tl.set("#spkw", { autoAlpha: 1 }, t); curBg = null; }
}
// transitions lifted from the reference
function invert(t, frames = 3) { tl.set("#scene", { filter: "invert(1) contrast(1.2)" }, t); tl.set("#scene", { filter: "none" }, t + frames / 30); }
function flash(t, a = .9, d = .28) { tl.fromTo("#flash", { opacity: a }, { opacity: 0, duration: d, ease: "power2.out", immediateRender: false }, t); }
function zoomBlur(t) {  // radial zoom-blur punch
  tl.fromTo("#scene", { scale: 1.28, filter: "blur(14px) brightness(1.5)" }, { scale: 1, filter: "blur(0px) brightness(1)", duration: 0.32, ease: "expo.out", immediateRender: false }, t);
}
function whip(t) {
  tl.fromTo("#scene", { x: -260, filter: "blur(16px)" }, { x: 0, filter: "blur(0px)", duration: 0.3, ease: "expo.out", immediateRender: false }, t);
}
function film(on, t) { tl.set("#film", { autoAlpha: on ? 1 : 0 }, t); }

// ---------------------------------------------------------------- finish
// Registers the timeline and the visibility gate. Do NOT add a "warm-up" seek loop here: HyperFrames
// loads each render chunk fresh and seeks forward; a warm-up makes deferred fromTo() entrances fail to
// restore their hidden start state and leaves elements visible from frame 0.
function finish() {
  tl.eventCallback("onUpdate", gate);
  tl.to({}, { duration: TOTAL, ease: "none", onUpdate: gate }, 0);
  tl.set({}, {}, TOTAL);
  window.__timelines = window.__timelines || {};
  window.__timelines["main"] = tl;
  tl.seek(0); gate();
}
