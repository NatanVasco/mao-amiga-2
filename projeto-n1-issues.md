# Projeto da Semana (N1): Histórico de Doações do Instituto Mão Amiga

**Período:** 29/09 a 05/10/2026 (terça a segunda)
**Projeto:** o mesmo app do Instituto Mão Amiga que você já vem construindo, individual
**Prazo final de todas as issues:** início da Aula 28/09, segunda 05/10, 18h30

## Como funciona (texto para os alunos)

Até então o app guarda só a última doação registrada (Issue #07). Nesta semana ele passa a guardar todas: um histórico que dá para ver, filtrar, editar e excluir. São 7 issues, uma por dia sugerido, e cada uma depende da anterior. Só usamos o que já vimos: navegação, `FlatList`, formulário com validação, layout responsivo e AsyncStorage.

Abra as 7 issues no seu repositório pessoal **na ordem, de #08 a #14**, para os números baterem com este texto. Os commits de cada issue referenciam o número dela (`refs #08`, `refs #09` e assim por diante). Feche cada issue quando os critérios de aceite forem atendidos.

O ritmo abaixo é uma sugestão para você não deixar tudo para o último dia. O que vale é o prazo final.

| Issue | Dia sugerido | Tema |
|---|---|---|
| #08 | terça 29/09 | Histórico de doações salvo no aparelho |
| #09 | quarta 30/09 | Tela de histórico com `FlatList` |
| #10 | quinta 01/10 | Detalhe da doação e exclusão |
| #11 | sexta 02/10 | Editar uma doação |
| #12 | sábado 03/10 | Filtro por tipo de item |
| #13 | domingo 04/10 | Resumo com totais por tipo |
| #14 | segunda 05/10 | Acabamento e roteiro de demonstração |

Cada doação passa a ter este formato:

```js
{ id, tipoItem, quantidade, pontoDestino, criadoEm }
```

---

## Issue #08: Histórico de doações salvo no aparelho

**Contexto:** Hoje o app guarda só a última doação. Cada novo cadastro apaga a anterior, então não existe histórico.

**Objetivo:** Guardar todas as doações registradas, num array em AsyncStorage, com todo o acesso ao armazenamento concentrado num único arquivo (por exemplo `doacoesStorage.js`) que oferece pelo menos `listarDoacoes()` e `salvarDoacao(doacao)`.

**Cenários / Critérios de aceite:**
- Cada doação registrada é acrescentada ao array, sem sobrescrever as anteriores.
- Cada doação tem um `id` único e um `criadoEm` (data e hora do registro).
- Registrar 3 ou mais doações, fechar o app de verdade e reabrir mantém todas elas.
- Nenhuma tela chama o AsyncStorage diretamente para doações: tudo passa pelo arquivo de acesso.

**Fora de escopo:** Telas novas (Issue #09), editar e excluir (Issues #10 e #11).

**Issue no GitHub:** abra a Issue #08 no seu repositório pessoal, com o texto acima; os commits referenciam `refs #08`.

---

## Issue #09: Tela de histórico com `FlatList`

**Contexto:** Com o histórico salvo, falta uma tela para o usuário ver o que já registrou.

**Objetivo:** Criar a tela "Minhas doações", acessível a partir do app, listando todas as doações salvas.

**Cenários / Critérios de aceite:**
- Existe um caminho de navegação até a tela (um botão na tela inicial ou na lista de pontos, por exemplo).
- A lista usa `FlatList` com `keyExtractor` baseado no `id`.
- O item da lista é um componente separado, com `React.memo`, mostrando tipo, quantidade, ponto de destino e data.
- Sem nenhuma doação, a tela mostra uma mensagem de estado vazio, com um botão que leva ao cadastro.
- Ao registrar uma doação nova e voltar ao histórico, ela aparece sem fechar o app.

**Fora de escopo:** Detalhe, edição, exclusão e filtro (Issues seguintes).

**Issue no GitHub:** abra a Issue #09 no seu repositório pessoal, com o texto acima; os commits referenciam `refs #09`.

---

## Issue #10: Detalhe da doação e exclusão

**Contexto:** O histórico mostra o resumo de cada doação. Falta abrir uma doação e poder apagar as que foram registradas por engano.

**Objetivo:** Ao tocar num item do histórico, abrir a tela de detalhe daquela doação, com opção de excluir.

**Cenários / Critérios de aceite:**
- O detalhe recebe a doação por `route.params` e mostra todos os campos, incluindo a data formatada de forma legível.
- O botão de excluir pede confirmação (`Alert.alert`, com as opções Cancelar e Excluir).
- Cancelar não apaga nada.
- Confirmar apaga a doação do AsyncStorage (uma função `excluirDoacao(id)` no arquivo de acesso), volta ao histórico e a doação some da lista sem fechar o app.

**Fora de escopo:** Editar a doação (Issue #11).

**Issue no GitHub:** abra a Issue #10 no seu repositório pessoal, com o texto acima; os commits referenciam `refs #10`.

---

## Issue #11: Editar uma doação

**Contexto:** Quem registra uma quantidade errada hoje só consegue excluir e cadastrar de novo.

**Objetivo:** Permitir editar uma doação existente, reaproveitando o formulário de cadastro.

**Cenários / Critérios de aceite:**
- A tela de detalhe tem um botão de editar, que abre o mesmo formulário do cadastro já preenchido com os dados da doação. Não vale copiar o formulário para uma segunda tela.
- As validações são as mesmas do cadastro (Issue #05).
- Salvar atualiza a doação existente (mesmo `id`, sem duplicar) por uma função `atualizarDoacao(doacao)` no arquivo de acesso.
- O título da tela deixa claro que é uma edição, e cancelar volta sem alterar nada.
- Depois de salvar, o detalhe e o histórico mostram os valores novos.

**Fora de escopo:** Histórico de alterações.

**Issue no GitHub:** abra a Issue #11 no seu repositório pessoal, com o texto acima; os commits referenciam `refs #11`.

---

## Issue #12: Filtro por tipo de item

**Contexto:** Com muitas doações registradas, achar todas de um mesmo tipo (por exemplo, "roupa") fica trabalhoso.

**Objetivo:** Adicionar um campo de busca no topo do histórico que filtra as doações pelo tipo de item enquanto o usuário digita.

**Cenários / Critérios de aceite:**
- O filtro considera se o tipo de item contém o texto digitado, sem diferenciar maiúsculas de minúsculas.
- Apagar o texto mostra todas as doações de novo.
- Sem nenhum resultado, aparece uma mensagem que cita o texto buscado.
- O texto digitado é um estado; a lista filtrada é calculada a partir dele e do array completo, sem guardar uma segunda cópia da lista em outro estado.
- O filtro não altera nada do que está salvo.
- O teclado aberto não cobre a lista nem o campo.

**Fora de escopo:** Filtros combinados (por data, por ponto de destino).

**Issue no GitHub:** abra a Issue #12 no seu repositório pessoal, com o texto acima; os commits referenciam `refs #12`.

---

## Issue #13: Resumo com totais por tipo

**Contexto:** O Instituto quer saber rapidamente quanto já foi doado de cada tipo de item, sem contar na mão.

**Objetivo:** Mostrar, no topo da tela de histórico (ou na tela inicial), um resumo com o total de doações e a quantidade somada por tipo de item, por exemplo "Roupa: 15 unidades em 3 doações".

**Cenários / Critérios de aceite:**
- Os totais são calculados a partir do array de doações a cada renderização, sem serem salvos à parte.
- O resumo se atualiza ao registrar, editar ou excluir uma doação.
- Os tipos aparecem ordenados do que tem maior quantidade para o menor.
- Sem doações, o resumo mostra um estado adequado, sem quebrar a tela.

**Fora de escopo:** Gráficos.

**Issue no GitHub:** abra a Issue #13 no seu repositório pessoal, com o texto acima; os commits referenciam `refs #13`.

---

## Issue #14: Acabamento e roteiro de demonstração

**Contexto:** Na segunda, 05/10, você apresenta e defende o app. Antes disso, é hora de revisar tudo o que foi feito na semana.

**Objetivo:** Testar as telas novas em condições diferentes e preparar o roteiro de uma demonstração de até 3 minutos.

**Cenários / Critérios de aceite:**
- As telas de histórico, detalhe e edição foram testadas em pelo menos 2 tamanhos de tela diferentes, sem texto cortado, elemento sobreposto ou fora da área visível.
- Todo elemento tocável tem pelo menos 44x44 pixels.
- Nenhum campo (formulário de edição, busca) fica coberto pelo teclado.
- O repositório tem um roteiro de demonstração curto (no `README` ou num arquivo à parte) com os passos: registrar, ver o histórico, filtrar, editar, excluir, fechar e reabrir o app.
- Você consegue explicar em voz alta uma decisão técnica da semana (por exemplo, por que os totais são calculados e não salvos, ou por que o acesso ao armazenamento ficou num arquivo só).

**Fora de escopo:** Funcionalidades novas.

**Issue no GitHub:** abra a Issue #14 no seu repositório pessoal, com o texto acima; os commits referenciam `refs #14`.
