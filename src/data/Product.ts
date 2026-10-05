export type Produto = {
  id: string;
  nome: string;
  preco: number;
  estoque: number;
  imagem: any;
};

export const produtos: Produto[] = [
  {
    id: '1',
    nome: 'Cesta Básica',
    preco: 80,
    estoque: 10,
    imagem: require('../../assets/product/cesta-basica.png'),
  },
  {
    id: '2',
    nome: 'Kit de Higiene',
    preco: 35,
    estoque: 20,
    imagem: require('../../assets/product/kit-higiene.png'),
  },
  {
    id: '3',
    nome: 'Kit de Roupas',
    preco: 50,
    estoque: 15,
    imagem: require('../../assets/product/roupas.png'),
  },
];