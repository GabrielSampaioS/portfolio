/* Filtro de categorias e modal de projetos. Os dados vêm de window.PROJECTS (_data/projects.yml). */
(function () {
  var ACTIVE = ['bg-white', 'text-black'];
  var INACTIVE = ['bg-[#171717]', 'text-neutral-400'];

  var modal = document.getElementById('project-modal');
  if (!modal) return;

  function filterCategory(cat, btn) {
    document.querySelectorAll('.project-card').forEach(function (card) {
      var show = cat === 'all' || card.getAttribute('data-category') === cat;
      card.style.display = show ? 'flex' : 'none';
    });
    document.querySelectorAll('.category-btn').forEach(function (b) {
      b.classList.remove.apply(b.classList, ACTIVE);
      b.classList.add.apply(b.classList, INACTIVE);
    });
    btn.classList.add.apply(btn.classList, ACTIVE);
    btn.classList.remove.apply(btn.classList, INACTIVE);
  }

  function openModal(id) {
    var list = window.PROJECTS || [];
    var data = list.find(function (p) { return p.id === id; });
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-category').textContent = data.modal.category;
    document.getElementById('modal-description').textContent = data.modal.description;
    document.getElementById('modal-solution').textContent = data.modal.solution;

    var techs = document.getElementById('modal-techs');
    techs.innerHTML = '';
    data.modal.techs.forEach(function (t) {
      var badge = document.createElement('span');
      badge.className = 'px-2.5 py-1 bg-black border border-neutral-700 text-white font-mono text-xs';
      badge.textContent = t;
      techs.appendChild(badge);
    });

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  document.querySelectorAll('[data-filter]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterCategory(btn.getAttribute('data-filter'), btn);
    });
  });

  document.querySelectorAll('.open-project').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-project'));
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(function (btn) {
    btn.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
})();
