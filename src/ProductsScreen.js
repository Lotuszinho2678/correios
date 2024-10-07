import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Pressable } from 'react-native';
import axios from 'axios';

const ProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost/api/Controller/produto.php/json/');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.nome}</Text>
      <Text><Text style={styles.label}>Descrição:</Text> {item.descricao}</Text>
      <Text><Text style={styles.label}>Quantidade:</Text> {item.qtd}</Text>
      <Text><Text style={styles.label}>Marca:</Text> {item.marca}</Text>
      <Text><Text style={styles.label}>Preço:</Text> R${item.preco}</Text>
      <Text><Text style={styles.label}>Validade:</Text> {item.validade}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Produtos</Text>
      
      {/* Botões usando Pressable */}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('AddProductScreen')}
        role="button" 
      >
        <Text style={styles.buttonText}>Adicionar Produto</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('produtoPut')}
        role="button" 
      >
        <Text style={styles.buttonText}>Atualizar um Produto</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('produtoPatch')}
        role="button" 
      >
        <Text style={styles.buttonText}>Atualizar um Produto parcialmente</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('produtoDelete')}
        role="button"
      >
        <Text style={styles.buttonText}>Deletar um Produto</Text>
      </Pressable>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.cardContainer}
        numColumns={2} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
    textAlign: 'center',
  },
  cardContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    // Remova justifyContent e use apenas padding, o FlatList gerencia isso
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
    width: '48%', // Para garantir que caibam duas colunas
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#007BFF',
  },
  label: {
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 6,
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});


export default ProductsScreen;
