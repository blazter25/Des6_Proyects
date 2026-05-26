import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MenuPrincipal from './screens/MenuPrincipal';
import Ejercicio1 from './screens/Ejercicio1';
import Ejercicio1Resultado from './screens/Ejercicio1Resultado';
import Ejercicio2 from './screens/Ejercicio2';
import Ejercicio2Resultado from './screens/Ejercicio2Resultado';
import Ejercicio3 from './screens/Ejercicio3';
import Ejercicio3Resultado from './screens/Ejercicio3Resultado';
import Ejercicio4 from './screens/Ejercicio4';
import Ejercicio4Resultado from './screens/Ejercicio4Resultado';
import Ejercicio5 from './screens/Ejercicio5';
import Ejercicio5Resultado from './screens/Ejercicio5Resultado';
import Ejercicio6 from './screens/Ejercicio6';
import Ejercicio6Resultado from './screens/Ejercicio6Resultado';
import Ejercicio7 from './screens/Ejercicio7';
import Ejercicio7Resultado from './screens/Ejercicio7Resultado';
import Ejercicio8 from './screens/Ejercicio8';
import Ejercicio9 from './screens/Ejercicio9';
import Ejercicio9Resultado from './screens/Ejercicio9Resultado';
import Ejercicio10 from './screens/Ejercicio10';
import Ejercicio10Resultado from './screens/Ejercicio10Resultado';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerStyle: { backgroundColor: '#2563EB' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Menu" component={MenuPrincipal} options={{ title: 'Practica #2 - Prog. Movil' }} />
        <Stack.Screen name="Ejercicio1" component={Ejercicio1} options={{ title: 'Ej. 1 - Ley de Ohm (RadioButton)' }} />
        <Stack.Screen name="Ejercicio1Resultado" component={Ejercicio1Resultado} options={{ title: 'Resultado Ej. 1' }} />
        <Stack.Screen name="Ejercicio2" component={Ejercicio2} options={{ title: 'Ej. 2 - Ley de Ohm (sin boton)' }} />
        <Stack.Screen name="Ejercicio2Resultado" component={Ejercicio2Resultado} options={{ title: 'Resultado Ej. 2' }} />
        <Stack.Screen name="Ejercicio3" component={Ejercicio3} options={{ title: 'Ej. 3 - Ley de Ohm (Spinner)' }} />
        <Stack.Screen name="Ejercicio3Resultado" component={Ejercicio3Resultado} options={{ title: 'Resultado Ej. 3' }} />
        <Stack.Screen name="Ejercicio4" component={Ejercicio4} options={{ title: 'Ej. 4 - Factorial / Fibonacci' }} />
        <Stack.Screen name="Ejercicio4Resultado" component={Ejercicio4Resultado} options={{ title: 'Resultado Ej. 4' }} />
        <Stack.Screen name="Ejercicio5" component={Ejercicio5} options={{ title: 'Ej. 5 - Factorial/Fib (Spinner)' }} />
        <Stack.Screen name="Ejercicio5Resultado" component={Ejercicio5Resultado} options={{ title: 'Resultado Ej. 5' }} />
        <Stack.Screen name="Ejercicio6" component={Ejercicio6} options={{ title: 'Ej. 6 - Panfoto (if isChecked)' }} />
        <Stack.Screen name="Ejercicio6Resultado" component={Ejercicio6Resultado} options={{ title: 'Resultado Ej. 6' }} />
        <Stack.Screen name="Ejercicio7" component={Ejercicio7} options={{ title: 'Ej. 7 - Panfoto (Listener)' }} />
        <Stack.Screen name="Ejercicio7Resultado" component={Ejercicio7Resultado} options={{ title: 'Resultado Ej. 7' }} />
        <Stack.Screen name="Ejercicio8" component={Ejercicio8} options={{ title: 'Ej. 8 - Animales (Spinner anidado)' }} />
        <Stack.Screen name="Ejercicio9" component={Ejercicio9} options={{ title: 'Ej. 9 - Orden de Comida' }} />
        <Stack.Screen name="Ejercicio9Resultado" component={Ejercicio9Resultado} options={{ title: 'Resultado Ej. 9' }} />
        <Stack.Screen name="Ejercicio10" component={Ejercicio10} options={{ title: 'Ej. 10 - Restaurante Tedy' }} />
        <Stack.Screen name="Ejercicio10Resultado" component={Ejercicio10Resultado} options={{ title: 'Resultado Ej. 10' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
