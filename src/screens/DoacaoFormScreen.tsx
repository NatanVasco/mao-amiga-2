import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Doacao } from '../data/Doacao';
import { pontos } from '../data/Ponto';
import { atualizarDoacao, salvarDoacao } from '../storage/doacoesStorage';

export default function DoacaoFormScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const doacaoEditar: Doacao | undefined = route.params?.doacao;
  const editando = Boolean(doacaoEditar);

  const [tipoItem, setTipoItem] = useState(doacaoEditar?.tipoItem ?? '');
  const [quantidade, setQuantidade] = useState(
    doacaoEditar ? String(doacaoEditar.quantidade) : ''
  );
  const [pontoDestino, setPontoDestino] = useState(
    doacaoEditar?.pontoDestino ?? ''
  );

  useEffect(() => {
    navigation.setOptions({
      title: editando ? 'Editar doação' : 'Nova doação',
    });
  }, [navigation, editando]);

  function validar(): boolean {
    if (!tipoItem.trim()) {
      Alert.alert('Atenção', 'Informe o tipo de item.');
      return false;
    }

    const qtd = Number(quantidade);
    if (!Number.isInteger(qtd) || qtd <= 0) {
      Alert.alert('Atenção', 'Informe uma quantidade inteira maior que zero.');
      return false;
    }

    if (!pontoDestino.trim()) {
      Alert.alert('Atenção', 'Informe o ponto de destino.');
      return false;
    }

    return true;
  }

  async function salvar() {
    if (!validar()) return;

    const agora = doacaoEditar?.criadoEm ?? new Date().toISOString();
    const doacao: Doacao = {
      id: doacaoEditar?.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      tipoItem: tipoItem.trim(),
      quantidade: Number(quantidade),
      pontoDestino: pontoDestino.trim(),
      criadoEm: agora,
    };

    try {
      if (editando) {
        await atualizarDoacao(doacao);
      } else {
        await salvarDoacao(doacao);
      }

      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a doação.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>
          {editando ? 'Editar doação' : 'Registrar doação'}
        </Text>

        <Text style={styles.label}>Tipo de item</Text>
        <TextInput
          value={tipoItem}
          onChangeText={setTipoItem}
          placeholder="Ex.: roupas"
          style={styles.input}
          maxLength={60}
        />

        <Text style={styles.label}>Quantidade</Text>
        <TextInput
          value={quantidade}
          onChangeText={setQuantidade}
          placeholder="Ex.: 10"
          keyboardType="number-pad"
          style={styles.input}
        />

        <Text style={styles.label}>Ponto de destino</Text>
        <TextInput
          value={pontoDestino}
          onChangeText={setPontoDestino}
          placeholder="Informe o ponto"
          style={styles.input}
          maxLength={100}
        />

        <View style={styles.sugestoes}>
          {pontos.map((ponto) => (
            <TouchableOpacity
              key={ponto.id}
              style={[
                styles.sugestao,
                pontoDestino === ponto.nome && styles.sugestaoSelecionada,
              ]}
              onPress={() => setPontoDestino(ponto.nome)}
            >
              <Text
                style={[
                  styles.sugestaoTexto,
                  pontoDestino === ponto.nome && styles.sugestaoTextoSelecionada,
                ]}
              >
                {ponto.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.acoes}>
          <TouchableOpacity
            style={styles.botaoSecundario}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.textoSecundario}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoPrincipal} onPress={salvar}>
            <Text style={styles.textoPrincipal}>
              {editando ? 'Salvar alterações' : 'Registrar doação'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    padding: 20,
    backgroundColor: '#F7F9F8',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1B3A5C',
    marginBottom: 22,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B3A5C',
    marginBottom: 7,
    marginTop: 12,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#344054',
  },
  sugestoes: {
    marginTop: 10,
    gap: 8,
  },
  sugestao: {
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E7EC',
    justifyContent: 'center',
  },
  sugestaoSelecionada: {
    borderColor: '#2E7D32',
    backgroundColor: '#EEF7EF',
  },
  sugestaoTexto: {
    fontSize: 13,
    color: '#667085',
  },
  sugestaoTextoSelecionada: {
    color: '#2E7D32',
    fontWeight: '700',
  },
  acoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 28,
    paddingBottom: 24,
  },
  botaoSecundario: {
    flex: 1,
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  textoSecundario: {
    color: '#344054',
    fontWeight: '700',
  },
  botaoPrincipal: {
    flex: 1,
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  textoPrincipal: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
  },
});
