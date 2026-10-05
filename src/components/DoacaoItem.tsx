import { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Doacao } from '../data/Doacao';

type Props = {
  doacao: Doacao;
  onPress: () => void;
};

function formatarData(data: string): string {
  return new Date(data).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

function DoacaoItem({ doacao, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.conteudo}>
        <Text style={styles.tipo}>{doacao.tipoItem}</Text>
        <Text style={styles.detalhe}>
          {doacao.quantidade} unidade{doacao.quantidade !== 1 ? 's' : ''}
        </Text>
        <Text style={styles.ponto} numberOfLines={2}>
          {doacao.pontoDestino}
        </Text>
        <Text style={styles.data}>{formatarData(doacao.criadoEm)}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default memo(DoacaoItem);

const styles = StyleSheet.create({
  card: {
    minHeight: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#1B3A5C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
  },
  conteudo: { gap: 4 },
  tipo: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1B3A5C',
    textTransform: 'capitalize',
  },
  detalhe: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2E7D32',
  },
  ponto: {
    fontSize: 13,
    color: '#667085',
  },
  data: {
    fontSize: 12,
    color: '#98A2B3',
    marginTop: 3,
  },
});
