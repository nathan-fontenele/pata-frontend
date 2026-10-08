# Pata Frontend

Frontend em Next.js para a plataforma Pata, focada na gestão de clínicas veterinárias. O cadastro de tutores não faz parte do produto.

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Autenticação e API

O login usa o SDK oficial do Auth0 para Next.js. Crie uma aplicação **Regular Web Application** no Auth0 e copie `.env.example` para `.env.local`. Preencha `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, `AUTH0_SECRET`, `AUTH0_AUDIENCE` e `PATA_API_URL`. Gere `AUTH0_SECRET` com `openssl rand -hex 32`.

No Auth0, cadastre:

- Allowed Callback URL: `http://localhost:3000/callback`
- Allowed Logout URL: `http://localhost:3000`

O login/cadastro passa por `/auth/login`; o SDK trata callback e sessão em cookies protegidos. O token não é enviado ao JavaScript do navegador: as chamadas autenticadas passam pelo proxy `/api/backend/*`, que encaminha a requisição à API com `Authorization: Bearer`.

Após criar a identidade no Auth0, o fluxo de onboarding da clínica chama:

- `POST /api/organizacao` para cadastrar a organização da clínica (`nome`, `slug`, `cnpj` e `email`; `logoUrl` é opcional).

O `POST /api/organizacao` é público no backend, com limite de cinco tentativas por IP a cada 15 minutos. O onboarding do frontend continua após o login/cadastro no Auth0; se a API responder `429`, a tela informa o tempo de espera. A auditoria identifica essas criações como `cadastro-publico`, sem associar um usuário autenticado. As demais rotas protegidas usam token Bearer; configure `AUTH0_AUDIENCE` com o identificador da API cadastrado no Auth0 e aceito pelo backend.

O Swagger também documenta `GET /api/organizacao` e operações autenticadas para equipes, usuários e convites.

## Scripts

- `npm run dev` inicia o servidor de desenvolvimento.
- `npm run build` cria a versão de produção.
- `npm run lint` executa o ESLint.
