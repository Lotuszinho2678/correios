import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsScreen from './src/ProductsScreen';// Importando a tela do Get
import AddProductScreen from './src/AddProductScreen';// Importando a tela do Post
import produtoPut from './src/produtoPut'; // Importando a tela do PUT
import produtoPatch from './src/produtoPatch'; // Importando a tela do Patch
import produtoDelete from './src/produtoDelete';   // Importando a tela de delete

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductsScreen">
        <Stack.Screen
          name="ProductsScreen"
          component={ProductsScreen}
          options={{ title: 'Produtos' }}
        />
        <Stack.Screen
          name="AddProductScreen"
          component={AddProductScreen}
          options={{ title: 'Adicionar Produto' }}
        />
        <Stack.Screen
          name="produtoPut"
          component={produtoPut}
          options={{ title: 'Atualizar Produto' }}
        />
        <Stack.Screen
          name="produtoPatch"
          component={produtoPatch}
          options={{ title: 'Atualizar Produto parcialmente' }}
        />
        <Stack.Screen
          name="produtoDelete"
          component={produtoDelete}
          options={{ title: 'Deletar Produto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
