---
title: Gestão e Rastreabilidade de Ativos
summary: Aplicação mobile-first e offline-first para gestão e rastreabilidade de ativos laboratoriais e operacionais, com arquitetura orientada a domínio, sincronização assíncrona e integração com coletores Zebra DataWedge.
order: 3
featured: true
technologies:
  - Flutter
  - Dart
  - Firebase
  - Cloud Functions
  - Provider
  - Clean Architecture
github: https://github.com/GabrielSampaioS/asset-batch-manager
---

## Visão Geral

Sistema mobile-first e offline-first desenvolvido para gestão e rastreabilidade de ativos laboratoriais e operacionais em ambientes com conectividade instável.

O projeto prioriza a integridade dos dados, o controle de movimentações em lote e a rastreabilidade das operações, com arquitetura preparada para evolução e utilização em ambientes corporativos.

## Arquitetura e Decisões Técnicas

- **Clean Architecture e MVVM:** separação de responsabilidades entre domínio, infraestrutura, controle de estado e interface.
- **Domain-Driven Design:** modelagem explícita de entidades, tipos, estados e regras de negócio.
- **Baixo acoplamento:** domínio independente de frameworks, interface e mecanismos de persistência.
- **Validação antecipada:** aplicação de regras de negócio antes da persistência, reduzindo inconsistências e estados inválidos.

## Funcionalidades e Implementações

- **Gestão de ativos:** organização e classificação de equipamentos, materiais, amostras, vidrarias e outros recursos operacionais.
- **Rastreabilidade por lotes (Batch):** agrupamento de movimentações e itens para controle operacional, auditoria e análise posterior.
- **Operação offline-first:** continuidade das operações mesmo em cenários sem conectividade, com sincronização posterior.
- **Sincronização assíncrona:** utilização do Firebase como camada intermediária de cache, buffer e entrada de dados, com integração planejada a um banco corporativo central.
- **Integração com coletores industriais:** comunicação com leitores QR Code e dispositivos Zebra DataWedge.

## Tecnologias

Flutter e Dart no desenvolvimento mobile, Provider para gerenciamento de estado e Firebase na infraestrutura de dados e sincronização. Arquitetura organizada em camadas de domínio, dados, controle e interface.

## Evolução Planejada

Implementação completa dos casos de uso, mecanismos de auditoria, histórico de movimentações, testes automatizados e integração robusta com banco de dados corporativo central.