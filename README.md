# Instituto Mão Amiga

Aplicativo desenvolvido para facilitar a localização de pontos de coleta e distribuição de doações.

## Histórico de doações — Issues #08 a #14

O aplicativo agora mantém um histórico local de doações usando `AsyncStorage`. O acesso ao armazenamento fica concentrado em `src/storage/doacoesStorage.ts`.

### Funcionalidades

- Registrar várias doações sem sobrescrever as anteriores.
- Gerar `id` único e `criadoEm` para cada registro.
- Visualizar todas as doações em uma `FlatList`.
- Abrir o detalhe de uma doação.
- Editar uma doação reutilizando o formulário de cadastro.
- Excluir uma doação com confirmação.
- Filtrar o histórico pelo tipo de item enquanto digita.
- Mostrar resumo com total de doações e quantidade por tipo.
- Persistir os dados mesmo depois de fechar e reabrir o aplicativo.
- Tratar estado vazio e teclado no formulário/busca.

## Roteiro de demonstração — até 3 minutos

1. Abrir o aplicativo e tocar em **Registrar doação**.
2. Informar tipo de item, quantidade e ponto de destino e salvar.
3. Repetir o cadastro para demonstrar que várias doações ficam armazenadas.
4. Abrir **Minhas doações** e mostrar o histórico e o resumo por tipo.
5. Digitar um tipo no campo de busca e mostrar o filtro.
6. Tocar em uma doação para abrir o detalhe.
7. Tocar em **Editar doação**, alterar a quantidade e salvar.
8. Voltar ao detalhe/histórico e mostrar os valores atualizados.
9. Abrir novamente uma doação e usar **Excluir doação**, confirmando a exclusão.
10. Fechar o app de verdade e reabrir para demonstrar que os registros restantes continuam salvos.

## Decisão técnica

Os totais não são salvos separadamente. Eles são calculados a partir do array completo de doações a cada renderização. Assim, ao registrar, editar ou excluir uma doação, o resumo é derivado automaticamente dos dados atuais e não existe uma segunda fonte de dados que possa ficar inconsistente.

O acesso ao `AsyncStorage` foi centralizado em `src/storage/doacoesStorage.ts`. As telas chamam `listarDoacoes`, `salvarDoacao`, `atualizarDoacao` e `excluirDoacao`, em vez de acessar o armazenamento diretamente.

## Instalação

Depois de baixar/clonar o projeto:

```bash
npm install
npx expo start
```

A dependência `@react-native-async-storage/async-storage` está declarada no `package.json`.
