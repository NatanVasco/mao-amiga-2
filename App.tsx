import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PontosScreen from './src/screens/PontosScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import DoacaoFormScreen from './src/screens/DoacaoFormScreen';
import HistoricoDoacoesScreen from './src/screens/HistoricoDoacoesScreen';
import DetalheDoacaoScreen from './src/screens/DetalheDoacaoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Pontos"
          component={PontosScreen}
          options={{ title: 'Pontos de Apoio' }}
        />

        <Stack.Screen
          name="Descrição"
          component={ProductDetailsScreen}
          options={{ title: 'Detalhes do ponto' }}
        />

        <Stack.Screen
          name="NovaDoacao"
          component={DoacaoFormScreen}
          options={{ title: 'Nova doação' }}
        />

        <Stack.Screen
          name="HistoricoDoacoes"
          component={HistoricoDoacoesScreen}
          options={{ title: 'Minhas doações' }}
        />

        <Stack.Screen
          name="DetalheDoacao"
          component={DetalheDoacaoScreen}
          options={{ title: 'Detalhe da doação' }}
        />

        <Stack.Screen
          name="EditarDoacao"
          component={DoacaoFormScreen}
          options={{ title: 'Editar doação' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
