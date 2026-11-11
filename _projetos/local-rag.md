---
order: 4
category: ia
tier: complementar
badge: IA LOCAL // RAG
title: Local RAG
summary: Projeto de estudo em Python que responde perguntas sobre documentos PDF com busca semântica e modelos executados localmente via Ollama.
highlight: Pipeline RAG com embeddings locais, ChromaDB e respostas que citam o documento e a página de origem.
techs: [Python, LangChain, Ollama, ChromaDB, Nomic Embed Text, PyPDFLoader, RAG]
modal:
  category: "IA LOCAL // RETRIEVAL-AUGMENTED GENERATION"
  description: Aplicação em Python para perguntar, em linguagem natural, sobre PDFs (como currículos e cartas de apresentação). Todo o processamento roda na máquina, sem APIs pagas. É um projeto de estudo e o código ainda não está público.
  solution: A ingestão extrai o texto com PyPDFLoader, divide em chunks com RecursiveCharacterTextSplitter, gera embeddings com Nomic Embed Text e guarda no ChromaDB. A resposta é gerada por um modelo no Ollama a partir dos trechos recuperados, mantendo documento e página de origem. Os chunks recebem metadados (categorias e tópicos) por classificação baseada em regras, usados como filtro na recuperação.
  techs: [Python, LangChain, Ollama, Nomic Embed Text, ChromaDB, PyPDFLoader, RecursiveCharacterTextSplitter, Busca vetorial, RAG]
status:
  done:
    - "Ingestão de PDFs, chunking e armazenamento no ChromaDB"
    - "Respostas com referência a documento e página"
    - "Metadados nos chunks e filtro por categoria"
  planned:
    - "Métricas de recuperação (Precision@K e Recall@K)"
    - "Busca híbrida com BM25 e reranking"
    - "Chunking estrutural e testes automatizados"
---
