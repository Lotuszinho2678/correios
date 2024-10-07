import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const Excluirproduto = ({ route, navigation }) => {
  const { idInicial } = route.params || {}; // Captura o ID inicial da rota, se existir

  const [id, setId] = useState(idInicial || ''); // Define o estado para o ID

  const handleDeleteProduct = async () => {
    // Verifica se o ID foi fornecido
    if (!id) {
      Alert.alert('Erro', 'ID do produto não fornecido.');
      return;
    }

    try {
      console.log('ID do produto a ser excluído:', id);

      // Requisição DELETE para apagar o produto, enviando o ID no corpo da requisição
      const response = await axios.delete('http://localhost/api/Controller/produto.php', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          id: id, // Passa o ID no corpo da requisição
        },
      });

      console.log('Resposta da API:', response.data); // Log da resposta da API

      if (response.status === 200 || response.status === 204) {
        Alert.alert('Sucesso', 'Produto excluído com sucesso');
        navigation.navigate('ProductsScreen'); // Navega de volta para a lista de produtos
      } else {
        Alert.alert('Erro', response.data?.msg || 'Erro ao excluir produto.');
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error.response ? error.response.data : error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar excluir o produto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Excluir Produto</Text>
      <TextInput
        placeholder="ID do Produto"
        value={id}
        onChangeText={setId}
        style={styles.input}
        keyboardType="numeric" 
        editable={true}
      />
      <Button title="Excluir Produto" onPress={handleDeleteProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
});

export default Excluirproduto;
