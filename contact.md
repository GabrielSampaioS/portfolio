---
layout: default
title: Contato
permalink: /contact/
---
<section class="section container">
<p class="eyebrow">// contato</p>
<h1>Vamos conversar</h1>
<p class="lead">Escreva por e-mail, pelas redes ou use o formulário.</p>

<div class="contact-grid">
<ul class="contact-list">
<li class="panel reveal"><span class="t-muted">E-mail</span><a href="mailto:{{ site.author.email }}">{{ site.author.email }}</a></li>
<li class="panel reveal"><span class="t-muted">GitHub</span><a href="https://github.com/{{ site.author.github }}" target="_blank" rel="noopener noreferrer">github.com/{{ site.author.github }}</a></li>
<li class="panel reveal"><span class="t-muted">LinkedIn</span><a href="https://www.linkedin.com/in/{{ site.author.linkedin }}" target="_blank" rel="noopener noreferrer">linkedin.com/in/{{ site.author.linkedin }}</a></li>
</ul>

<form class="form panel reveal" action="{{ site.data.profile.form_action }}" method="POST">
<label for="name">Nome</label>
<input id="name" name="name" type="text" autocomplete="name" required>

<label for="email">E-mail</label>
<input id="email" name="email" type="email" autocomplete="email" required>

<label for="message">Mensagem</label>
<textarea id="message" name="message" rows="5" required></textarea>

<input type="text" name="_gotcha" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true">
<button class="btn btn-primary" type="submit">Enviar mensagem</button>
</form>
</div>
</section>
