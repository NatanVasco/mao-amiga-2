import { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Produto } from '../data/Product';

type Props = {
  produto: Produto;
};

export default function ProdutoItem({ produto }: Props) {
  const [quantidade, setQuantidade] = useState(0);

  function aumentar() {
    if (quantidade < produto.estoque) {
      setQuantidade(quantidade + 1);
    }
  }

  function diminuir() {
    if (quantidade > 0) {
      setQuantidade(quantidade - 1);
    }
  }

  const estoqueBaixo = produto.estoque <= 5;

  return (
    <View style={styles.card}>

      <View style={styles.imagemContainer}>
        <Image
          source={produto.imagem}
          style={styles.imagem}
        />
      </View>

      <View style={styles.conteudo}>

        <Text style={styles.nome} numberOfLines={2}>
          {produto.nome}
        </Text>

        <Text style={styles.preco}>
          R$ {produto.preco.toFixed(2).replace('.', ',')}
        </Text>

        <View style={styles.linhaEstoque}>
          <View
            style={[
              styles.indicador,
              estoqueBaixo && styles.indicadorBaixo,
            ]}
          />

          <Text
            style={[
              styles.estoque,
              estoqueBaixo && styles.estoqueBaixo,
            ]}
          >
            {estoqueBaixo
              ? `Últimas ${produto.estoque} unidades`
              : `${produto.estoque} unidades disponíveis`}
          </Text>
        </View>

        <View style={styles.linhaInferior}>

          <Text style={styles.selecionado}>
            {quantidade} selecionado{quantidade !== 1 ? 's' : ''}
          </Text>

          <View style={styles.controles}>

            <TouchableOpacity
              style={[
                styles.botao,
                quantidade === 0 && styles.botaoDesabilitado,
              ]}
              onPress={diminuir}
              disabled={quantidade === 0}
            >
              <Text
                style={[
                  styles.botaoTexto,
                  quantidade === 0 && styles.botaoTextoDesabilitado,
                ]}
              >
                −
              </Text>
            </TouchableOpacity>

            <Text style={styles.quantidade}>
              {quantidade}
            </Text>

            <TouchableOpacity
              style={[
                styles.botao,
                quantidade >= produto.estoque &&
                  styles.botaoDesabilitado,
              ]}
              onPress={aumentar}
              disabled={quantidade >= produto.estoque}
            >
              <Text
                style={[
                  styles.botaoTexto,
                  quantidade >= produto.estoque &&
                    styles.botaoTextoDesabilitado,
                ]}
              >
                +
              </Text>
            </TouchableOpacity>

          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,

    shadowColor: '#1B3A5C',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 4,
  },

  imagemContainer: {
    width: 112,
    height: 128,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F1F4F6',
  },

  imagem: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  conteudo: {
    flex: 1,
    marginLeft: 14,
    paddingVertical: 2,
    justifyContent: 'space-between',
  },

  nome: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1B3A5C',
    lineHeight: 22,
  },

  preco: {
    fontSize: 19,
    fontWeight: '800',
    color: '#2E7D32',
    marginTop: 5,
  },

  linhaEstoque: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },

  indicador: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#43A047',
    marginRight: 6,
  },

  indicadorBaixo: {
    backgroundColor: '#E67E22',
  },

  estoque: {
    fontSize: 12,
    color: '#667085',
  },

  estoqueBaixo: {
    color: '#C96A16',
    fontWeight: '600',
  },

  linhaInferior: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  selecionado: {
    fontSize: 12,
    color: '#98A2B3',
    flex: 1,
  },

  controles: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F7F4',
    borderRadius: 12,
    padding: 3,
  },

  botao: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoDesabilitado: {
    backgroundColor: '#E4E7EC',
  },

  botaoTexto: {
    fontSize: 20,
    lineHeight: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  botaoTextoDesabilitado: {
    color: '#98A2B3',
  },

  quantidade: {
    minWidth: 28,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: '#1B3A5C',
  },
});