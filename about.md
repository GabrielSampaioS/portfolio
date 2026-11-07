---
layout: default
title: Sobre
permalink: /about/
---
<section class="section container">
<p class="eyebrow">// sobre</p>
<h1>Sobre mim</h1>

<div class="two-col">
<div class="prose">
{% for paragraph in site.data.profile.about %}
<p>{{ paragraph }}</p>
{% endfor %}
</div>

<aside class="panel reveal">
<h3>~/interesses</h3>
<ul class="chips">
{% for interest in site.data.profile.interests %}
<li class="chip">{{ interest }}</li>
{% endfor %}
</ul>
<h3 class="panel-gap">~/idiomas</h3>
<ul class="plain-list">
{% for lang in site.data.profile.languages %}
<li><strong>{{ lang.name }}</strong>: {{ lang.level }}</li>
{% endfor %}
</ul>
</aside>
</div>
</section>

<section class="section container">
<h2>Formação acadêmica</h2>
<ol class="timeline">
{% for edu in site.data.profile.education %}
<li class="timeline-item reveal">
<span class="timeline-period">{{ edu.period }}</span>
<h3>{{ edu.title }}</h3>
<p class="muted">{{ edu.school }}</p>
</li>
{% endfor %}
</ol>
</section>

<section class="section container">
<h2>Experiência profissional</h2>
<ol class="timeline">
{% for job in site.data.profile.experience %}
<li class="timeline-item reveal">
<span class="timeline-icon">{% include icon.html name=job.icon %}</span>
<span class="timeline-period">{{ job.period }}</span>
<h3>{{ job.role }} <span class="muted">· {{ job.company }}</span></h3>
<ul class="bullets">
{% for item in job.items %}
<li>{{ item }}</li>
{% endfor %}
</ul>
</li>
{% endfor %}
</ol>
</section>
