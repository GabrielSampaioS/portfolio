---
order: 1
category: backend
tier: principal
badge: API REST // DDD
title: Cinema Reservation System
summary: API REST para cinemas, filmes, salas, sessões, assentos e reservas, feita com Node.js, TypeScript, Express 5, Prisma e PostgreSQL, organizada por domínios com Clean Architecture.
highlight: Código separado por domínio (domain, dto, mapper, use-case) e infraestrutura isolada; a reserva nasce como PENDING com expiração de 15 minutos.
techs: [Node.js, TypeScript, Express, Prisma ORM, PostgreSQL, Docker Compose, Clean Architecture, DDD]
repo: https://github.com/GabrielSampaioS/cinema-reservation-system
modal:
  category: "SISTEMA BACKEND // GESTÃO DE RESERVAS"
  description: API REST que cobre filmes, cinemas, salas, sessões, assentos, clientes e reservas. É um projeto pessoal de estudo de arquitetura, sem usuários reais.
  solution: Cada domínio fica em src/application com as pastas domain, dto, mapper e use-case; a infraestrutura (Prisma e HTTP) fica em src/infrastructure. O PostgreSQL 17 sobe via Docker Compose. A criação de uma reserva grava o status PENDING e um expiresAt de 15 minutos. Os testes E2E (node:test + supertest) cobrem room, seat, client, booking, session, theatre e movie, e há uma coleção do Postman.
  techs: [Node.js, TypeScript, Express 5, Prisma 7, PostgreSQL 17, Docker Compose, node:test, Supertest, Pino, Postman]
layers:
  - { name: "infrastructure/http", text: "rotas e controllers Express" }
  - { name: "application/<domínio>/use-case", text: "regras de aplicação de cada caso de uso" }
  - { name: "application/<domínio>/domain, dto, mapper", text: "entidades, contratos de entrada/saída e conversões" }
  - { name: "infrastructure/database/prisma", text: "persistência no PostgreSQL" }
decisions:
  - title: "Reserva criada como PENDING com prazo"
    problem: "Um assento não deve ficar preso indefinidamente por uma reserva não concluída."
    decision: "A reserva é criada com status PENDING e expiresAt igual a agora + 15 minutos."
    consequence: "O prazo já é gravado, mas a expiração automática ainda não existe (veja Planejado)."
  - title: "Poucos endpoints para mudar o estado"
    problem: "Um endpoint por ação (confirmar, cancelar) infla a API."
    decision: "PATCH /bookings/:id recebe o novo status no corpo, por exemplo CONFIRMED."
    consequence: "API menor; a validação das transições de estado fica nos casos de uso."
status:
  done:
    - "CRUD dos domínios: filme, cinema, sala, sessão, assento, cliente e reserva"
    - "Reserva com status PENDING e expiresAt de 15 minutos"
    - "Testes E2E por domínio (npm run test:e2e) e coleção do Postman"
    - "Logs com Pino e PostgreSQL via Docker Compose"
  planned:
    - "Expiração automática de reservas PENDING"
    - "Controle de concorrência (lock e unicidade sessão + assento) para evitar reserva duplicada"
    - "Validação de entrada com Zod e autenticação"
    - "Cache e filas (Redis, RabbitMQ)"
evidence:
  - { label: "README do projeto", url: "https://github.com/GabrielSampaioS/cinema-reservation-system/blob/main/readme.md" }
  - { label: "Rotas de reservas", url: "https://github.com/GabrielSampaioS/cinema-reservation-system/blob/main/src/infrastructure/http/routes/booking.routes.ts" }
  - { label: "Testes E2E", url: "https://github.com/GabrielSampaioS/cinema-reservation-system/tree/main/test/e2e" }
---
