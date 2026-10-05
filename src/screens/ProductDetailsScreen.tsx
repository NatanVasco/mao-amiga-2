import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function ProductDetailsScreen({ route }: any) {
  const { ponto } = route.params;

  return (
    <View style={styles.container}>

      <Text style={styles.nome}>
        {ponto.nome}
      </Text>

      <View style={styles.caixa}>

        <Text style={styles.titulo}>
          Endereço
        </Text>

        <Text style={styles.texto}>
          {ponto.endereco}
        </Text>

      </View>

      <View style={styles.caixa}>

        <Text style={styles.titulo}>
          Dias e horários
        </Text>

        <Text style={styles.texto}>
          {ponto.dias}
        </Text>

        <Text style={styles.texto}>
          {ponto.horario}
        </Text>

      </View>

      <View style={styles.caixa}>

        <Text style={styles.titulo}>
          O que recebe
        </Text>

        <Text style={styles.texto}>
          {ponto.recebe}
        </Text>

      </View>

      <View style={styles.caixa}>

        <Text style={styles.titulo}>
          O que distribui
        </Text>

        <Text style={styles.texto}>
          {ponto.distribui}
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    padding: 20,
  },

  nome: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1B3A5C',
    marginTop: 18,
    marginBottom: 12,
  },

  caixa: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },

  titulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B3A5C',
    marginBottom: 5,
  },

  texto: {
    fontSize: 14,
    lineHeight: 21,
    color: '#667085',
  },
});