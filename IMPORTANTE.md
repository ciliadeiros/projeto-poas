# GameLog — Frontend

Componentes React gerados a partir dos protótipos Figma do projeto GameLog.

## Fluxo de navegação

```
PaginaInicial (pública, "/")
  ├─→ Login ("/login")       ──┐
  └─→ Cadastro ("/cadastro")   ├─→ Home / Catálogo ("/catalogo", pós-login)
                                ┘
```

- **PaginaInicial**: primeira tela vista pelo usuário, antes de qualquer login.
- **Login** / **Cadastro**: telas de autenticação.
- **Home**: catálogo de jogos, acessado somente após o login.

## Estrutura

```
src/
  components/
    Header/          cabeçalho da Home: logo, navegação, perfil e busca
    HeroCarousel/     carrossel principal da Home (1920x600), setas e indicadores
    CategoryGrid/     grade de botões de categoria (280x250), hover com vinheta branca
    GameCarousel/     carrossel de jogos da Home (cards 337x177), botão de avançar
    Logo/             logo "GAMELOG" compartilhado (tamanhos sm/md/lg)
    AuthButton/        botão usado em Login/Cadastro/PaginaInicial (variants solid/outline)
    FormInput/         campo de formulário com label, usado em Login/Cadastro
  pages/
    PaginaInicial/     landing pública (primeira tela)
    Login/             tela de login
    Cadastro/          tela de cadastro
    Home/              catálogo pós-login (composição dos componentes acima)
  data/
    mockData.js        dados de exemplo — troque pelas chamadas à API GameLog
  styles/
    variables.css      paleta de cores, tipografia e tokens globais
```

## ⚠️ Sobre os arquivos originais enviados

As imagens de fundo/capas de jogos foram substituídas por placeholders
(gradientes/padrões) para não reproduzir artes com direitos autorais — trocar
pelos assets reais do projeto quando for integrar.

## Como usar

1. Copie a pasta `src/` inteira para o seu projeto React
2. Coloque as imagens reais (capas de jogos, categorias, etc.) em
   `public/assets/...` e ajuste os caminhos em `mockData.js` e nos CSS de
   fundo das páginas de auth/landing.
3. Monte as rotas, por exemplo com Next.js (App Router):

```
app/
  page.jsx            → renderiza <PaginaInicial />
  login/page.jsx       → renderiza <LoginPage />
  cadastro/page.jsx    → renderiza <CadastroPage />
  catalogo/page.jsx    → renderiza <Home /> (protegida, só pós-login)
```

4. Troque `mockData.js` pelas chamadas reais à sua API, por exemplo:

```jsx
useEffect(() => {
  fetch('/api/jogos/destaques').then(r => r.json()).then(setHeroGames);
  fetch('/api/categorias').then(r => r.json()).then(setCategories);
  fetch('/api/jogos').then(r => r.json()).then(setGames);
}, []);
```

## Observações de fidelidade ao protótipo

- O `HeroCarousel` é fixado em **1920x600px**, conforme a especificação.
- Os botões de `CategoryGrid` têm **280x250px** e usam `box-shadow inset` no
  hover para simular a vinheta branca vista no Figma.
- Os cards do `GameCarousel` têm **337x177px** e o carrossel avança por
  scroll suave (`scrollBy`) ao clicar na seta.
- A tipografia usa uma fonte display (`Anton`) para títulos — importe-a no
  seu `index.html` ou troque por outra de sua preferência em `variables.css`.
- Todos os componentes têm breakpoints básicos para telas menores; ajuste
  conforme o restante do seu design system.

## Próximos passos sugeridos

- Trocar navegação de `<a>` simples por `<Link>`/`useRouter` do Next.js.
- Conectar `LoginPage` e `CadastroPage` aos endpoints reais da API GameLog
  (`onSubmit` já isolado em cada componente, só falta o `fetch`/mutation).
- Adicionar validação de formulário (campos obrigatórios, força de senha,
  confirmação de e-mail) e estados de carregamento/erro.
- Proteger a rota `/catalogo` (Home) para redirecionar ao `/login` caso o
  usuário não esteja autenticado.
- As telas de auth/landing usam a fonte "Public Sans" (do protótipo original);
  a Home usa uma fonte display tipo Anton/Bebas para títulos. Importe ambas
  via Google Fonts ou troque pelas fontes definitivas do seu design system em
  `variables.css`.
