# Qualimentor - Sistema Integrado de Qualidade

Este é o repositório oficial do Sistema Integrado de Qualidade da Qualimentor, uma plataforma completa que unifica o site institucional e o sistema interno com módulos de IA para gestão da qualidade em laboratórios.

## Estrutura do Projeto

O projeto é construído com Next.js 15, React 18, Tailwind CSS e Firebase, seguindo as melhores práticas de desenvolvimento:

```
qualimentor-novo/
├── public/                  # Arquivos estáticos
│   └── images/              # Imagens do site e sistema
├── src/
│   ├── app/                 # Páginas da aplicação (Next.js App Router)
│   │   ├── home/            # Site público - Página inicial
│   │   ├── sobre/           # Site público - Sobre nós
│   │   ├── cursos/          # Site público - Cursos oferecidos
│   │   ├── contato/         # Site público - Formulário de contato
│   │   ├── login/           # Página de autenticação
│   │   ├── dashboard/       # Sistema interno - Dashboard principal
│   │   ├── mentor-ia/       # Sistema interno - Módulo Mentor-IA
│   │   ├── insight-ia/      # Sistema interno - Módulo Insight-IA
│   │   ├── auditor-ia/      # Sistema interno - Módulo Auditor-IA
│   │   └── cadastro-usuario/ # Sistema interno - Cadastro de usuários
│   ├── components/          # Componentes reutilizáveis
│   │   ├── auth/            # Componentes de autenticação
│   │   ├── layout/          # Componentes de layout (Header, Footer)
│   │   └── ui/              # Componentes de interface
│   ├── context/             # Contextos React (Auth, UserRole)
│   ├── hooks/               # Hooks personalizados
│   └── lib/                 # Utilitários e configurações
│       ├── firebase.js      # Configuração do Firebase
│       └── ai-helpers.js    # Funções de integração com IA (Preparado para GPT Team)
```

## Tecnologias Utilizadas

- **Frontend**: Next.js 15, React 18, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Inteligência Artificial**: OpenAI API (Preparado para GPT Team)
- **Deploy**: Vercel

## Módulos de IA (GPT Team)

O sistema está preparado para usar GPTs personalizados do GPT Team para cada módulo:

1. **Mentor-IA**: Análise de não conformidades e eventos adversos (ISO 15189, RDC 786/2023).
2. **Insight-IA**: Análise de indicadores de qualidade, tendências e recomendações.
3. **Auditor-IA**: Verificação automática de documentos e conformidade normativa.

## Requisitos

- Node.js 18.0.0 ou superior
- NPM 9.0.0 ou superior
- Conta Firebase
- Conta OpenAI com acesso ao GPT Team
- Chave de API da OpenAI
- IDs dos GPTs personalizados (Mentor-IA, Insight-IA, Auditor-IA)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/sua-organizacao/qualimentor-novo.git
cd qualimentor-novo
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.local` na raiz do projeto baseado no `.env.local.example`
   - Preencha com suas credenciais do Firebase, chave da API OpenAI e os IDs dos seus GPTs personalizados:
     ```
     # Firebase Config
     NEXT_PUBLIC_FIREBASE_API_KEY=...
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
     NEXT_PUBLIC_FIREBASE_APP_ID=...
     
     # OpenAI Config
     NEXT_PUBLIC_OPENAI_API_KEY=sk-...
     
     # GPT Team IDs (Opcional, se não preenchido usará modelo padrão)
     NEXT_PUBLIC_GPT_MENTOR_ID=g-... 
     NEXT_PUBLIC_GPT_INSIGHT_ID=g-...
     NEXT_PUBLIC_GPT_AUDITOR_ID=g-...
     ```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse http://localhost:3000 no seu navegador

## Build e Deploy

### Build Local

```bash
npm run build
npm start
```

### Deploy na Vercel

1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente na interface da Vercel (incluindo as credenciais do Firebase, OpenAI API Key e os GPT IDs)
3. A Vercel detectará automaticamente o projeto Next.js e fará o deploy.

## Configuração do Firebase

- **Authentication**: Autenticação de usuários
- **Firestore**: Banco de dados (usuários, não conformidades, indicadores, documentos)
- **Storage**: Armazenamento de arquivos

## Integração com GPT Team

O arquivo `src/lib/ai-helpers.js` está preparado para usar os GPTs personalizados. Certifique-se de que os IDs dos GPTs (`NEXT_PUBLIC_GPT_MENTOR_ID`, `NEXT_PUBLIC_GPT_INSIGHT_ID`, `NEXT_PUBLIC_GPT_AUDITOR_ID`) estão configurados no seu arquivo `.env.local` e nas variáveis de ambiente da Vercel. Se os IDs não forem fornecidos, o sistema usará o modelo GPT-4 Turbo padrão.

*Observação: A API oficial para chamar GPTs específicos ainda pode estar em desenvolvimento pela OpenAI. O código atual usa a API de Chat Completions padrão, mas está estruturado para adicionar o parâmetro `gpt_id` facilmente quando disponível.* 

## Estrutura de Permissões

- **Administrador**: Acesso completo
- **Gestor**: Acesso ao dashboard e módulos (sem cadastro de usuários)
- **Analista**: Acesso ao dashboard, Mentor-IA e Insight-IA
- **Auditor**: Acesso ao dashboard e Auditor-IA

## Contribuição

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Propriedade da Qualimentor.

## Contato

[qualimentor.com.br](https://qualimentor.com.br)
