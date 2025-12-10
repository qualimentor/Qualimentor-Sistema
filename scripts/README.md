# Scripts de Manutenção do Firebase

Este diretório contém scripts essenciais para a manutenção e limpeza do ambiente Firebase do projeto VIA ANALÍTICA.

**ATENÇÃO:** Estes scripts executam operações destrutivas e devem ser usados com extremo cuidado, especialmente em ambientes de produção.

## Pré-requisitos

1.  **Firebase Admin SDK**: Os scripts usam `firebase-admin`. Instale as dependências:
    ```bash
    npm install firebase-admin
    ```
2.  **TypeScript e ts-node**: Para executar os scripts `.ts` diretamente.
    ```bash
    npm install -g typescript ts-node
    ```
3.  **Credenciais de Serviço (Service Account)**:
    *   Obtenha o arquivo JSON da chave da conta de serviço no Console do Firebase > Configurações do Projeto > Contas de Serviço.
    *   Renomeie o arquivo para `serviceAccount.prod.json` e coloque-o neste diretório (`/scripts`).
    *   **NUNCA** comite este arquivo no Git. Adicione `scripts/serviceAccount.prod.json` ao seu `.gitignore`.

## Scripts Disponíveis

### 1. `findAndPurgeTestCompanies.ts`

**O que faz**: Varre a coleção `companies` no Firestore e identifica documentos que parecem ser de teste com base em dois critérios:
    *   O documento possui um campo `isTest: true`.
    *   O nome da empresa (`name`) contém palavras como "TEST", "DEV", "MOCK", etc.

**Como usar**:
1.  Garanta que os pré-requisitos acima foram atendidos.
2.  Execute o script:
    ```bash
    ts-node scripts/findAndPurgeTestCompanies.ts
    ```
3.  O script irá listar no console os IDs das empresas detectadas.
4.  **REVISE MANUALMENTE** cada ID no console do Firebase para ter 100% de certeza de que são dados de teste.
5.  Após a confirmação, use o script `purgeCompany.ts` para realizar a exclusão.

### 2. `purgeCompany.ts`

**O que faz**: Apaga permanentemente uma ou mais empresas do Firestore, incluindo suas subcoleções principais (`sectors`, `users`, `auditLogs`, etc.) e subcoleções aninhadas.

**Como usar**:

**CUIDADO: ESTA AÇÃO É IRREVERSÍVEL. FAÇA UM BACKUP COMPLETO DO FIRESTORE ANTES DE PROSSEGUIR.**

1.  Identifique os IDs das empresas que você tem certeza que devem ser apagadas.
2.  Execute o script passando os IDs como argumentos de linha de comando:
    ```bash
    ts-node scripts/purgeCompany.ts <companyId1> <companyId2> ...
    ```
    Exemplo:
    ```bash
    ts-node scripts/purgeCompany.ts company_mock_123 company_test_456
    ```
3.  O script mostrará o progresso da exclusão no console.

### 3. `purgeTestUsers.ts`

**O que faz**: Apaga usuários do Firebase Authentication que são identificados como testadores. Os critérios são:
    *   O e-mail do usuário contém `+test@` (ex: `usuario+test@email.com`).
    *   O usuário possui uma "custom claim" de `role: "tester"`.

**Como usar**:

**CUIDADO: ESTA AÇÃO É IRREVERSÍVEL E APAGA CONTAS DE USUÁRIOS.**

1.  Execute o script:
    ```bash
    ts-node scripts/purgeTestUsers.ts
    ```
2.  O script listará os usuários que serão apagados e, em seguida, procederá com a exclusão. Em um ambiente de produção real, é altamente recomendável adicionar um passo de confirmação manual no script antes da exclusão.

---

## Procedimento Recomendado para Limpeza

1.  **Faça Backup**: Exporte seus dados do Firestore e do Storage.
2.  **Identifique**: Execute `findAndPurgeTestCompanies.ts` para listar os candidatos à exclusão.
3.  **Valide**: Verifique a lista gerada manualmente no console do Firebase.
4.  **Execute a Limpeza**:
    *   Execute `purgeCompany.ts` com os IDs validados.
    *   Execute `purgeTestUsers.ts` para limpar as contas de autenticação.
    *   Use `gsutil` (conforme o prompt) para apagar os dados correspondentes no Cloud Storage.
5.  **Verifique**: Confirme que os dados foram removidos e que o aplicativo continua funcionando corretamente com os dados de produção restantes.
