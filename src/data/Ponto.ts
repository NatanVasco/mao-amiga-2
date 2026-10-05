import type { ImageSourcePropType } from 'react-native';

export type Ponto = {
id: string;
nome: string;
endereco: string;
dias: string;
horario: string;
recebe: string;
distribui: string;
imagem: ImageSourcePropType;
};

export const pontos: Ponto[] = [
{
id: '1',
nome: 'Instituto Mão Amiga - Centro',
endereco: 'Rua 4, nº 250, Setor Central, Goiânia - GO',
dias: 'Segunda a sexta',
horario: '08:00 às 17:00',
recebe: 'Alimentos, roupas e produtos de higiene',
distribui: 'Cestas básicas e roupas',
imagem: require('../../assets/product/cesta-basica.png'),
},

{
id: '2',
nome: 'Ponto Mão Amiga - Campinas',
endereco: 'Avenida Anhanguera, nº 1850, Campinas, Goiânia - GO',
dias: 'Terça e quinta',
horario: '09:00 às 16:00',
recebe: 'Alimentos não perecíveis e roupas',
distribui: 'Alimentos e kits de higiene',
imagem: require('../../assets/product/cesta-basica.png'),
},

{
id: '3',
nome: 'Ponto Mão Amiga - Setor Oeste',
endereco: 'Rua 15, nº 780, Setor Oeste, Goiânia - GO',
dias: 'Segunda, quarta e sexta',
horario: '08:30 às 17:30',
recebe: 'Roupas, calçados e alimentos',
distribui: 'Roupas e calçados',
imagem: require('../../assets/product/roupas.png'),
},

{
id: '4',
nome: 'Ponto Mão Amiga - Jardim América',
endereco: 'Avenida T-9, nº 1200, Jardim América, Goiânia - GO',
dias: 'Segunda a sábado',
horario: '09:00 às 18:00',
recebe: 'Alimentos e produtos de higiene',
distribui: 'Cestas básicas e kits de higiene',
imagem: require('../../assets/product/cesta-basica.png'),
},

{
id: '5',
nome: 'Ponto Mão Amiga - Vila Nova',
endereco: 'Rua 208, nº 420, Vila Nova, Goiânia - GO',
dias: 'Quarta e sábado',
horario: '08:00 às 14:00',
recebe: 'Roupas e produtos de higiene',
distribui: 'Roupas e kits de higiene',
imagem: require('../../assets/product/kit-higiene.png'),
},

{
id: '6',
nome: 'Ponto Mão Amiga - Setor Bueno',
endereco: 'Avenida T-4, nº 900, Setor Bueno, Goiânia - GO',
dias: 'Terça a sexta',
horario: '10:00 às 18:00',
recebe: 'Alimentos, roupas e calçados',
distribui: 'Cestas básicas e roupas',
imagem: require('../../assets/product/cesta-basica.png'),
},

{
id: '7',
nome: 'Ponto Mão Amiga - Jardim Novo Mundo',
endereco: 'Avenida New York, nº 500, Jardim Novo Mundo, Goiânia - GO',
dias: 'Segunda e quinta',
horario: '08:00 às 16:00',
recebe: 'Alimentos e roupas',
distribui: 'Alimentos e roupas',
imagem: require('../../assets/product/roupas.png'),
},

{
id: '8',
nome: 'Ponto Mão Amiga - Setor Leste',
endereco: 'Rua 227, nº 310, Setor Leste Universitário, Goiânia - GO',
dias: 'Sexta e sábado',
horario: '09:00 às 15:00',
recebe: 'Alimentos e produtos de higiene',
distribui: 'Cestas básicas e kits de higiene',
imagem: require('../../assets/product/kit-higiene.png'),
},
];