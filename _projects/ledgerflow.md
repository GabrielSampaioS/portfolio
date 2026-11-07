---
title: LedgerFlow
summary: API financeira baseada em Event Sourcing para gerenciamento de crédito e transações, com reconstrução de saldo a partir de eventos imutáveis, DDD, Clean Architecture e infraestrutura containerizada com Nginx.
order: 2
featured: true
technologies:
  - Node.js
  - TypeScript
  - Express
  - MongoDB
  - Mongoose
  - Docker
  - Docker Compose
  - Nginx
  - AWS Elastic Beanstalk
  - GitHub Actions
  - Supertest
  - Node.js Test Runner
github: https://github.com/GabrielSampaioS/LedgerFlow
---

## Visão Geral

LedgerFlow é uma API REST para gerenciamento de crédito e transações financeiras de clientes. Desenvolvida com Node.js, TypeScript e MongoDB, utiliza **Event Sourcing** para registrar cada operação como um evento imutável, permitindo reconstruir o saldo atual e consultar o histórico completo de movimentações.

O projeto aplica princípios de **Domain-Driven Design (DDD)** e **Clean Architecture**, mantendo as regras de negócio independentes da infraestrutura e dos mecanismos de persistência.

## Arquitetura e Decisões Técnicas

- **Event Sourcing:** armazenamento de eventos imutáveis para reconstrução do estado dos clientes e manutenção de um histórico auditável das transações.
- **Domain-Driven Design (DDD):** organização das regras de negócio em entidades, eventos, objetos de valor, estratégias e contratos de repositório.
- **Clean Architecture:** separação entre domínio, aplicação, interfaces e infraestrutura.
- **Repository Pattern:** abstração da persistência e consulta de eventos, reduzindo o acoplamento com o MongoDB.
- **Dependency Injection:** fornecimento de dependências na raiz de composição da aplicação.
- **Strategy e Factory Patterns:** encapsulamento e seleção das regras de cálculo de taxas conforme o método de pagamento.

## Funcionalidades e Implementações

- **Gestão de clientes:** cadastro, validação e consulta de clientes por nome ou CPF.
- **Registro de transações:** operações de registro de dívidas e processamento de pagamentos.
- **Cálculo de taxas:** aplicação automática de regras específicas por método de pagamento, incluindo PIX, dinheiro e crédito.
- **Histórico financeiro:** consulta dos eventos associados a cada cliente e reconstrução do saldo a partir das movimentações registradas.
- **Notificações por e-mail:** integração com serviço externo para envio de mensagens durante o cadastro de clientes.
- **Testes automatizados:** testes unitários, de integração e end-to-end, utilizando o test runner nativo do Node.js e Supertest.

## Infraestrutura e Deploy

- **Containerização:** utilização de Docker e Docker Compose para configuração dos ambientes.
- **Balanceamento de carga:** Nginx como proxy reverso, distribuindo requisições entre duas instâncias da API.
- **CI/CD:** automação do fluxo de integração e execução de testes com GitHub Actions.
- **Publicação:** deploy automatizado na AWS Elastic Beanstalk.

## Evolução Planejada

Implementação de autenticação e autorização com JWT, validação de entradas com Zod, Value Objects para conceitos como CPF, e-mail e valores monetários, além de rate limiting e documentação com Swagger. A arquitetura também prevê evolução para CQRS, notificações em tempo real e análises avançadas.
