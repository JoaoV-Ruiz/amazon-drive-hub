# 7. Identidade visual

> ⚠️ **Em construção.** O manual da marca em PDF está em
> [`marca/AMAZON - MANUAL DA MARCA.pdf`](./marca/AMAZON%20-%20MANUAL%20DA%20MARCA.pdf),
> mas as cores e tipografia ainda **não foram extraídas pra este doc**
> (PDF é só imagem, sem texto extraível).
>
> Preencher esta seção é pré-requisito pra começar a polir o design das telas.

---

## Cores

Substituir pelos hex oficiais do manual.

| Token Tailwind | Uso                            | Hex          |
| -------------- | ------------------------------ | ------------ |
| `brand.DEFAULT`| Cor primária (CTAs, links)     | _a preencher_|
| `brand.dark`   | Hover / variações escuras      | _a preencher_|
| `brand.light`  | Backgrounds suaves, destaques  | _a preencher_|
| `neutral.*`    | Cinzas (Tailwind padrão)       | usar default |

Lugar pra atualizar: [`frontend/tailwind.config.js`](../frontend/tailwind.config.js).

## Tipografia

| Uso             | Família | Pesos usados |
| --------------- | ------- | ------------ |
| Texto / UI      | _a preencher_ | 400, 500, 600, 700 |
| Títulos (opcional) | _a preencher_ | 600, 700 |

Lugar pra atualizar:

- [`frontend/index.html`](../frontend/index.html) — `<link>` da fonte
- [`frontend/tailwind.config.js`](../frontend/tailwind.config.js) — `fontFamily`

## Logo

| Variação            | Arquivo                 |
| ------------------- | ----------------------- |
| Logo principal      | `marca/logo.svg`        |
| Logo monocromático  | `marca/logo-mono.svg`   |
| Favicon             | `frontend/public/favicon.svg` |

---

## Como extrair do PDF

O PDF atual é todo imagem. Pra extrair as cores/tipografia, escolha um caminho:

**A) Converter páginas em imagens (recomendado se tiver `imagemagick`):**

```bash
brew install imagemagick   # macOS, uma vez só

cd docs/marca
mkdir -p imagens
magick -density 200 "AMAZON - MANUAL DA MARCA.pdf" imagens/pagina-%02d.png
```

Depois adicione as páginas relevantes (cores, tipografia, logo) ao commit
e atualize os campos acima manualmente.

**B) Anotar manualmente:**

Abra o PDF, leia os hex e nomes de fonte, edite este arquivo.
