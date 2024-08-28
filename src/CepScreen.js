import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Alert } from 'react-native';
import axios from 'axios';

const CepScreen = ({ navigation }) => {
    const [cep, setCep] = useState('');
    const [data, setData] = useState(null);

    const fetchAddress = async () => {

        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (response.data.erro) {
                setData(null);
            } else {
                setData(response.data);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Ocorreu um erro ao buscar o CEP. Tente novamente.');
            setData(null);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Consulta CEP</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o CEP"
                value={cep}
                onChangeText={setCep}
                inputMode="numeric"
            />
            <Pressable style={styles.button} onPress={fetchAddress}>
                <Text style={styles.buttonText}>Consultar</Text>
            </Pressable>
            {data && (
                <View style={styles.result}>
                    <Text><Text style={styles.label}>CEP:</Text> {data.cep}</Text>
                    <Text><Text style={styles.label}>Logradouro:</Text> {data.logradouro}</Text>
                    <Text><Text style={styles.label}>Complemento:</Text> {data.complemento}</Text>
                    <Text><Text style={styles.label}>Bairro:</Text> {data.bairro}</Text>
                    <Text><Text style={styles.label}>Localidade:</Text> {data.localidade}</Text>
                    <Text><Text style={styles.label}>UF:</Text> {data.uf}</Text>
                    <Text><Text style={styles.label}>IBGE:</Text> {data.ibge}</Text>
                    <Text><Text style={styles.label}>GIA:</Text> {data.gia}</Text>
                    <Text><Text style={styles.label}>DDD:</Text> {data.ddd}</Text>
                    <Text><Text style={styles.label}>SIAFI:</Text> {data.siafi}</Text>
                </View>
            )}
            <Pressable style={styles.button} onPress={() => navigation.navigate('ProductsScreen')}>
                <Text style={styles.buttonProducts}>Ver Produtos</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    button: {
        marginBottom: 20,
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    buttonProducts: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 8,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    card: {
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    result: {
        marginTop: 10,
        backgroundColor: '#e9ecef',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    resultText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    label: {
        fontWeight: 'bold',
        color: '#007BFF',
    },
});

export default CepScreen;
