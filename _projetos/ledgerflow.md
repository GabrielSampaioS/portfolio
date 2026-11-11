---
order: 2
category: backend
tier: principal
badge: EVENT SOURCING
title: LedgerFlow
summary: API de crédito ("fiado") em Node.js e TypeScript. Cada operação vira um evento imutável e o saldo é reconstruído a partir desses eventos.
highlight: Event Sourcing com eventos imutáveis (ClienteCadastrado, DividaRegistrada, PagamentoEfetuado), taxas por Strategy/Factory e CI com imagem Docker publicada.
techs: [Node.js, TypeScript, Express, MongoDB, Mongoose, JWT, Docker, Nginx, GitHub Actions]
repo: https://github.com/GabrielSampaioS/LedgerFlow
modal:
  category: "SISTEMA BACKEND // EVENT SOURCING & CRÉDITO"
  description: API REST para registrar dívidas e pagamentos de clientes. Os eventos são gravados em ordem (created_at) e nunca alterados; o repositório só tem save e find. O saldo é calculado reaplicando os eventos (getSaldo). Projeto pessoal de estudo.
  solution: Domínios com Clean Architecture e Repository. As taxas por método de pagamento usam Strategy e Factory (PIX 0%, dinheiro 0%, crédito 5%). Registro e login usam JWT com bcrypt para proteger as rotas de clientes. São cerca de 29 testes (unitários, integração e E2E). A pipeline roda lint, testes unitários, integração/E2E com MongoDB 7, build e publica a imagem no Docker Hub. O docker-compose de infraestrutura coloca o Nginx distribuindo requisições entre duas instâncias da API (round-robin).
  techs: [Node.js, TypeScript, Express, MongoDB 7, Mongoose, JWT, bcrypt, Docker, Docker Compose, Nginx, GitHub Actions, Supertest, ESLint]
layers:
  - { name: "HTTP", text: "rotas e controllers; autenticação JWT nas rotas de clientes" }
  - { name: "Casos de uso", text: "registrar dívida, efetuar pagamento, consultar saldo e eventos" }
  - { name: "Domínio", text: "eventos imutáveis, cálculo de saldo e estratégias de taxa" }
  - { name: "Infraestrutura", text: "repositório de eventos no MongoDB via Mongoose" }
decisions:
  - title: "Event Sourcing em vez de saldo atualizado"
    problem: "Um saldo sobrescrito perde o histórico e dificulta a auditoria."
    decision: "Gravar só eventos imutáveis e calcular o saldo reaplicando-os."
    consequence: "Histórico completo e auditável; a leitura do saldo custa mais conforme os eventos crescem (sem snapshots por enquanto)."
  - title: "Taxas por Strategy e Factory"
    problem: "Cada método de pagamento tem uma regra de taxa diferente."
    decision: "Uma estratégia por método, escolhida por uma Factory."
    consequence: "Novo método de pagamento não exige alterar as regras existentes."
status:
  done:
    - "Eventos imutáveis e reconstrução de saldo"
    - "Autenticação JWT (registro e login) nas rotas de clientes"
    - "Testes unitários, de integração e E2E; CI até a imagem no Docker Hub"
    - "Nginx com duas instâncias da API em ambiente local"
  planned:
    - "Chave de idempotência nos pagamentos (ainda não existe)"
    - "Validação com Zod, documentação Swagger e CQRS"
examples:
  - title: "Registrar um pagamento (exemplo do README do repositório)"
    request: "POST /clientes/{clienteId}/pagamentos\nContent-Type: application/json\n\n{\n  \"valor\": 50,\n  \"forma_pagamento\": \"PIX\"\n}"
    response: "201 Criado\n{\n  \"message\": \"Pagamento registrado\",\n  \"type\": \"PAGAMENTO_CRIADO\",\n  \"data\": {\n    \"valor\": 50,\n    \"forma_pagamento\": \"PIX\",\n    \"taxaPercentual\": 0,\n    \"valor_taxa\": 0,\n    \"valorPagoCliente\": 50\n  }\n}"
evidence:
  - { label: "README do projeto", url: "https://github.com/GabrielSampaioS/LedgerFlow/blob/main/README.md" }
  - { label: "Docker Compose de infraestrutura (Nginx)", url: "https://github.com/GabrielSampaioS/LedgerFlow/blob/main/docker-compose.infra.yml" }
  - { label: "Testes", url: "https://github.com/GabrielSampaioS/LedgerFlow/tree/main/test" }
---
