import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CepScreen from './src/CepScreen';
import ProductsScreen from './src/ProductsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CepScreen">
        <Stack.Screen name="CepScreen" component={CepScreen} options={{ title: 'Consulta CEP' }} />
        <Stack.Screen name="ProductsScreen" component={ProductsScreen} options={{ title: 'Produtos' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
