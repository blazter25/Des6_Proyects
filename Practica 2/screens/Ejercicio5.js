// Ejercicio 5: Factorial / Fibonacci con Spinner (Picker) + boton + Intent
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Ejercicio5({ navigation }) {
  const [opcion, setOpcion] = useState('factorial');
  const [numero, setNumero] = useState('');

  function calcularFactorial(n) {
    if (n === 0 || n === 1) return 1;
    let f = 1;
    for (let i = 2; i <= n; i++) f *= i;
    return f;
  }

  function calcularFibonacci(n) {
    if (n === 0) return [0];
    const serie = [0, 1];
    for (let i = 2; i <= n; i++) serie.push(serie[i - 1] + serie[i - 2]);
    return serie;
  }

  function calcular() {
    const n = parseInt(numero, 10);
    if (isNaN(n) || n < 0) {
      Alert.alert('Error', 'Ingrese un numero entero positivo.');
      return;
    }
    if (opcion === 'factorial') {
      navigation.navigate('Ejercicio5Resultado', {
        opcion: 'Factorial',
        numero: n,
        resultado: calcularFactorial(n).toString(),
      });
    } else {
      navigation.navigate('Ejercicio5Resultado', {
        opcion: 'Fibonacci',
        numero: n,
        resultado: calcularFibonacci(n).join(', '),
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Seleccione una operacion (Spinner)</Text>

      <View style={styles.pickerContainer}>
        <Picker selectedValue={opcion} onValueChange={(val) => { setOpcion(val); setNumero(''); }} style={styles.picker}>
          <Picker.Item label="Factorial de un numero" value="factorial" />
          <Picker.Item label="Sucesion Fibonacci"     value="fibonacci" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Ingrese el numero (n)"
        keyboardType="number-pad"
        value={numero}
        onChangeText={setNumero}
      />

      <TouchableOpacity style={styles.boton} onPress={calcular}>
        <Text style={styles.botonTexto}>Calcular</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#F0FFF4' },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#166534', marginBottom: 16 },
  pickerContainer: { backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#BBF7D0', marginBottom: 16, overflow: 'hidden' },
  picker: { height: 50 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, fontSize: 15, marginBottom: 12, borderWidth: 1, borderColor: '#BBF7D0' },
  boton: { backgroundColor: '#16A34A', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 8 },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
