import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import axios from 'axios';

const UpdateProductScreen = ({ route, navigation }) => {
  const { nomeInicial, descricaoInicial, qtdInicial, marcaInicial, precoInicial, validadeInicial } = route.params || {}; 

  const [id, setId] = useState(''); // Campo editável para o ID
  const [nome, setNome] = useState(nomeInicial || '');
  const [descricao, setDescricao] = useState(descricaoInicial || '');
  const [qtd, setQtd] = useState(qtdInicial ? qtdInicial.toString() : '');
  const [marca, setMarca] = useState(marcaInicial || '');
  const [preco, setPreco] = useState(precoInicial ? precoInicial.toString() : '');
  const [validade, setValidade] = useState(validadeInicial || '');

  const handleUpdateProduct = async () => {
    // Validações
    if (!id || !nome || !descricao || !qtd || !marca || !preco || !validade) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    const quantidade = parseInt(qtd, 10);
    const precoValue = parseFloat(preco);
    if (isNaN(quantidade) || quantidade <= 0 || isNaN(precoValue) || precoValue <= 0) {
      Alert.alert('Erro', 'Quantidade e Preço devem ser números válidos e positivos.');
      return;
    }

    const validadeRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!validade.match(validadeRegex)) {
      Alert.alert('Erro', 'Formato de validade inválido. Use YYYY-MM-DD.');
      return;
    }

    try {
      const productData = {
        id,
        nome,
        descricao,
        qtd: quantidade,
        marca,
        preco: precoValue,
        validade,
      };

      console.log('Dados a serem enviados:', productData);
      

     // Requisição Put para atualizar o produto
     const response = await axios.put(`http://localhost/api/Controller/produto.php`, productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Resposta da API:', response.data); // Log da resposta da API

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Produto atualizado com sucesso');
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
      <Text style={styles.title}>Atualizar Produto</Text>
      <TextInput
        placeholder="ID do Produto"
        value={id}
        onChangeText={setId}
        style={styles.input}
        keyboardType="numeric"
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
      <TextInput
        placeholder="Quantidade"
        value={qtd}
        onChangeText={setQtd}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Marca"
        value={marca}
        onChangeText={setMarca}
        style={styles.input}
      />
      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Validade (YYYY-MM-DD)"
        value={validade}
        onChangeText={setValidade}
        style={styles.input}
      />
      <Button title="Atualizar Produto" onPress={handleUpdateProduct} />
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
