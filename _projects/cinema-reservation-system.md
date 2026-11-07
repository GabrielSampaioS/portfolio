---
title: Cinema Reservation System
summary: API REST para gerenciamento de cinemas, filmes, salas, sessões e reservas, desenvolvida com Node.js e TypeScript, aplicando Clean Architecture, Domain-Driven Design e padrões de projeto.
order: 1
featured: true
technologies:
  - Node.js
  - TypeScript
  - Express
  - Prisma ORM
  - PostgreSQL
  - Docker
  - Clean Architecture
  - Domain-Driven Design
  - Repository Pattern
  - DTO Pattern
github: https://github.com/GabrielSampaioS/cinema-reservation-system
---

## Visão Geral

API REST desenvolvida para gerenciamento de operações de cinema, abrangendo filmes, salas, sessões, assentos e reservas.

O projeto prioriza organização por domínios, separação de responsabilidades, manutenção e evolução da aplicação, utilizando princípios de arquitetura de software e padrões de projeto.

## Arquitetura e Decisões Técnicas

- **Clean Architecture:** separação entre regras de negócio, aplicação e infraestrutura.
- **Domain-Driven Design (DDD):** organização da aplicação por domínios e responsabilidades de negócio.
- **Repository Pattern:** abstração do acesso e da persistência de dados.
- **DTO Pattern:** estruturação dos dados de entrada e saída entre as camadas.
- **Controllers orientados a entidades:** organização dos endpoints com recursos identificados por parâmetros de rota e filtros por query parameters.

## Funcionalidades e Implementações

- **Gerenciamento de cinemas:** operações relacionadas a filmes, salas, sessões e clientes.
- **Sistema de reservas:** fluxo de seleção de sessões e assentos, com estados de reserva como HOLD, CONFIRMED, CANCELLED e EXPIRED.
- **Persistência de dados:** PostgreSQL integrado por meio do Prisma ORM.
- **Testes automatizados:** estrutura de testes para validação do comportamento da aplicação.
- **Containerização:** ambiente configurado com Docker e Docker Compose.

## Tecnologias

Node.js e TypeScript no desenvolvimento da API, Express na camada HTTP, Prisma ORM para acesso ao PostgreSQL e Docker para configuração do ambiente.

## Evolução Planejada

Centralização do tratamento de erros, validação com Zod, implementação de expiração automática de reservas, controle de concorrência, Redis para locks distribuídos, cache de sessões e processamento assíncrono com filas.