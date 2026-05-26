// Ejercicio 3: Ley de Ohm usando Spinner (Picker) + boton + Intent
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Ejercicio3({ navigation }) {
  const [opcion, setOpcion] = useState('voltaje');
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
      Alert.alert('Error', 'Ingrese valores numericos validos.');
      return;
    }
    let resultado;
    if (opcion === 'voltaje')        resultado = a * b;
    else if (opcion === 'corriente') resultado = a / b;
    else                             resultado = a / b;

    const unidades = { voltaje: 'V', corriente: 'A', resistencia: 'Ohm' };
    navigation.navigate('Ejercicio3Resultado', {
      titulo: opcion.charAt(0).toUpperCase() + opcion.slice(1),
      resultado: resultado.toFixed(4),
      formula: etiquetas[opcion].formula,
      unidad: unidades[opcion],
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ley de Ohm — Spinner</Text>
      <Text style={styles.subtitulo}>Seleccione que calcular:</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={opcion}
          onValueChange={(val) => { setOpcion(val); setVal1(''); setVal2(''); }}
          style={styles.picker}
        >
          <Picker.Item label="Voltaje" value="voltaje" />
          <Picker.Item label="Corriente" value="corriente" />
          <Picker.Item label="Resistencia" value="resistencia" />
        </Picker>
      </View>

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
  subtitulo: { fontSize: 15, color: '#555', marginBottom: 8 },
  pickerContainer: {
    backgroundColor: '#fff', borderRadius: 8, borderWidth: 1,
    borderColor: '#CBD5E1', marginBottom: 12, overflow: 'hidden',
  },
  picker: { height: 50 },
  separador: { height: 1, backgroundColor: '#CBD5E1', marginVertical: 16 },
  input: {
    backgroundColor: '#fff', borderRadius: 8, padding: 12,
    fontSize: 15, marginBottom: 12, borderWidth: 1, borderColor: '#CBD5E1',
  },
  boton: { backgroundColor: '#2563EB', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 8 },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
