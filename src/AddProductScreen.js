import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import axios from 'axios';

const AddProductScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [qtd, setQtd] = useState('');
  const [marca, setMarca] = useState('');
  const [preco, setPreco] = useState('');
  const [validade, setValidade] = useState('');

  const handleAddProduct = async () => {
    // Validações
    if (!nome || !descricao || !qtd || !marca || !preco || !validade) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    // Verifica se quantidade e preço são números
    const quantidade = parseInt(qtd, 10);
    const precoValue = parseFloat(preco);
    if (isNaN(quantidade) || isNaN(precoValue)) {
      Alert.alert('Erro', 'Quantidade e Preço devem ser números válidos.');
      return;
    }

    // Validação do formato da validade (exemplo: YYYY-MM-DD)
    const validadeRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!validade.match(validadeRegex)) {
      Alert.alert('Erro', 'Formato de validade inválido. Use YYYY-MM-DD.');
      return;
    }

    try {
      const productData = {
        nome,
        descricao,
        qtd: quantidade,
        marca,
        preco: precoValue,
        validade,
      };

      console.log('Dados a serem enviados:', productData);

      const response = await axios.post('http://localhost/api/Controller/produto.php', productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Resposta da API:', response.data); // Log da resposta da API
      

      if (response.status === 200) {
        console.log('Produto adicionado:', response.data);
        navigation.navigate('ProductsScreen');
      } else {
        Alert.alert('Erro', response.data.msg || 'Erro ao adicionar produto.');
      }
    } catch (error) {
      console.error('Erro ao adicionar produto:', error.response ? error.response.data : error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar adicionar o produto.'); // Mensagem de erro genérica
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Produto</Text>
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
      <Button title="Adicionar Produto" onPress={handleAddProduct} />
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

export default AddProductScreen;
