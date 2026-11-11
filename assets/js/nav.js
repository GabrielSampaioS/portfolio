/* Navegação: destaca a seção atual (scrollspy), centraliza o atalho ativo no celular
   e mostra o progresso de rolagem. Nas páginas de projeto só o progresso é usado. */
(function () {
  var header = document.getElementById('site-header');
  var bar = document.getElementById('scroll-progress');
  var links = Array.prototype.slice.call(document.querySelectorAll('[data-spy]'));
  var ticking = false;
  var dial = document.getElementById('current-floor-indicator');
  var lastId = null;

  // Seções existentes na página (a home); some o atalho de seções ocultas, ex.: activity
  var ids = [];
  links.forEach(function (a) {
    var id = a.getAttribute('data-spy');
    if (document.getElementById(id)) {
      if (ids.indexOf(id) === -1) ids.push(id);
    } else if (document.getElementById('hero')) {
      a.style.display = 'none';
    }
  });
  // Na ordem em que aparecem na página (a barra do celular começa por "hero", o desktop não)
  var sections = ids.map(function (id) { return document.getElementById(id); })
    .sort(function (x, y) { return x.getBoundingClientRect().top + window.scrollY - (y.getBoundingClientRect().top + window.scrollY); });

  function setActive(id) {
    if (id === lastId) return;
    lastId = id;
    // Mostrador de "andar" do elevador (desktop)
    var cur = links.filter(function (a) { return a.getAttribute('data-spy') === id; })[0];
    if (dial && cur && cur.getAttribute('data-floor')) dial.textContent = cur.getAttribute('data-floor');
    links.forEach(function (a) {
      var on = a.getAttribute('data-spy') === id;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');

      // Centraliza o atalho ativo na barra rolável do celular
      if (on && a.classList.contains('nav-chip')) {
        var box = a.parentElement;
        if (box && box.scrollTo) {
          box.scrollTo({ left: a.offsetLeft - (box.clientWidth - a.offsetWidth) / 2, behavior: 'smooth' });
        }
      }
    });
  }

  function update() {
    ticking = false;
    var doc = document.documentElement;

    if (bar) {
      var max = doc.scrollHeight - doc.clientHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    }

    if (!sections.length) return;
    var offset = (header ? header.offsetHeight : 0) + 24;
    var current = sections[0].id;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top - offset <= 0) current = sections[i].id;
    }
    // No fim da página, a última seção (ex.: contato) pode nunca chegar ao topo
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
      current = sections[sections.length - 1].id;
    }
    setActive(current);
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
