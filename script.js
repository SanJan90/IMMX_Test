// Scroll bestuurt de video. Naar beneden scrollen laat de video soepel
// vooruit AFSPELEN (elk frame zichtbaar) i.p.v. naar tijdsposities te springen.
// Aan het einde vult een paarse sluier — gesampled uit de video — het scherm,
// waarna je in de echte pagina terechtkomt.
(function () {
  const video = document.getElementById("bg-video");
  const veil = document.getElementById("purple-veil");
  const scrub = document.getElementById("scrub");
  if (!video || !veil || !scrub) return;

  let duration = 0;
  let ready = false;

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  // Zachte ease-curve (smoothstep) voor de paarse overgang.
  const smoothstep = (a, b, x) => {
    const t = clamp((x - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };

  // Scroll-afstand waarover de video wordt afgespeeld (lengte van de scrub-zone).
  function scrubLength() {
    return Math.max(1, scrub.offsetHeight - window.innerHeight);
  }

  // 0 = begin video, 1 = einde video.
  function progress() {
    const y = window.scrollY || window.pageYOffset;
    return clamp(y / scrubLength(), 0, 1);
  }

  // --- Paarse eindkleur uit de laatste frame van de video samplen ---
  function sampleEndColor() {
    try {
      const c = document.createElement("canvas");
      c.width = 32;
      c.height = 18;
      const ctx = c.getContext("2d");
      ctx.drawImage(video, 0, 0, c.width, c.height);
      const d = ctx.getImageData(0, 0, c.width, c.height).data;
      let r = 0, g = 0, b = 0, n = 0;
      for (let i = 0; i < d.length; i += 4) {
        r += d[i]; g += d[i + 1]; b += d[i + 2]; n++;
      }
      r = Math.round(r / n); g = Math.round(g / n); b = Math.round(b / n);
      document.documentElement.style.setProperty("--end-color", `rgb(${r},${g},${b})`);
    } catch (e) {
      // Canvas niet leesbaar (bijv. bij openen via file://) — CSS-fallback blijft staan.
    }
  }

  function init() {
    duration = video.duration || 0;
    // Even naar het einde springen om de eindkleur te pakken, dan terug.
    const onSeeked = () => {
      sampleEndColor();
      video.removeEventListener("seeked", onSeeked);
      video.currentTime = progress() * duration;
      ready = true;
    };
    video.addEventListener("seeked", onSeeked);
    video.currentTime = Math.max(0, duration - 0.05);
  }

  // --- Hoofdlus: video soepel naar de scrollpositie sturen ---
  const EPS = 0.03; // ~1 frame speling
  function tick() {
    if (ready && duration > 0) {
      const target = progress() * duration;
      const cur = video.currentTime;
      const diff = target - cur;

      if (Math.abs(diff) < EPS) {
        if (!video.paused) video.pause();
      } else if (diff > 0) {
        // Vooruit: ECHT afspelen op een snelheid die meeschaalt met de afstand.
        video.playbackRate = clamp(diff * 6, 1, 16);
        if (video.paused) video.play().catch(() => {});
      } else {
        // Achteruit: kan niet afspelen, dus zachtjes terug-zoeken.
        if (!video.paused) video.pause();
        video.currentTime = cur + diff * 0.2;
      }

      // Paarse sluier: invullen aan het einde van de scrub-zone,
      // weer uitvloeien zodra je de echte pagina inscrollt.
      const y = window.scrollY || window.pageYOffset;
      const end = scrubLength();
      let veilOpacity;
      if (y <= end) {
        veilOpacity = smoothstep(0.82, 1.0, y / end);
      } else {
        const after = (y - end) / window.innerHeight;
        veilOpacity = clamp(1 - after, 0, 1);
      }
      veil.style.opacity = veilOpacity;
    }
    window.requestAnimationFrame(tick);
  }

  if (video.readyState >= 1) {
    init();
  } else {
    video.addEventListener("loadedmetadata", init);
  }
  window.requestAnimationFrame(tick);
})();
