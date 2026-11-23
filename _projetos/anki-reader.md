---
order: 6
category: frontend
tier: complementar
badge: LEITOR PDF // ANKI
title: Anki Reader
summary: Leitor de PDF web para aprender inglês lendo. Os livros ficam no navegador (IndexedDB), as páginas são desenhadas com PDF.js e o próximo passo é salvar palavras e frases no Anki.
highlight: O PDF nunca vai ao servidor; uma página por vez, com Canvas e camada de texto selecionável, e a regra de que toda mudança vem com teste.
techs: [JavaScript, Node.js, Express, PDF.js, IndexedDB, Playwright, node:test]
repo: https://github.com/GabrielSampaioS/ankiReader
modal:
  category: "APLICATIVO WEB // LEITOR DE PDF PARA IDIOMAS"
  description: A ideia é ler um livro em inglês como num e-reader, selecionar uma palavra desconhecida, ver definição e tradução e salvá-la no Anki junto com a frase original. É um projeto pessoal em andamento, pensado para uso em tablet (Galaxy Tab, com mouse ou S Pen).
  solution: O Express só serve arquivos estáticos. A importação, o armazenamento e a leitura acontecem no navegador. O livro (Blob), a capa e a página atual ficam no IndexedDB, em um módulo próprio (book-storage.js). O PDF.js desenha uma página por vez em Canvas, com a camada de texto por cima para permitir seleção. Funções puras (limite de página, escala de ajuste à tela, toque nas extremidades) ficam em um módulo separado e testável.
  techs: [JavaScript, Node.js, Express 5, PDF.js, IndexedDB, Canvas, Text Layer, Playwright, node:test]
decisions:
  - title: "PDF no navegador, não no servidor"
    problem: "Enviar o livro inteiro ao backend só para exibi-lo gasta rede e impede o uso offline."
    decision: "Guardar o arquivo no IndexedDB e deixar o Express apenas servindo os arquivos da aplicação e o PDF.js."
    consequence: "Leitura sem rede para o PDF; o backend fica reservado para dicionário, tradução e Anki, que ainda não existem."
  - title: "IndexedDB em vez de localStorage"
    problem: "O localStorage não comporta arquivos grandes e é síncrono."
    decision: "Usar o IndexedDB, que guarda Blobs e trabalha de forma assíncrona."
    consequence: "Os livros e a última página lida continuam disponíveis depois de fechar o navegador."
  - title: "Uma página por vez, com Canvas e camada de texto"
    problem: "Desenhar o documento inteiro pesa, e o Canvas sozinho não permite selecionar palavras."
    decision: "Renderizar só a página atual com PDF.js e sobrepor a Text Layer; trocas rápidas cancelam a renderização anterior."
    consequence: "Menos memória e seleção de texto alinhada à página. Cache e pré-renderização de páginas próximas ainda são trabalho futuro."
status:
  done:
    - "Biblioteca: importar PDFs, listar com capa, abrir e voltar"
    - "Progresso de leitura salvo e recuperado ao reabrir o livro"
    - "Leitor com PDF.js: página ajustada à tela, sem rolagem vertical, navegação pelas extremidades"
    - "Camada de texto: duplo clique seleciona a palavra e arrastar seleciona a linha, sem trocar de página"
    - "Testes unitários (node:test) e E2E (Playwright, Chromium), incluindo emulação de Galaxy Tab"
  planned:
    - "Teste no Galaxy Tab real"
    - "Cache e pré-renderização de páginas"
    - "Capturar a palavra e a frase da seleção"
    - "Definição e tradução sem sair do leitor"
    - "Integração com o AnkiDroid"
evidence:
  - { label: "README do projeto", url: "https://github.com/GabrielSampaioS/ankiReader/blob/main/README.md" }
  - { label: "Plano de testes", url: "https://github.com/GabrielSampaioS/ankiReader/blob/main/TESTING.md" }
  - { label: "Leitor (PDF.js, Canvas e Text Layer)", url: "https://github.com/GabrielSampaioS/ankiReader/blob/main/src/reader/pdf-viewer.js" }
  - { label: "Armazenamento (IndexedDB)", url: "https://github.com/GabrielSampaioS/ankiReader/blob/main/src/storage/book-storage.js" }
  - { label: "Testes E2E", url: "https://github.com/GabrielSampaioS/ankiReader/tree/main/tests/e2e" }
diagrams:
  - src: anki-arquitetura.svg
    title: "Arquitetura: tudo no navegador"
    caption: "O servidor só entrega arquivos; o PDF fica no IndexedDB e é lido pelo PDF.js. O backend de serviços é planejado."
    alt: "Diagrama: um servidor Node.js com Express entrega arquivos estáticos ao navegador. No navegador, a interface usa o módulo de armazenamento com IndexedDB e o leitor com PDF.js e funções puras. O PDF do usuário nunca passa pelo servidor. Um backend de dicionário, tradução e Anki está planejado."
  - src: anki-fluxo-leitura.svg
    title: "Fluxo de importação e leitura"
    caption: "Do arquivo escolhido à página na tela, com o progresso salvo a cada troca. Em dourado tracejado, o que ainda será construído."
    alt: "Fluxograma: escolher PDF, salvar no IndexedDB, abrir o livro, renderizar uma página com Canvas e Text Layer, navegar pelas bordas ou selecionar texto, atualizar a página atual. Planejado: identificar a frase, buscar definição e tradução e criar o cartão no AnkiDroid."
  - src: anki-roadmap.svg
    title: "Etapas do projeto"
    caption: "Etapas 1 e 2 concluídas, a 4 em andamento (camada de texto pronta) e as demais planejadas."
    alt: "Lista vertical de seis etapas: armazenamento local e leitor PDF concluídos; desempenho e cache planejado; seleção de texto parcial; vocabulário e integração com AnkiDroid planejados."
---
