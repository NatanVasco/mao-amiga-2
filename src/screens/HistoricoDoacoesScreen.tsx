import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Doacao } from '../data/Doacao';
import DoacaoItem from '../components/DoacaoItem';
import { listarDoacoes } from '../storage/doacoesStorage';

function calcularResumo(doacoes: Doacao[]) {
  const porTipo: Record<string, { quantidade: number; doacoes: number }> = {};

  for (const doacao of doacoes) {
    const chave = doacao.tipoItem.trim().toLowerCase();
    if (!porTipo[chave]) {
      porTipo[chave] = { quantidade: 0, doacoes: 0 };
    }
    porTipo[chave].quantidade += doacao.quantidade;
    porTipo[chave].doacoes += 1;
  }

  return Object.entries(porTipo)
    .map(([tipo, valores]) => ({
      tipo,
      ...valores,
    }))
    .sort((a, b) => b.quantidade - a.quantidade);
}

export default function HistoricoDoacoesScreen() {
  const navigation = useNavigation<any>();
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [busca, setBusca] = useState('');

  const carregar = useCallback(async () => {
    const lista = await listarDoacoes();
    setDoacoes(lista);
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  const filtradas = useMemo(() => {
    const texto = busca.trim().toLowerCase();
    if (!texto) return doacoes;

    return doacoes.filter((doacao) =>
      doacao.tipoItem.toLowerCase().includes(texto)
    );
  }, [doacoes, busca]);

  const resumo = useMemo(() => calcularResumo(doacoes), [doacoes]);
  const totalDoacoes = doacoes.length;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.titulo}>Minhas doações</Text>

        <Text style={styles.subtitulo}>
          {totalDoacoes} doação{totalDoacoes !== 1 ? 'ões' : ''}
          {totalDoacoes ? ` • ${doacoes.reduce((s, d) => s + d.quantidade, 0)} unidades` : ''}
        </Text>

        {resumo.length > 0 ? (
          <View style={styles.resumo}>
            <Text style={styles.resumoTitulo}>Resumo por tipo</Text>
            {resumo.map((item) => (
              <Text key={item.tipo} style={styles.resumoLinha}>
                {item.tipo}: {item.quantidade} unidade{item.quantidade !== 1 ? 's' : ''} em {item.doacoes} doação{item.doacoes !== 1 ? 'ões' : ''}
              </Text>
            ))}
          </View>
        ) : null}

        <TextInput
          value={busca}
          onChangeText={setBusca}
          placeholder="Buscar por tipo de item"
          style={styles.busca}
          returnKeyType="search"
        />

        {doacoes.length === 0 ? (
          <View style={styles.vazio}>
            <Text style={styles.vazioTitulo}>Nenhuma doação registrada</Text>
            <Text style={styles.vazioTexto}>
              Registre sua primeira doação para começar o histórico.
            </Text>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigation.navigate('NovaDoacao')}
            >
              <Text style={styles.botaoTexto}>Cadastrar doação</Text>
            </TouchableOpacity>
          </View>
        ) : filtradas.length === 0 ? (
          <View style={styles.vazio}>
            <Text style={styles.vazioTitulo}>Nenhum resultado</Text>
            <Text style={styles.vazioTexto}>
              Não encontramos doações para "{busca}".
            </Text>
          </View>
        ) : (
          <FlatList
            data={filtradas}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <DoacaoItem
                doacao={item}
                onPress={() =>
                  navigation.navigate('DetalheDoacao', { doacao: item })
                }
              />
            )}
            contentContainerStyle={styles.lista}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1B3A5C',
  },
  subtitulo: {
    color: '#667085',
    marginTop: 4,
    marginBottom: 12,
  },
  resumo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 13,
    marginBottom: 10,
  },
  resumoTitulo: {
    fontWeight: '800',
    color: '#1B3A5C',
    marginBottom: 5,
  },
  resumoLinha: {
    fontSize: 13,
    color: '#667085',
    marginTop: 3,
    textTransform: 'capitalize',
  },
  busca: {
    minHeight: 46,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
    color: '#344054',
  },
  lista: { paddingBottom: 20 },
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  vazioTitulo: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1B3A5C',
    textAlign: 'center',
  },
  vazioTexto: {
    color: '#667085',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  botao: {
    minHeight: 48,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  botaoTexto: { color: '#FFFFFF', fontWeight: '800' },
});
