import React, { useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Nombre } from './src/Components/Nombre';
import { Inicio } from './src/Components/Inicio';

const Stack = createStackNavigator();

const App = () => {
    const [nombreStorage, guardarNombreStorage] = useState('');
    const obtenerDatosStorage = async () => {
        try {
            const nombre = await AsyncStorage.getItem('nombre');
            guardarNombreStorage(nombre)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        obtenerDatosStorage();
    }, []);

    const initialRoute = nombreStorage || 'Nombre';
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={initialRoute}
            >
                <Stack.Screen
                    name="Inicio"
                    component={Inicio}
                />
                <Stack.Screen
                    name="Nombre"
                    component={Nombre}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;