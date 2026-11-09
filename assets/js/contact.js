/* Formulário de contato. Com data-endpoint (Formspree, Getform etc.) envia de verdade;
   sem endpoint, só mostra a confirmação local (nada é enviado). */
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
      show('Formulário em modo demonstração: configure form_endpoint em _data/profile.yml para receber mensagens.');
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
