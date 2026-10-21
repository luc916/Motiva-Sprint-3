# Motiva — Registro de Ocorrências Rodoviárias

Aplicativo mobile desenvolvido para apoiar o registro e o acompanhamento de ocorrências em rodovias administradas pela Motiva.

O problema atendido é a necessidade de organizar, de forma simples, informações sobre situações encontradas na rodovia. O usuário principal é a equipe responsável pelo monitoramento e pela operação das vias. Sua ação principal no aplicativo é cadastrar uma ocorrência com título, descrição, local e nível de risco e, depois, consultá-la na lista ou na tela de detalhe.

Esta entrega final mantém o código funcional da Sprint 3. O foco da Sprint 4 é documentar e demonstrar o fluxo já implementado, sem adicionar novas funcionalidades.

## Integrantes

| Nome | RM |
| --- | --- |
| Lucas Kenzo Nishiwaki | 561325 |
| Felipe Hui Hattori | 565169 |
| Kauã Peres de Macedo | 563977 |
| Rafael Vaz de Lima | 566429 |
| André Eduardo Martins | 563297 |
| Kauany Ribeiro de Moura | 564576 |

## Links da entrega

- Repositório: [github.com/luc916/Motiva-Sprint-3](https://github.com/luc916/Motiva-Sprint-3)
- Vídeo de demonstração no YouTube: [youtu.be/Q_gX5FAII8c](https://youtu.be/Q_gX5FAII8c)

> O vídeo deve permanecer como **Não listado**. Dessa forma, qualquer pessoa com o link consegue assistir, mas ele não aparece publicamente nas buscas do YouTube.

## Tecnologias

- React Native
- Expo
- TypeScript
- React Navigation
- Context API
- AsyncStorage

## Como executar

### Pré-requisitos

- Node.js em uma versão LTS
- npm
- Expo Go atualizado no celular, caso o teste seja feito em um dispositivo físico

Clone o repositório, entre na pasta do projeto e instale as dependências:

```bash
git clone https://github.com/luc916/Motiva-Sprint-3.git
cd Motiva-Sprint-3
npm install
```

Inicie o Expo:

```bash
npx expo start
```

Após a inicialização:

- leia o QR code com o Expo Go para abrir no celular;
- pressione `a` para abrir no Android, se houver um emulador configurado;
- pressione `i` para abrir no iOS, se estiver usando macOS com o simulador configurado;
- pressione `w` para abrir a versão web no navegador.

O computador e o celular devem estar na mesma rede quando o projeto for aberto pelo Expo Go. Como alternativa, a versão web pode ser iniciada diretamente com:

```bash
npm run web
```

Para conferir os tipos TypeScript:

```bash
npm run typecheck
```

## Comportamento esperado

1. Na primeira abertura, o aplicativo mostra exemplos de ocorrências pendentes e resolvidas.
2. Na aba **Pendentes**, toque no botão **+** para abrir o cadastro.
3. Preencha o título, a descrição e o local e selecione o risco **Baixo**, **Médio** ou **Alto**.
4. Toque em **ADICIONAR**. A nova ocorrência será salva e aparecerá no início da lista.
5. Na lista, confira o título, a descrição, o local, a data e a classificação de risco.
6. Toque em **Ver detalhes** para abrir o registro completo.
7. Volte para a lista, feche o aplicativo e abra novamente — ou recarregue a página, na versão web. A ocorrência cadastrada deve continuar disponível.
8. O botão de confirmação marca uma ocorrência como resolvida e a move para a aba **Resolvidas**. O botão de lixeira exclui o registro. Essas alterações também são persistidas.

## Classificação de risco

O risco é selecionado manualmente no cadastro e aparece tanto no cartão da lista quanto na tela de detalhe:

- **Baixo** — situação controlada, sem risco imediato;
- **Médio** — requer atenção e monitoramento;
- **Alto** — perigo imediato, com necessidade de intervenção urgente.

Cada nível possui cor própria para facilitar a identificação visual. O aplicativo não calcula o risco automaticamente.

## Tipo `Ocorrencia`

O tipo principal está definido em `src/types/index.ts`:

```ts
export type Ocorrencia = {
  id: number;
  descricao: string;
  local: string;
  risco: 'baixo' | 'medio' | 'alto';
  data: string;
  titulo: string;
  resolvida: boolean;
};
```

Esse tipo é usado para manter o mesmo formato de dados em todo o fluxo:

- nos dados iniciais de `src/data/ocorrenciasMock.ts`;
- no estado compartilhado de `src/context/OcorrenciaContext.tsx`;
- na leitura e gravação de `src/services/ocorrenciaStorage.ts`;
- nos cartões, listas, cadastro e detalhe das ocorrências.

O `id` e a `data` são gerados quando a ocorrência é salva. O campo `resolvida` separa os registros pendentes dos concluídos.

## Persistência dos dados

A persistência local é feita com `AsyncStorage` no arquivo `src/services/ocorrenciaStorage.ts`.

A lista de ocorrências é convertida para JSON e salva na chave `@motiva:ocorrencias`. Ao abrir o aplicativo, o conteúdo dessa chave é lido e convertido novamente em uma lista de objetos `Ocorrencia`. Os dados iniciais de `src/data/ocorrenciasMock.ts` são carregados somente quando ainda não existe conteúdo salvo.

O `OcorrenciaContext` concentra as operações de carregar, adicionar, resolver e excluir. As telas usam esse contexto e não acessam o armazenamento diretamente.

Os dados permanecem no aparelho. Na versão web, ficam no armazenamento local do navegador. Desinstalar o aplicativo ou limpar seus dados pode apagar os registros, pois não há sincronização com um servidor.

## Estrutura de pastas

```text
Motiva-Sprint-3/
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
└── src/
    ├── components/
    │   └── OcorrenciaCard.tsx
    ├── context/
    │   └── OcorrenciaContext.tsx
    ├── data/
    │   └── ocorrenciasMock.ts
    ├── navigation/
    │   └── AppNavigator.tsx
    ├── screens/
    │   ├── DetalheOcorrencia.tsx
    │   ├── ListaOcorrencias.tsx
    │   ├── NovaOcorrencia.tsx
    │   └── Resolvidas.tsx
    ├── services/
    │   └── ocorrenciaStorage.ts
    └── types/
        └── index.ts
```

### Responsabilidade de cada pasta

- `components`: componentes reutilizáveis da interface;
- `context`: estado compartilhado e operações sobre as ocorrências;
- `data`: dados de exemplo usados na primeira abertura;
- `navigation`: configuração das abas e das telas;
- `screens`: telas do fluxo principal;
- `services`: leitura e gravação no armazenamento local;
- `types`: tipos TypeScript utilizados pelo projeto.

## Checklist de demonstração

- [ ] Abrir este README e explicar o problema, o usuário e a ação principal.
- [ ] Executar `npm install` e `npx expo start`.
- [ ] Mostrar a lista de ocorrências.
- [ ] Cadastrar uma ocorrência com local, descrição e risco.
- [ ] Mostrar a nova ocorrência na lista e abrir seu detalhe.
- [ ] Recarregar ou reabrir o aplicativo e confirmar que o dado permanece.
- [ ] Encerrar mostrando o fluxo completo funcionando.
- [ ] Confirmar que o vídeo tem no máximo 5 minutos e está como **Não listado**.
