---
order: 2
category: backend
badge: EVENT-DRIVEN ARCHITECTURE
title: LedgerFlow
summary: API financeira baseada em Event Sourcing para gerenciamento de crédito e transações, com reconstrução de saldo a partir de eventos imutáveis, DDD, Clean Architecture e infraestrutura containerizada com Nginx.
highlight: Implementação de Event Sourcing com eventos imutáveis, reconstrução de saldos, estratégias de cálculo de taxas e balanceamento de carga entre instâncias da API utilizando Nginx.
techs: [Node.js, TypeScript, Express, MongoDB, Mongoose, Docker, Docker Compose, Nginx, AWS Elastic Beanstalk, GitHub Actions]
repo: https://github.com/GabrielSampaioS/LedgerFlow
modal:
  category: "BACKEND SYSTEM // EVENT SOURCING & FINANCIAL LEDGER"
  description: API REST para gerenciamento de crédito e transações financeiras de clientes. Utiliza Event Sourcing para registrar operações como eventos imutáveis, permitindo reconstruir saldos e consultar o histórico completo de movimentações. A arquitetura aplica Domain-Driven Design e Clean Architecture para manter as regras de negócio independentes da infraestrutura.
  solution: Implementa armazenamento de eventos imutáveis com MongoDB e Mongoose, organização por domínios, Repository Pattern e injeção de dependências. Utiliza Strategy e Factory Patterns para seleção de regras de cálculo de taxas conforme o método de pagamento. Conta com testes unitários, de integração e end-to-end utilizando Node.js Test Runner e Supertest. A infraestrutura utiliza Docker, Docker Compose e Nginx como proxy reverso para distribuição de requisições entre duas instâncias da API, com pipeline CI/CD via GitHub Actions e deploy na AWS Elastic Beanstalk.
  techs: [Node.js, TypeScript, Express, MongoDB, Mongoose, Docker, Docker Compose, Nginx, AWS Elastic Beanstalk, GitHub Actions, Supertest, Node.js Test Runner, Event Sourcing, DDD, Clean Architecture]
---