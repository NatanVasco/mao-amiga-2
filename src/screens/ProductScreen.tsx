import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { produtos } from '../data/Product';

export default function ProdutosScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Produtos
      </Text>

      <Text style={styles.subtitulo}>
        Instituto Mão Amiga
      </Text>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
       navigation.navigate('Descrição', {
        produto: item,
      })
    }
  >

    <Image
      source={item.imagem}
      style={styles.imagem}
    />

    <View style={styles.info}>

      <Text style={styles.nome}>
        {item.nome}
      </Text>

      <Text style={styles.preco}>
        R$ {item.preco.toFixed(2).replace('.', ',')}
      </Text>

      <Text style={styles.estoque}>
        {item.estoque} unidades disponíveis
      </Text>

    </View>

  </TouchableOpacity>
)}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
    padding: 20,
  },

  titulo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1B3A5C',
    marginTop: 40,
  },

  subtitulo: {
    fontSize: 15,
    color: '#2E7D32',
    marginBottom: 25,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    marginBottom: 15,

    elevation: 4,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  imagem: {
    width: 100,
    height: 100,
    borderRadius: 14,
  },

  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },

  nome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B3A5C',
  },

  preco: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2E7D32',
    marginTop: 6,
  },

  estoque: {
    fontSize: 13,
    color: '#667085',
    marginTop: 6,
  },
});