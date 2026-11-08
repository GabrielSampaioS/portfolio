---
title: Local RAG
summary: Sistema de perguntas e respostas sobre documentos PDF com IA local, usando busca semântica, banco vetorial e geração de respostas com rastreabilidade das fontes, sem depender de APIs pagas.
order: 5
featured: false
technologies:
  - Python
  - LangChain
  - Ollama
  - Qwen 3.5
  - Nomic Embed Text
  - ChromaDB
  - PyPDFLoader
  - RAG
github: https://github.com/GabrielSampaioS/rag
---

## Visão Geral

Local RAG é uma aplicação em Python que permite fazer perguntas em linguagem natural sobre documentos PDF, recuperando os trechos mais relevantes por similaridade semântica e usando um modelo de linguagem para gerar respostas baseadas nesse contexto. Todo o processamento, da geração de embeddings à resposta final, roda localmente com **Ollama**.

Hoje o projeto é aplicado à análise dos meus próprios currículos (em português) e carta de apresentação (em inglês). O objetivo principal é estudar na prática como funciona um pipeline de **Retrieval-Augmented Generation**: extração, fragmentação, indexação e recuperação de informações, indo além do simples uso de APIs de modelos de linguagem.

## Arquitetura e Decisões Técnicas

- **Pipeline em etapas independentes:** carregamento dos PDFs, chunking, embeddings, armazenamento vetorial, recuperação e geração, cada uma em seu módulo.
- **Execução 100% local:** Ollama executa o modelo de linguagem (`qwen3.5:4b`) e o modelo de embeddings (`nomic-embed-text`), reduzindo a dependência de serviços externos e custos de API.
- **Busca semântica:** o ChromaDB armazena os vetores com seus metadados e permite encontrar trechos relacionados à pergunta mesmo quando as palavras não coincidem.
- **Chunking com overlap:** `RecursiveCharacterTextSplitter` com fragmentos de 500 caracteres e sobreposição de 100 para reduzir perda de contexto nas divisões.
- **Rastreabilidade:** cada resposta retorna os documentos e páginas usados como fonte, permitindo conferir se a resposta está fundamentada.
- **Separação de responsabilidades:** configuração, carregamento, embeddings, vector store e cadeia de perguntas e respostas organizados em módulos distintos, facilitando manutenção, testes e evolução.

## Funcionalidades e Implementações

- **Ingestão de PDFs:** extração de texto com `PyPDFLoader`, preservando metadados como arquivo de origem e número da página.
- **Indexação persistente:** a base vetorial é mantida em disco, evitando reprocessar os documentos a cada execução.
- **Recuperação e geração:** a pergunta vira embedding, o Retriever busca os chunks mais próximos e o contexto é enviado ao LLM para gerar a resposta.
- **Respostas com fontes:** apresentação do nome do arquivo e da página de origem junto com a resposta.
- **Metadados semânticos (em evolução):** classificador baseado em regras, sem LLM, que atribui categoria (experiência, formação, competências, idiomas, contato e outras) e tópicos técnicos aos chunks. Funciona com múltiplos rótulos por chunk, herança de seção entre chunks consecutivos e filtro por categoria na consulta.

## Aprendizados

- **Recuperação vem antes da geração:** o LLM não responde corretamente com o que não foi recuperado, então avaliar o Retriever é tão importante quanto avaliar a resposta.
- **Tamanho do chunk importa:** fragmentos pequenos perdem contexto e fragmentos grandes trazem informação irrelevante.
- **Limitações de extração de PDF:** ruídos e cabeçalhos separados do conteúdo prejudicam a classificação e a busca, o que motivou a criação dos metadados.

## Evolução Planejada

Chunking que preserve a estrutura dos documentos, comparação de tamanhos de chunk e overlap, avaliação da recuperação com Precision@K e Recall@K, busca híbrida (BM25 + semântica), reranking, atualização incremental da base vetorial e testes automatizados para as etapas de processamento e recuperação.