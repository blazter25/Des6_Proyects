// Ejercicio 2: Ley de Ohm SIN boton — calculo automatico al cambiar RadioButton
// Equivalente a eliminar el boton y calcular en el listener del RadioGroup
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Ejercicio2({ navigation }) {
  const [opcion, setOpcion] = useState('voltaje');
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');

  const etiquetas = {
    voltaje:     { a: 'Corriente (A)', b: 'Resistencia (Ohm)', formula: 'V = I x R' },
    corriente:   { a: 'Voltaje (V)',   b: 'Resistencia (Ohm)', formula: 'I = V / R' },
    resistencia: { a: 'Voltaje (V)',   b: 'Corriente (A)',      formula: 'R = V / I' },
  };

  // Calculo automatico cada vez que cambian los valores o la opcion
  useEffect(() => {
    const a = parseFloat(val1);
    const b = parseFloat(val2);
    if (!isNaN(a) && !isNaN(b) && b !== 0) {
      let resultado;
      if (opcion === 'voltaje')      resultado = a * b;
      else if (opcion === 'corriente') resultado = a / b;
      else                             resultado = a / b;

      const unidades = { voltaje: 'V', corriente: 'A', resistencia: 'Ohm' };
      const titulo = opcion.charAt(0).toUpperCase() + opcion.slice(1);

      // Navega con Intent automaticamente al tener los dos valores
      navigation.navigate('Ejercicio2Resultado', {
        titulo,
        resultado: resultado.toFixed(4),
        formula: etiquetas[opcion].formula,
        opcion,
        unidad: unidades[opcion],
      });
    }
  }, [opcion, val1, val2]);

  const RadioBtn = ({ valor, label }) => (
    <TouchableOpacity
      style={styles.radio}
      onPress={() => { setOpcion(valor); setVal1(''); setVal2(''); }}
    >
      <View style={[styles.radioCircle, opcion === valor && styles.radioSelected]} />
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ley de Ohm</Text>
      <Text style={styles.subtitulo}>Seleccione un parametro (calculo automatico):</Text>

      <RadioBtn valor="voltaje"     label="Voltaje" />
      <RadioBtn valor="corriente"   label="Corriente" />
      <RadioBtn valor="resistencia" label="Resistencia" />

      <View style={styles.separador} />
      <Text style={styles.hint}>Complete los dos campos para calcular automaticamente</Text>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#F0F4FF' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 8 },
  subtitulo: { fontSize: 14, color: '#555', marginBottom: 12 },
  radio: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  radioCircle: {
    width: 22, height: 22, borderRadius: 11, borderWidth: 2,
    borderColor: '#2563EB', marginRight: 10, backgroundColor: '#fff',
  },
  radioSelected: { backgroundColor: '#2563EB' },
  radioLabel: { fontSize: 15, color: '#333' },
  separador: { height: 1, backgroundColor: '#CBD5E1', marginVertical: 16 },
  hint: { fontSize: 12, color: '#888', marginBottom: 10, fontStyle: 'italic' },
  input: {
    backgroundColor: '#fff', borderRadius: 8, padding: 12,
    fontSize: 15, marginBottom: 12, borderWidth: 1, borderColor: '#CBD5E1',
  },
});
