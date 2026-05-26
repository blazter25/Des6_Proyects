// Ejercicio 1: Ley de Ohm con RadioButton y boton Calcular + Intent (navegacion con params)
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Ejercicio1({ navigation }) {
  const [opcion, setOpcion] = useState('voltaje'); // voltaje | corriente | resistencia
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');

  const etiquetas = {
    voltaje:     { a: 'Corriente (A)', b: 'Resistencia (Ohm)', formula: 'V = I x R' },
    corriente:   { a: 'Voltaje (V)',   b: 'Resistencia (Ohm)', formula: 'I = V / R' },
    resistencia: { a: 'Voltaje (V)',   b: 'Corriente (A)',      formula: 'R = V / I' },
  };

  function calcular() {
    const a = parseFloat(val1);
    const b = parseFloat(val2);
    if (isNaN(a) || isNaN(b) || b === 0) {
      Alert.alert('Error', 'Ingrese valores numericos validos (no puede dividir por cero).');
      return;
    }
    let resultado;
    let titulo;
    if (opcion === 'voltaje') {
      resultado = a * b;
      titulo = 'Voltaje';
    } else if (opcion === 'corriente') {
      resultado = a / b;
      titulo = 'Corriente';
    } else {
      resultado = a / b;
      titulo = 'Resistencia';
    }
    // Intent equivalente: navegacion con parametros
    navigation.navigate('Ejercicio1Resultado', {
      titulo,
      resultado: resultado.toFixed(4),
      formula: etiquetas[opcion].formula,
      opcion,
    });
  }

  const RadioBtn = ({ valor, label }) => (
    <TouchableOpacity style={styles.radio} onPress={() => { setOpcion(valor); setVal1(''); setVal2(''); }}>
      <View style={[styles.radioCircle, opcion === valor && styles.radioSelected]} />
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ley de Ohm</Text>
      <Text style={styles.subtitulo}>Seleccione que desea calcular:</Text>

      <RadioBtn valor="voltaje"     label="Voltaje" />
      <RadioBtn valor="corriente"   label="Corriente" />
      <RadioBtn valor="resistencia" label="Resistencia" />

      <View style={styles.separador} />
      <TextInput
        style={styles.input}
        placeholder={etiquetas[opcion].a}
        keyboardType="decimal-pad"
        value={val1}
        onChangeText={setVal1}
      />
      <TextInput
        style={styles.input}
        placeholder={etiquetas[opcion].b}
        keyboardType="decimal-pad"
        value={val2}
        onChangeText={setVal2}
      />

      <TouchableOpacity style={styles.boton} onPress={calcular}>
        <Text style={styles.botonTexto}>Calcular</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#F0F4FF' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 8 },
  subtitulo: { fontSize: 15, color: '#555', marginBottom: 12 },
  radio: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  radioCircle: {
    width: 22, height: 22, borderRadius: 11, borderWidth: 2,
    borderColor: '#2563EB', marginRight: 10, backgroundColor: '#fff',
  },
  radioSelected: { backgroundColor: '#2563EB' },
  radioLabel: { fontSize: 15, color: '#333' },
  separador: { height: 1, backgroundColor: '#CBD5E1', marginVertical: 16 },
  input: {
    backgroundColor: '#fff', borderRadius: 8, padding: 12,
    fontSize: 15, marginBottom: 12, borderWidth: 1, borderColor: '#CBD5E1',
  },
  boton: {
    backgroundColor: '#2563EB', borderRadius: 8, padding: 14,
    alignItems: 'center', marginTop: 8,
  },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
