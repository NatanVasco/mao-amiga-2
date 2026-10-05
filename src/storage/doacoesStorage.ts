import AsyncStorage from '@react-native-async-storage/async-storage';

import { Doacao } from '../data/Doacao';

const CHAVE_DOACOES = '@mao_amiga:doacoes';

export async function listarDoacoes(): Promise<Doacao[]> {
  const dados = await AsyncStorage.getItem(CHAVE_DOACOES);

  if (!dados) {
    return [];
  }

  try {
    const doacoes = JSON.parse(dados);
    return Array.isArray(doacoes) ? doacoes : [];
  } catch {
    return [];
  }
}

async function salvarLista(doacoes: Doacao[]): Promise<void> {
  await AsyncStorage.setItem(CHAVE_DOACOES, JSON.stringify(doacoes));
}

export async function salvarDoacao(doacao: Doacao): Promise<void> {
  const doacoes = await listarDoacoes();
  await salvarLista([...doacoes, doacao]);
}

export async function excluirDoacao(id: string): Promise<void> {
  const doacoes = await listarDoacoes();
  await salvarLista(doacoes.filter((doacao) => doacao.id !== id));
}

export async function atualizarDoacao(doacao: Doacao): Promise<void> {
  const doacoes = await listarDoacoes();
  const atualizadas = doacoes.map((item) =>
    item.id === doacao.id ? doacao : item
  );
  await salvarLista(atualizadas);
}
