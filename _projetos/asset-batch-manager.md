---
order: 3
category: mobile
tier: complementar
badge: FLUTTER // FIREBASE
title: Gestão e Rastreabilidade de Ativos
summary: App Flutter para registrar lotes de ativos com leitura de QR Code e coletores Zebra, usando Firebase Auth e Firestore.
highlight: Lote e itens são gravados juntos em um WriteBatch do Firestore, e cada tipo de ativo só aceita os status permitidos para ele.
techs: [Flutter, Dart, Provider, go_router, Firebase Auth, Cloud Firestore, Zebra DataWedge]
repo: https://github.com/GabrielSampaioS/asset-batch-manager
modal:
  category: "APLICATIVO MOBILE // RASTREABILIDADE"
  description: Aplicativo para cadastrar lotes de ativos e seus itens, identificados por QR Code ou por coletores Zebra. É um projeto pessoal; o backend é o próprio Firebase.
  solution: A autenticação usa Firebase Auth (e-mail e Google). Ao salvar, o lote (Batch) e os itens (BatchItems), com ids UUID, vão para o Firestore em um único WriteBatch, então a gravação é atômica. Regras de allowedStatus por tipo de ativo restringem os status. A leitura usa flutter_barcode_scanner_plus (QR) e flutter_datawedge (Zebra). O cache offline do Firebase serve de buffer, não de fonte da verdade. A navegação usa go_router e o estado usa Provider.
  techs: [Flutter, Dart, Provider, go_router, Firebase Auth, Cloud Firestore, WriteBatch, UUID, QR Code, Zebra DataWedge]
decisions:
  - title: "Gravação atômica de lote e itens"
    problem: "Gravar o lote e os itens separadamente pode deixar o lote sem itens se algo falhar."
    decision: "Usar um WriteBatch do Firestore para salvar o lote e todos os itens juntos."
    consequence: "Ou tudo é salvo, ou nada é; ids UUID evitam colisão ao criar registros no dispositivo."
status:
  done:
    - "Login com e-mail e Google"
    - "Criação de lotes com itens em WriteBatch"
    - "Regras de status por tipo de ativo"
    - "Leitura por QR Code e por coletor Zebra"
  planned:
    - "Sincronização robusta e resolução de conflitos offline"
    - "Testes automatizados (hoje só o widget_test padrão)"
evidence:
  - { label: "README do projeto", url: "https://github.com/GabrielSampaioS/asset-batch-manager/blob/main/README.md" }
  - { label: "Código em lib/", url: "https://github.com/GabrielSampaioS/asset-batch-manager/tree/main/lib" }
---
