import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Doacao } from '../data/Doacao';
import { excluirDoacao } from '../storage/doacoesStorage';

function formatarData(data: string): string {
  return new Date(data).toLocaleString('pt-BR', {
    dateStyle: 'full',
    timeStyle: 'short',
  });
}

export default function DetalheDoacaoScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const doacao: Doacao = route.params.doacao;

  async function excluir() {
    try {
      await excluirDoacao(doacao.id);
      navigation.goBack();
    } catch {
      if (Platform.OS === 'web') {
        window.alert('Não foi possível excluir a doação.');
      } else {
        Alert.alert('Erro', 'Não foi possível excluir a doação.');
      }
    }
  }

  function confirmarExclusao() {
    // No navegador, usamos confirm() porque o Alert.alert do React Native
    // pode não disparar corretamente o callback dos botões em algumas
    // versões do React Native Web.
    if (Platform.OS === 'web') {
      const confirmou = window.confirm(
        'Tem certeza que deseja excluir esta doação?'
      );

      if (confirmou) {
        void excluir();
      }

      return;
    }

    Alert.alert(
      'Excluir doação',
      'Tem certeza que deseja excluir esta doação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            void excluir();
          },
        },
      ]
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{doacao.tipoItem}</Text>

      <View style={styles.caixa}>
        <Text style={styles.rotulo}>Quantidade</Text>
        <Text style={styles.valor}>{doacao.quantidade}</Text>
      </View>

      <View style={styles.caixa}>
        <Text style={styles.rotulo}>Ponto de destino</Text>
        <Text style={styles.valor}>{doacao.pontoDestino}</Text>
      </View>

      <View style={styles.caixa}>
        <Text style={styles.rotulo}>Data do registro</Text>
        <Text style={styles.valor}>{formatarData(doacao.criadoEm)}</Text>
      </View>

      <TouchableOpacity
        style={styles.editar}
        onPress={() => navigation.navigate('EditarDoacao', { doacao })}
      >
        <Text style={styles.editarTexto}>Editar doação</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.excluir} onPress={confirmarExclusao}>
        <Text style={styles.excluirTexto}>Excluir doação</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F7F9F8',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1B3A5C',
    marginBottom: 18,
    textTransform: 'capitalize',
  },
  caixa: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    marginBottom: 10,
  },
  rotulo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#667085',
    marginBottom: 5,
  },
  valor: {
    fontSize: 16,
    color: '#1B3A5C',
    lineHeight: 22,
  },
  editar: {
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  editarTexto: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  excluir: {
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D92D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  excluirTexto: {
    color: '#D92D20',
    fontWeight: '800',
  },
});
