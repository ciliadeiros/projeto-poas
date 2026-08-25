# GameLog - Frontend (Next.js)

## Como rodar

```bash
npm install
cp .env.local.example .env.local   # já vem com http://localhost:8000
npm run dev
```

Abra http://localhost:3000 — a página inicial já tem links pra /login e /cadastro.

## Integração com o backend (FastAPI)

Rodando o backend (`GameLog-Backend`) junto:

```bash
uvicorn app.main:app --reload
```

> ⚠️ O README do backend manda rodar `uvicorn app.main:main`, mas o objeto
> FastAPI se chama `app` (`app = FastAPI(...)` em `app/main.py`), não `main`.
> É `app.main:app`, senão o uvicorn não sobe.

Isso liga o backend em `http://localhost:8000`, que é o valor padrão de
`NEXT_PUBLIC_API_URL` no `.env.local.example`. O CORS do backend
(`app/core/cors.py`) já libera `http://localhost:3000`, então não precisa
mexer em nada lá.

O backend também espera um MySQL rodando localmente com as credenciais
fixas em `app/core/config.py` (`root:admin@localhost:3306/db_Gamelog`) — sem
isso ele não sobe.

### O que foi conectado

- `lib/api.js` — cliente central de fetch, com uma função por endpoint
  (`registerUser`, `loginUser`, `getMe`, `listGames`, `getGame`,
  `searchRawg`, `listLibrary`, `addToLibrary`, `updateLibraryEntry`,
  `removeFromLibrary`). Erros do FastAPI (`detail`) viram `ApiError`.
- `context/AuthContext.jsx` — guarda o token JWT no `localStorage`
  (`gamelog_token`), expõe `user`, `login`, `register`, `logout`, `loading`,
  e recupera a sessão automaticamente ao recarregar a página (chamando
  `GET /auth/me`).
- **Login** (`app/login/page.js`) chama `POST /auth/login`. Atenção: essa
  rota usa `OAuth2PasswordRequestForm`, então o corpo vai como
  `application/x-www-form-urlencoded` com campos `username`/`password`
  (não JSON) — isso já está tratado em `lib/api.js`. `username` = e-mail.
- **Cadastro** (`app/cadastro/page.js`) chama `POST /auth/register` (JSON) e,
  como o backend não loga automaticamente após cadastrar, faz login em
  seguida com as mesmas credenciais.
- Login e cadastro agora mostram a mensagem de erro que o backend manda
  (ex.: "Email já cadastrado", "Email ou senha inválidos") e desabilitam o
  botão enquanto a requisição está em andamento.
- A home (`app/page.js`) mostra "Olá, {usuário}" + botão "SAIR" quando tem
  sessão ativa, ou os botões de login/cadastro quando não tem.

## O que foi feito na adaptação anterior (Figma → Next.js)

1. Criei o projeto Next.js (App Router) do zero com `create-next-app`.
2. Criei `components/BotaoAuth.jsx` e `components/Logo.jsx` — o export do
   Figma referenciava esses componentes e algumas imagens que não vieram no
   zip. Troquei o logo por uma versão em texto/CSS e as imagens por um
   placeholder SVG (`public/images/placeholder.svg`) — troquem pelos assets
   reais quando exportarem de novo do Figma.
3. Converti os `style.css` (que tinham os MESMOS nomes de classe genéricos
   como `.content`, `.div`, `.titulo` em telas diferentes) para CSS Modules.
4. Adicionei `"use client"` nas páginas com `useState`/contexto.
5. Na tela de cadastro, os campos "Digite:" eram só `<div>` estáticas (sem
   input de verdade) — troquei por `<input>` reais dentro de um `<form>`.

## Novas telas (catálogo e biblioteca)

- `app/catalogo/page.js` — lista pública dos jogos (`GET /games/`). Se tiver
  sessão ativa, cada card tem um botão "+ Biblioteca" que chama
  `addToLibrary(token, { bib_status: "planejado", bib_jgs_id })`.
- `app/biblioteca/page.js` — rota protegida: se não tiver sessão, redireciona
  pra `/login`. Busca `listLibrary(token)` e `listGames()` em paralelo e cruza
  os dois pra mostrar título/capa (o `GET /library/` do backend só devolve
  `bib_jgs_id`, não o jogo completo). Dá pra trocar o status (select) e
  remover o jogo da biblioteca.
- A home agora tem os botões "CATÁLOGO" e "MINHA BIBLIOTECA" quando logado.

## Próximos passos sugeridos

- Trocar os SVGs de `public/images/` pelas imagens reais exportadas do Figma.
- Criar a tela de pesquisa (RAWG) usando `searchRawg` de `lib/api.js`.
- Se quiserem simplificar a biblioteca, dá pra trocar o `response_model` da
  rota `GET /library/` no backend pra `list[LibraryDetailResponse]` (que já
  tem o campo `jogo` embutido) e remover o cruzamento manual no front.
- Proteger `/biblioteca` no nível de servidor (hoje o redirecionamento pro
  `/login` acontece no client, depois que a página já carregou).
- Portar as demais telas do Figma (pesquisa, detalhes do jogo) seguindo o
  mesmo padrão: uma pasta em `app/`, um `page.jsx` e um `page.module.css`.

## CSS: base comum + por página

- `app/styles/base.css` — reset, variáveis de cor/fonte (`--color-bg`,
  `--font-base` etc.) e estilos de `html`/`body`. É importado uma única vez,
  em `app/layout.jsx`, e vale pro site inteiro (equivalente ao CSS que ia
  no `base.html` no Flask).
- `app/styles/lista.module.css` — CSS Module compartilhado só entre
  `catalogo/` e `biblioteca/`, que têm a mesma grade de cards de jogo
  (`.pagina`, `.header`, `.titulo`, `.grid`, `.card`, `.capa`,
  `.cardTitulo`). Se criar uma nova página parecida (ex.: resultado de
  pesquisa), pode importar esse módulo também.
- `app/<rota>/page.module.css` — só o que é específico daquela página
  (botões, formulário, etc.). Continua sendo importado normalmente com
  `import styles from "./page.module.css"`; quando a página também usa o
  módulo compartilhado, importa os dois (`import shared from
  "../styles/lista.module.css"`) e usa `shared.X` ou `styles.X` conforme a
  classe for comum ou específica.
