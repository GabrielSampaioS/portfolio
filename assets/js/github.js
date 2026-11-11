/* Atividade real do GitHub, carregada no navegador.
   - Heatmap/contribuições: github-contributions-api.jogruber.de (terceiros; a API REST oficial não expõe o calendário)
   - Repositórios, linguagens, PRs e reviews: API oficial (api.github.com, sem token: 60 req/h por IP)
   Tudo fica em cache no localStorage por 6 horas para não estourar o limite. */
(function () {
  var root = document.getElementById('github-activity');
  if (!root) return;

  var user = root.getAttribute('data-username');
  var TTL = 6 * 60 * 60 * 1000;
  var HEAT = ['#171717', '#176B45', '#239B63', '#42C982', '#85E0AD'];
  var LANG_COLORS = ['#FFFFFF', '#85E0AD', '#42C982', '#239B63', '#176B45', '#737373', '#404040'];
  var MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  function $(id) { return document.getElementById(id); }
  function setText(id, v) { var el = $(id); if (el) el.textContent = v; }

  function cached(key, loader) {
    var k = 'gh:' + user + ':' + key;
    try {
      var raw = localStorage.getItem(k);
      if (raw) {
        var o = JSON.parse(raw);
        if (Date.now() - o.t < TTL) return Promise.resolve(o.d);
      }
    } catch (e) {}
    return loader().then(function (d) {
      try { localStorage.setItem(k, JSON.stringify({ t: Date.now(), d: d })); } catch (e) {}
      return d;
    });
  }

  function getJSON(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }

  /* ---------- Contribuições ---------- */
  function renderContributions(data) {
    var days = (data.contributions || []).slice().sort(function (a, b) {
      return a.date < b.date ? -1 : 1;
    });
    if (!days.length) throw new Error('sem dados');

    var total = days.reduce(function (s, d) { return s + d.count; }, 0);
    setText('gh-total', total.toLocaleString('pt-BR'));
    setText('gh-avg', Math.round(total / 12));

    // Heatmap: colunas = semanas (domingo a sábado)
    var grid = $('github-heatmap-grid');
    var tip = $('github-tooltip');
    grid.innerHTML = '';
    var first = new Date(days[0].date + 'T00:00:00').getDay();
    var cells = [];
    for (var i = 0; i < first; i++) cells.push(null);
    days.forEach(function (d) { cells.push(d); });

    for (var c = 0; c < cells.length; c += 7) {
      var col = document.createElement('div');
      col.className = 'flex flex-col gap-1';
      for (var r = 0; r < 7; r++) {
        var d = cells[c + r];
        var cell = document.createElement('div');
        cell.className = 'w-2.5 h-2.5 rounded-none cursor-pointer border border-neutral-900/50';
        if (d) {
          cell.style.backgroundColor = HEAT[Math.max(0, Math.min(4, d.level))];
          (function (d, cell) {
            cell.addEventListener('mouseenter', function () {
              cell.style.outline = '1px solid #42C982';
              var dt = new Date(d.date + 'T00:00:00');
              tip.innerHTML = '<span class="text-[#F4E0A5] font-bold">' + d.count +
                (d.count === 1 ? ' contribuição' : ' contribuições') + '</span> em ' +
                dt.getDate() + ' ' + MONTHS[dt.getMonth()] + ' ' + dt.getFullYear();
            });
            cell.addEventListener('mouseleave', function () { cell.style.outline = 'none'; });
          })(d, cell);
        } else {
          cell.style.visibility = 'hidden';
        }
        col.appendChild(cell);
      }
      grid.appendChild(col);
    }

    // Barras mensais (últimos 12 meses, em ordem cronológica)
    var byMonth = {};
    var order = [];
    days.forEach(function (d) {
      var key = d.date.slice(0, 7);
      if (!(key in byMonth)) { byMonth[key] = 0; order.push(key); }
      byMonth[key] += d.count;
    });
    order = order.slice(-12);
    var max = Math.max.apply(null, order.map(function (k) { return byMonth[k]; })) || 1;
    var bars = $('gh-months');
    bars.innerHTML = '';
    order.forEach(function (k) {
      var v = byMonth[k];
      var ratio = v / max;
      var color = ratio >= 0.95 ? '#85E0AD' : ratio >= 0.75 ? '#42C982' : ratio >= 0.5 ? '#239B63' : '#176B45';
      var m = parseInt(k.slice(5, 7), 10) - 1;
      var wrap = document.createElement('div');
      wrap.className = 'flex flex-col items-center gap-1 h-full justify-end';
      var bar = document.createElement('div');
      bar.className = 'w-full hover:opacity-80 transition';
      bar.style.height = Math.max(4, Math.round(ratio * 100)) + '%';
      bar.style.backgroundColor = color;
      bar.title = MONTHS[m] + ' ' + k.slice(0, 4) + ': ' + v + ' contribuições';
      var label = document.createElement('span');
      label.textContent = MONTHS[m].charAt(0);
      wrap.appendChild(bar);
      wrap.appendChild(label);
      bars.appendChild(wrap);
    });
  }

  /* ---------- Repositórios e linguagens ---------- */
  function renderLanguages(totals) {
    var entries = Object.keys(totals).map(function (k) { return [k, totals[k]]; })
      .sort(function (a, b) { return b[1] - a[1]; });
    var sum = entries.reduce(function (s, e) { return s + e[1]; }, 0);
    if (!sum) throw new Error('sem linguagens');

    var top = entries.slice(0, 6);
    var rest = entries.slice(6).reduce(function (s, e) { return s + e[1]; }, 0);
    if (rest) top.push(['Outras', rest]);

    var bar = $('gh-lang-bar');
    var list = $('gh-lang-list');
    bar.innerHTML = '';
    list.innerHTML = '';
    top.forEach(function (e, i) {
      var pct = e[1] * 100 / sum;
      var color = LANG_COLORS[i % LANG_COLORS.length];

      var seg = document.createElement('div');
      seg.style.width = pct + '%';
      seg.style.backgroundColor = color;
      seg.className = 'h-full';
      seg.title = e[0] + ' ' + pct.toFixed(1) + '%';
      bar.appendChild(seg);

      var row = document.createElement('div');
      row.className = 'flex items-center justify-between border border-neutral-800 bg-black px-4 py-3 font-mono text-xs';
      var left = document.createElement('div');
      left.className = 'flex items-center gap-2';
      var dot = document.createElement('span');
      dot.className = 'w-2.5 h-2.5 inline-block';
      dot.style.backgroundColor = color;
      var name = document.createElement('span');
      name.className = 'text-white font-bold uppercase tracking-wider';
      name.textContent = e[0];
      left.appendChild(dot);
      left.appendChild(name);
      var val = document.createElement('span');
      val.className = 'text-neutral-400';
      val.textContent = pct.toFixed(1) + '%';
      row.appendChild(left);
      row.appendChild(val);
      list.appendChild(row);
    });
  }

  function loadRepos() {
    return cached('repos', function () {
      return getJSON('https://api.github.com/users/' + user + '/repos?per_page=100&sort=pushed&type=owner')
        .then(function (repos) {
          var own = repos.filter(function (r) { return !r.fork; });
          var subset = own.slice(0, 30); // limita as chamadas de /languages
          return Promise.all(subset.map(function (r) {
            return getJSON(r.languages_url).catch(function () { return {}; });
          })).then(function (langs) {
            var totals = {};
            langs.forEach(function (l) {
              Object.keys(l).forEach(function (k) { totals[k] = (totals[k] || 0) + l[k]; });
            });
            return { count: own.length, languages: totals };
          });
        });
    }).then(function (d) {
      setText('gh-repos', d.count);
      renderLanguages(d.languages);
    });
  }

  /* ---------- PRs e reviews (Search API) ---------- */
  function count(key, q) {
    return cached(key, function () {
      return getJSON('https://api.github.com/search/issues?per_page=1&q=' + encodeURIComponent(q))
        .then(function (r) { return r.total_count; });
    });
  }

  function fail(ids, msgId, msg) {
    ids.forEach(function (id) { setText(id, '—'); });
    var m = $(msgId);
    if (m) { m.textContent = msg; m.classList.remove('hidden'); }
  }

  // Contribuições
  cached('contrib', function () {
    return getJSON('https://github-contributions-api.jogruber.de/v4/' + user + '?y=last');
  }).then(renderContributions).catch(function () {
    fail(['gh-total', 'gh-avg'], 'gh-error', 'Não foi possível carregar o gráfico de contribuições agora. Veja o perfil no GitHub.');
  });

  // Repositórios + linguagens
  loadRepos().catch(function () {
    fail(['gh-repos'], 'gh-lang-error', 'Não foi possível carregar as linguagens agora (limite da API do GitHub?). Tente novamente mais tarde.');
  });

  // PRs e reviews
  count('prs', 'author:' + user + ' type:pr').then(function (n) { setText('gh-prs', n); })
    .catch(function () { setText('gh-prs', '—'); });
  count('reviews', 'reviewed-by:' + user + ' type:pr -author:' + user).then(function (n) { setText('gh-reviews', n); })
    .catch(function () { setText('gh-reviews', '—'); });
})();
