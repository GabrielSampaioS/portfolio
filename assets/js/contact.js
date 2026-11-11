/* Formulário de contato.
   - Com data-endpoint (Formspree, Getform etc.): envia de verdade via fetch.
   - Sem endpoint: abre o aplicativo de e-mail (mailto:) já com a mensagem preenchida. */
(function () {
  var form = document.getElementById('contact-form');
  var feedback = document.getElementById('form-feedback');
  if (!form || !feedback) return;

  function show(msg) {
    feedback.textContent = msg;
    feedback.classList.remove('hidden');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var endpoint = form.getAttribute('data-endpoint');

    if (!endpoint) {
      var to = form.getAttribute('data-mailto');
      var f = form.elements;
      var body = f.message.value + '\n\n— ' + f.name.value + ' (' + f.email.value + ')';
      var url = 'mailto:' + to + '?subject=' + encodeURIComponent(f.subject.value) +
        '&body=' + encodeURIComponent(body);
      show('Abrindo seu aplicativo de e-mail com a mensagem pronta. Se nada abrir, escreva para ' + to + '.');
      window.location.href = url;
      return;
    }

    fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        show('Mensagem enviada com sucesso. Responderei em breve.');
        form.reset();
      })
      .catch(function () {
        show('Não foi possível enviar agora. Tente novamente ou use o e-mail ao lado.');
      });
  });
})();
