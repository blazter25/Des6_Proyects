// Ejercicio 4: Factorial / Fibonacci con RadioButton y boton Calcular + Intent
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Ejercicio4({ navigation }) {
  const [opcion, setOpcion] = useState('factorial');
  const [numero, setNumero] = useState('');

  function calcular() {
    const n = parseInt(numero, 10);
    if (isNaN(n) || n < 0) {
      Alert.alert('Error', 'Ingrese un numero entero positivo.');
      return;
    }
    let resultado;
    if (opcion === 'factorial') {
      resultado = calcularFactorial(n);
      navigation.navigate('Ejercicio4Resultado', {
        opcion: 'Factorial',
        numero: n,
        resultado: resultado.toString(),
      });
    } else {
      const serie = calcularFibonacci(n);
      navigation.navigate('Ejercicio4Resultado', {
        opcion: 'Fibonacci',
        numero: n,
        resultado: serie.join(', '),
      });
    }
  }

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

  const RadioBtn = ({ valor, label }) => (
    <TouchableOpacity style={styles.radio} onPress={() => setOpcion(valor)}>
      <View style={[styles.radioCircle, opcion === valor && styles.radioSelected]} />
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Seleccione una operacion</Text>

      <RadioBtn valor="factorial" label="Factorial de un numero" />
      <RadioBtn valor="fibonacci" label="Sucesion Fibonacci" />

      <View style={styles.separador} />
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
  radio: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  radioCircle: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#16A34A', marginRight: 10, backgroundColor: '#fff' },
  radioSelected: { backgroundColor: '#16A34A' },
  radioLabel: { fontSize: 15, color: '#333' },
  separador: { height: 1, backgroundColor: '#BBF7D0', marginVertical: 16 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, fontSize: 15, marginBottom: 12, borderWidth: 1, borderColor: '#BBF7D0' },
  boton: { backgroundColor: '#16A34A', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 8 },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
