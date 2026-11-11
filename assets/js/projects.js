/* Filtro de categorias dos projetos + larguras da barra do LeetCode (data-width, sem Liquid dentro de style). */
(function () {
  var ACTIVE = ['bg-white', 'text-black', 'border-white'];
  var INACTIVE = ['bg-[#171717]', 'text-neutral-200', 'border-neutral-600'];

  document.querySelectorAll('.bar-seg').forEach(function (el) {
    el.style.width = (parseFloat(el.getAttribute('data-width')) || 0) + '%';
  });

  var buttons = Array.prototype.slice.call(document.querySelectorAll('.category-btn'));
  if (!buttons.length) return;

  function filter(cat, btn) {
    document.querySelectorAll('.project-card').forEach(function (card) {
      var show = cat === 'all' || card.getAttribute('data-category') === cat;
      card.style.display = show ? 'flex' : 'none';
    });
    buttons.forEach(function (b) {
      var on = b === btn;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      ACTIVE.forEach(function (c) { b.classList.toggle(c, on); });
      INACTIVE.forEach(function (c) { b.classList.toggle(c, !on); });
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { filter(b.getAttribute('data-filter'), b); });
  });
})();
