import React , { useState, useEffect, useContext, } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const Nombre = ({route}) => {
    // Hook para redireccionar
    const navigation = useNavigation();
    const [inputTexto, guardarInputTexto] = useState('');

    const guardarDatos = async () => {
        try {
            await AsyncStorage.setItem('nombre', inputTexto);
            //Navegación a donde se almacenan los datos
            navigation.navigate('Inicio');
          
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.contenedor}>

            <View style={styles.cuadro}>

                <Text style={styles.textoInput}>
                    Escribe tu nombre
                </Text>

                <TextInput
                    placeholder='Tú nombre fifi es...'
                    placeholderTextColor={'#4D4D4D'}

                    maxLength={12}
                    style={styles.input}
                    onChangeText={texto => guardarInputTexto(texto)}
                />
            </View>
            <TouchableOpacity
                //style={styles.boton}
                onPress={() => guardarDatos()}
            >
                <Text style={styles.confirmar}>Confirmar</Text>
            </TouchableOpacity>
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
    cuadro: {
        width: 350,
        height: 170,
        alignItems: 'center',
        borderColor: '#FF7A00',
        borderWidth: 4,
        borderRadius: 12
    },
    textoInput: {
        color: '#FF7A00',
        fontSize: 24,
        top: 30
    },
    input: {
        backgroundColor: '#D9D9D9',
        width: 300,
        height: 50,
        color: 'black',
        top: 50,
        borderRadius: 5
    },
    confirmar: {
        backgroundColor: '#FF7A00',
        width: 178,
        height: 40,
        borderRadius: 12,
        top: 40,
        alignSelf: 'center'
    },
});