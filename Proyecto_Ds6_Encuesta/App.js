/**
 * App.js
 * Punto de entrada de la aplicación. Configura el Stack Navigator de React
 * Navigation con las tres pantallas (Login, Votación y Resultados) y envuelve
 * toda la navegación dentro del VotacionProvider para compartir el estado
 * global de la votación entre pantallas.
 *
 * Autor: Angel Martínez - Cédula: 8-893-602
 * Asignatura: Herramientas Aplicadas IV - UTP
 * Universidad Tecnológica de Panamá
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { VotacionProvider } from './src/context/VotacionContext';
import LoginScreen from './src/screens/LoginScreen';
import VotacionScreen from './src/screens/VotacionScreen';
import ResultadosScreen from './src/screens/ResultadosScreen';
import { COLORS } from './src/theme';

// Stack de navegación nativo.
const Stack = createNativeStackNavigator();

/**
 * Opciones de estilo comunes aplicadas al header de todas las pantallas,
 * usando la paleta institucional de la UTP.
 */
const opcionesHeader = {
  headerStyle: { backgroundColor: COLORS.primary },
  headerTintColor: COLORS.white,
  headerTitleStyle: { fontWeight: 'bold' },
};

/**
 * App
 * Componente raíz que provee el contexto y define la pila de navegación.
 */
export default function App() {
  return (
    <VotacionProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator initialRouteName="Login" screenOptions={opcionesHeader}>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Inicio' }}
          />
          <Stack.Screen
            name="Votacion"
            component={VotacionScreen}
            options={{ title: 'Votación' }}
          />
          <Stack.Screen
            name="Resultados"
            component={ResultadosScreen}
            options={{ title: 'Resultados', headerBackVisible: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </VotacionProvider>
  );
}
