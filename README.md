# Motiva App - Sprint 3

Aplicativo para registrar ocorrências em rodovias e consultar o local, a descrição e o nível de risco de cada registro. Ajuda a organizar as ocorrências pendentes e as que já foram resolvidas.

Esta versão continua o app da Sprint 2 e acrescenta persistência local, local e data do registro e uma tela de detalhe.

## Integrantes

| Nome | RM |
| --- | --- |
| Lucas Kenzo Nishiwaki | 561325 |
| Felipe Hui Hattori | 565169 |
| Kauã Peres de Macedo | 563977 |
| Rafael Vaz de Lima | 566429 |
| André Eduardo Martins | 563297 |
| Kauany Ribeiro de Moura | 564576 |

## Repositório e vídeo

- Repositório da Sprint 3: [Motiva-Sprint-3](https://github.com/luc916/Motiva-Sprint-3).
- Vídeo de demonstração: [Assistir à demonstração](https://youtu.be/Q_gX5FAII8c).
- [Sprint 1 - proposta e protótipo](https://github.com/Kauany-Moura/motiva-app)
- [Sprint 2 - projeto usado como base](https://github.com/RafaelLVaz/Registro-de-Ocorrencias-Motiva)

## Como rodar

Instale o Node.js 22 LTS (22.13 ou superior) ou 24 LTS (24.3 ou superior) e o Expo Go atualizado no celular. O projeto usa Expo SDK 57.

Na pasta que contém o arquivo `package.json`, execute:

```bash
npm install
npx expo login
npx expo start
```

Entre na mesma conta Expo no computador e no Expo Go do celular. O Expo Go SDK 57 exige esse login nos dois dispositivos.

Com o computador e o celular na mesma rede, leia o QR code com o Expo Go no Android ou com a câmera no iPhone. Para testar no navegador:

```bash
npm run web
```

Para conferir os tipos:

```bash
npm run typecheck
```

## Telas e fluxo

1. A lista mostra as ocorrências pendentes, com descrição, local, data e risco baixo, médio ou alto.
2. O botão **+** abre o cadastro. Preencha título, descrição e local e escolha o risco.
3. Toque em **ADICIONAR**. O app grava os dados e volta para a lista já atualizada.
4. Toque em **Ver detalhes** para consultar o registro completo. O botão de voltar retorna à lista.
5. Feche o aplicativo e abra novamente. A ocorrência cadastrada continua disponível.
6. O botão de confirmação move o registro para **Resolvidas**. A lixeira exclui o registro. Essas alterações também ficam salvas.

O risco é selecionado manualmente no cadastro. O ID numérico e a data são gerados ao salvar.

## Persistência

O arquivo `src/services/ocorrenciaStorage.ts` concentra o acesso ao AsyncStorage. As telas usam o contexto, sem acessar o storage diretamente.

A lista é convertida em texto com `JSON.stringify` e salva na chave `@motiva:ocorrencias`. Ao abrir o app, `JSON.parse` recupera os registros. Os seis exemplos de `src/data/ocorrenciasMock.ts` são usados somente quando essa chave ainda não existe. Uma lista vazia salva não é substituída pelos exemplos.

O contexto mantém `useState<Ocorrencia[]>([])` e atualiza as telas depois que a gravação termina. Durante o carregamento e a gravação, o app evita novas alterações. Se houver falha ao salvar, exibe uma mensagem e mantém os dados anteriores.

Os dados ficam no aparelho. Na versão web, o AsyncStorage usa o armazenamento local do navegador. Para repetir o teste na web, use o mesmo navegador, endereço e porta. Desinstalar o app ou limpar seus dados pode apagar os registros; não há sincronização entre dispositivos.

## Organização

```text
App.tsx
src/
  components/
    OcorrenciaCard.tsx
  context/
    OcorrenciaContext.tsx
  data/
    ocorrenciasMock.ts
  navigation/
    AppNavigator.tsx
  screens/
    ListaOcorrencias.tsx
    NovaOcorrencia.tsx
    DetalheOcorrencia.tsx
    Resolvidas.tsx
  services/
    ocorrenciaStorage.ts
  types/
    index.ts
```

O tipo `Ocorrencia` mantém os campos obrigatórios `id`, `descricao`, `local`, `risco` e `data`. Também preserva `titulo` e `resolvida`, usados no projeto anterior. A navegação continua com React Navigation e o estado compartilhado com Context API.

## Conferência antes da entrega

- Cadastrar registros com os três níveis de risco.
- Conferir o registro na lista e no detalhe.
- Voltar do cadastro e do detalhe sem reiniciar o app.
- Fechar completamente o app e reabrir, conferindo os mesmos registros.
- Resolver uma ocorrência, reabrir e conferir a aba Resolvidas.
- Conferir os links do repositório e do vídeo acima.

