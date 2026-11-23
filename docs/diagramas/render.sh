#!/usr/bin/env bash
# Gera os SVGs de assets/img/diagramas a partir dos .mmd desta pasta.
# Requisito: npm i -g @mermaid-js/mermaid-cli   (comando mmdc)
# Uso (na raiz do repositório): bash docs/diagramas/render.sh
set -euo pipefail
cd "$(dirname "$0")/../.."
mkdir -p assets/img/diagramas
for f in docs/diagramas/*.mmd; do
  n=$(basename "$f" .mmd)
  mmdc -q -i "$f" -o "assets/img/diagramas/$n.svg" -c docs/diagramas/mermaid-config.json -b transparent
  # Tamanho natural (do viewBox) para o navegador não esticar o diagrama além do original.
  python3 - "assets/img/diagramas/$n.svg" <<'PY'
import re, sys
p = sys.argv[1]
s = open(p, encoding="utf-8").read()
m = re.search(r'viewBox="[-\d.]+ [-\d.]+ ([\d.]+) ([\d.]+)"', s)
if m:
    w, h = round(float(m.group(1))), round(float(m.group(2)))
    s = re.sub(r'(<svg[^>]*?) width="100%"', r'\1 width="%d" height="%d"' % (w, h), s, count=1)
    s = re.sub(r'(<svg[^>]*?) style="max-width:[^"]*;?"', r'\1', s, count=1)
open(p, "w", encoding="utf-8").write(s)
PY
  echo "ok $n"
done
