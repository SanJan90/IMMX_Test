// Scroll-scrubbing: de scrollpositie bepaalt hoe ver de video is afgespeeld.
// De video blijft vast op de achtergrond staan; naar beneden scrollen
// laat de video stap voor stap verder lopen.
(function () {
  const video = document.getElementById("bg-video");
  if (!video) return;

  // Hoe soepel de video naar de doel-tijd toe beweegt (0–1, hoger = sneller volgen).
  const SMOOTHING = 0.12;

  let targetTime = 0;
  let duration = 0;
  let ready = false;

  function scrollFraction() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return 0;
    const y = window.scrollY || window.pageYOffset;
    return Math.min(1, Math.max(0, y / max));
  }

  function onMeta() {
    duration = video.duration || 0;
    ready = true;
    // Pauzeer eigen afspelen — scroll bepaalt de tijd.
    video.pause();
    targetTime = scrollFraction() * duration;
  }

  function onScroll() {
    if (!ready) return;
    targetTime = scrollFraction() * duration;
  }

  // Loop continu zodat de video soepel naar de doel-tijd toe schuift.
  function tick() {
    if (ready && duration > 0) {
      const current = video.currentTime;
      const diff = targetTime - current;
      if (Math.abs(diff) > 0.01) {
        video.currentTime = current + diff * SMOOTHING;
      }
    }
    window.requestAnimationFrame(tick);
  }

  if (video.readyState >= 1) {
    onMeta();
  } else {
    video.addEventListener("loadedmetadata", onMeta);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  window.requestAnimationFrame(tick);
})();
