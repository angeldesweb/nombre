import React , { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export const Inicio = () => {
    const [nombreStorage, guardarNombreStorage] = useState('');

    // Hook para redireccionar
    const navigation = useNavigation();

    const obtenerDatosStorage = async () => {
        try {
            const nombre = await AsyncStorage.getItem('nombre');
            guardarNombreStorage(nombre)
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarDatos = async () => {
        try {
            await AsyncStorage.removeItem('nombre');
            navigation.navigate('Nombre');
            guardarNombreStorage('')
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtenerDatosStorage();
    });

    return (
        <View style={styles.contenedor}>
            <Text style={styles.input}> ¡Bienvenido(a): {nombreStorage} !</Text>
            <TouchableOpacity
                //style={styles.boton}
                onPress={() => eliminarDatos()}
            >
                <Text style={{ color: 'red' }}>Cancelar</Text>
            </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        color: '#000',
        fontSize: 24
    },
});