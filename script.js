// Parallax: verschuif de video-achtergrond langzamer dan de scroll.
(function () {
  const bg = document.querySelector(".video-bg");
  if (!bg) return;

  // Hoe sterk de achtergrond meebeweegt (0 = stil, 1 = mee met scroll).
  const SPEED = 0.4;

  let latestScroll = 0;
  let ticking = false;

  function update() {
    // Beweeg de achtergrond omhoog, langzamer dan de content.
    const offset = latestScroll * SPEED;
    bg.style.transform = "translateY(" + offset + "px)";
    ticking = false;
  }

  function onScroll() {
    latestScroll = window.scrollY || window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  update();
})();
