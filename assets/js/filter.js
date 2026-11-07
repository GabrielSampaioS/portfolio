(function () {
  "use strict";

  var bar = document.querySelector("[data-filter-bar]");
  if (!bar) return;

  var cards = Array.prototype.slice.call(document.querySelectorAll("[data-tech]"));
  var buttons = bar.querySelectorAll("button[data-filter]");
  var counter = document.querySelector("[data-filter-count]");
  var empty = document.querySelector("[data-filter-empty]");

  function apply(filter) {
    var visible = 0;

    cards.forEach(function (card) {
      var match = filter === "all" || card.dataset.tech.indexOf("|" + filter + "|") > -1;
      card.hidden = !match;
      if (match) visible += 1;
    });

    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.filter === filter));
    });

    counter.textContent = visible + (visible === 1 ? " projeto" : " projetos");
    empty.hidden = visible > 0;
  }

  bar.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-filter]");
    if (btn) apply(btn.dataset.filter);
  });

  apply("all");
})();
