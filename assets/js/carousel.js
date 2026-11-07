(function () {
  "use strict";

  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var track = root.querySelector("[data-carousel-track]");
    var prev = root.querySelector("[data-carousel-prev]");
    var next = root.querySelector("[data-carousel-next]");
    if (!track || !prev || !next) return;

    function stepSize() {
      var card = track.querySelector(".card:not([hidden])");
      if (!card) return track.clientWidth;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return card.getBoundingClientRect().width + gap;
    }

    function update() {
      var max = track.scrollWidth - track.clientWidth - 1;
      prev.disabled = track.scrollLeft <= 0;
      next.disabled = track.scrollLeft >= max;
      root.classList.toggle("is-static", max <= 0);
    }

    prev.addEventListener("click", function () {
      track.scrollBy({ left: -stepSize(), behavior: "smooth" });
    });
    next.addEventListener("click", function () {
      track.scrollBy({ left: stepSize(), behavior: "smooth" });
    });

    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev.click(); }
    });

    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // Quando o filtro esconde/mostra cards, volta ao início e recalcula
    new MutationObserver(function () {
      track.scrollTo({ left: 0, behavior: "auto" });
      update();
    }).observe(track, { attributes: true, subtree: true, attributeFilter: ["hidden"] });

    update();
  });
})();