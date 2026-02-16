# QualiLab — Plataforma de Gestão da Qualidade para Laboratórios Clínicos

O **QualiLab** é uma aplicação web moderna para gestão da qualidade laboratorial. A plataforma foi desenhada para suportar, de forma integrada, o **Controle Interno (CI)**, o **Controle Externo (CQE)** e a **Gestão Analítica**, com foco em segurança, multi-tenancy e escalabilidade.

## Objetivos da Plataforma

Com o QualiLab, os laboratórios podem:

- Gerenciar o **Controle de Qualidade Interno (CI)**, com entrada de dados, gráficos de Levey-Jennings e regras de Westgard.
- Gerenciar o **Controle de Qualidade Externo (CQE)** (ensaios de proficiência), com comparação entre laboratório e grupo de pares.
- Realizar **Gestão Analítica** completa, monitorando indicadores como CV%, Bias% e Erro Total (ETa).
- Obter uma **Visão Sistêmica** da qualidade por meio de dashboards com priorização de analitos críticos.
- Configurar de forma flexível setores, equipamentos, controles e analitos.

## Stack Tecnológica

| Componente | Tecnologia / Padrão |
| --- | --- |
| Framework Frontend | Next.js 15 (App Router) |
| Linguagem | TypeScript (frontend e backend) |
| UI & Estilo | Tailwind CSS + shadcn/ui |
| Base de Dados | Cloud Firestore (NoSQL, multi-tenant) |
| Autenticação | Firebase Authentication (Email/Senha) + Session Cookies |
| Lógica de Backend | Firebase Cloud Functions (TypeScript) |
| Inteligência Artificial | Genkit (Google AI) |
| Testes | Playwright (E2E) + Vitest (regras do Firestore) |
| CI/CD | GitHub Actions + Firebase Hosting |

## Estrutura do Projeto

A arquitetura foi organizada para garantir separação clara entre responsabilidades de cliente, servidor e domínio de negócio.

### `src/app/` — Núcleo da aplicação Next.js

- `/` redireciona para login.
- `/inicio` página de login pública.
- `/gestao-sistemica` dashboard principal autenticado.
- `/internal-qc`, `/external-qc`, etc. para módulos funcionais.
- `src/app/api/` contém rotas de API (ex.: login de sessão, health check), usando runtime `nodejs` quando há dependência de `firebase-admin`.

### `src/lib/` — Lógica de negócio e utilitários

- `types.ts`: contratos e interfaces centrais.
- `qc-engine.ts`: cálculos estatísticos e avaliação de regras de Westgard.
- `quality-specifications.ts`: metas analíticas (CV, Bias, ETa) por analito.
- `server/firebaseAdmin.ts`: ponto único de inicialização do SDK Admin (server-only).

### `src/firebase/` — Integração Firebase no cliente

- `config.ts`: configuração pública do Firebase.
- `provider.tsx` e `client-provider.tsx`: inicialização e estado dos serviços Firebase no cliente.
- `auth/use-user.tsx`: hook de estado do usuário autenticado.
- `firestore/`: hooks reativos (`useCollection`, `useDoc`).
- `errors.ts` e `error-emitter.ts`: tratamento de erros de permissão do Firestore para facilitar desenvolvimento e diagnóstico.

### `src/features/` — Funcionalidades modulares

- `explorer/`: lógica e componentes do Explorador Sistêmico.
- `risk/`: cálculo e avaliação de risco analítico.

### `functions/` — Backend com Cloud Functions

- `src/index.ts`: criação de empresas, convites, troca de empresa ativa e criação de sessão (`session cookie`).

### `middleware.ts` — Proteção de rotas no Edge Runtime

- Verifica apenas presença do cookie `__session`.
- Redireciona para `/inicio` quando não autenticado.
- Não importa `firebase-admin` (mantendo middleware leve e compatível com edge runtime).

## Fluxo de Autenticação e Multi-Tenancy

1. Usuário realiza login em `/inicio`.
2. Cliente envia `idToken` para `POST /api/session/login`.
3. API valida token com `firebase-admin` e cria cookie seguro `__session`.
4. Middleware protege rotas verificando presença do cookie.
5. Cloud Functions gerenciam empresas e vínculo de usuários, assegurando isolamento entre tenants.

## Principais Módulos

### Controle Interno (CI)

- Dashboard por setor e analito.
- Entrada de dados individual ou em lote.
- Gráficos de Levey-Jennings em tempo real.
- Identificação de violações de Westgard.
- Assistente com IA (Genkit) para interpretação de violações e ações corretivas.

### Configurações

- Gestão de setores, equipamentos e controles.
- Extração assistida por IA de dados de bula em PDF para preenchimento automático de média e desvio padrão.

### Gestão Analítica e Risco

- Explorador Sistêmico com ordenação por score de risco.
- Dashboards dedicados a desempenho de CI (CV%) e CQE (Bias%).
- Cálculo automático de Erro Total com dados combinados CI + CQE.

## Estado Atual do Projeto

O sistema encontra-se em fase robusta de desenvolvimento, com os principais desafios arquiteturais já endereçados:

- separação clara cliente/servidor,
- autenticação com sessão segura,
- multi-tenancy consistente,
- base de código modular e pronta para expansão de funcionalidades.

