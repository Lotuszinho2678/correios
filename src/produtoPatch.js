import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const UpdateProductScreen = ({ route, navigation }) => {
  const { idInicial, nomeInicial, descricaoInicial } = route.params || {}; 

  const [id, setId] = useState(idInicial || '');
  const [nome, setNome] = useState(nomeInicial || '');
  const [descricao, setDescricao] = useState(descricaoInicial || '');

  const handleUpdateProduct = async () => {
    // Validações
    if (!id || !nome || !descricao) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    try {
      const productData = {
        id,
        nome,
        descricao,
      };

      console.log('Dados a serem enviados:', productData);

      // Requisição PATCH para atualizar o produto
      const response = await axios.patch(`http://localhost/api/Controller/produto.php`, productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Resposta da API:', response.data); // Log da resposta da API

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Produto atualizado Palcial com sucesso');
        navigation.navigate('ProductsScreen');
      } else {
        Alert.alert('Erro', response.data?.msg || 'Erro ao atualizar produto.');
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error.response ? error.response.data : error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar atualizar o produto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar Produto parcialmente</Text>
      <TextInput
        placeholder="ID do Produto"
        value={id}
        onChangeText={setId}
        style={styles.input}
        keyboardType="numeric"
        editable={true} 
      />
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />
      <Button title="Atualizar Produto parcialmente" onPress={handleUpdateProduct} />
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

export default UpdateProductScreen;
