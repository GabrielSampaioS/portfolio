---
order: 5
category: backend
badge: LOCAL AI // RAG PIPELINE
title: Local RAG
summary: Sistema local de perguntas e respostas sobre documentos PDF utilizando Retrieval-Augmented Generation, busca semântica, banco vetorial e modelos de linguagem executados via Ollama, com rastreabilidade das fontes e sem dependência de APIs pagas.
highlight: Pipeline RAG modular com embeddings locais, recuperação semântica via ChromaDB, enriquecimento de chunks com metadados e respostas fundamentadas em documentos e páginas de origem.
techs: [Python, LangChain, Ollama, Qwen 3.5, Nomic Embed Text, ChromaDB, PyPDFLoader, RAG]
repo: https://github.com/GabrielSampaioS/rag
modal:
  category: "LOCAL AI SYSTEM // RETRIEVAL-AUGMENTED GENERATION"
  description: Aplicação em Python para perguntas e respostas em linguagem natural sobre documentos PDF. Utiliza busca por similaridade semântica para recuperar trechos relevantes e modelos de linguagem para gerar respostas fundamentadas no conteúdo recuperado. Todo o processamento, desde a geração de embeddings até a resposta final, é executado localmente com Ollama.
  solution: Implementa um pipeline RAG modular com etapas independentes de ingestão de documentos, extração de texto via PyPDFLoader, fragmentação com RecursiveCharacterTextSplitter, geração de embeddings com Nomic Embed Text e armazenamento persistente no ChromaDB. O modelo Qwen 3.5 executado via Ollama gera respostas a partir do contexto recuperado. Cada resposta mantém referências ao documento e à página de origem. Também incorpora enriquecimento semântico dos chunks por meio de classificação baseada em regras, atribuindo categorias e tópicos técnicos, com suporte a múltiplos rótulos, herança de seção e filtros por categoria na recuperação.
  techs: [Python, LangChain, Ollama, Qwen 3.5, Nomic Embed Text, ChromaDB, PyPDFLoader, RecursiveCharacterTextSplitter, Vector Search, RAG]
---