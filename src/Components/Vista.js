import React , { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Vista = () => {
    const [inputTexto, guardarInputTexto] = useState('');
    const [nombreStorage, guardarNombreStorage] = useState('');

    useEffect(() => {
        obtenerDatosStorage();
    }, []);

    const guardarDatos = async () => {
        try {
            await AsyncStorage.setItem('nombre', inputTexto);
            guardarNombreStorage(inputTexto)
        } catch (error) {
            console.log(error);
        }
    }

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
            guardarNombreStorage('')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={styles.contenedor}>
            {nombreStorage ? <Text> ¡Bienvenido(a): {nombreStorage} !</Text> : null}
            <TextInput
                placeholder='Escribe tu nombre'
                style={styles.input}
                onChangeText={texto => guardarInputTexto(texto)}
            />
            <Button
                title='Confirmar'
                color='#333'
                onPress={() => guardarDatos()}

            />
            {nombreStorage ? (
                <TouchableHighlight
                    onPress={() => eliminarDatos()}
                    style={styles.btnEliminar}>
                    <Text style={styles.textoEliminar}>Eliminar Nombre &times;</Text>
                </TouchableHighlight>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        borderColor: '#666',
        borderBottomWidth: 1,
        width: 300,
        height: 40
    },
    btnEliminar: {
        backgroundColor: 'red',
        marginTop: 30,
        padding: 10
    },
    textoEliminar: {
        color: '#fff',
        textAlign: 'center',
        textTransform: 'uppercase',
        width: 300
    }
});
