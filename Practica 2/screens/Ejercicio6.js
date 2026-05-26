// Ejercicio 6: Panfoto — Spinner (contado/credito), RadioButton (1 o 2 anos),
// CheckBox (entrega a domicilio), boton Calcular, evaluado con if (radioOption1.isChecked())
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';

export default function Ejercicio6({ navigation }) {
  const [monto, setMonto] = useState('');
  const [tipoPago, setTipoPago] = useState('contado'); // contado | credito
  const [plazo, setPlazo] = useState('1ano');           // 1ano | 2anos
  const [domicilio, setDomicilio] = useState(false);

  function calcular() {
    const precio = parseFloat(monto);
    if (isNaN(precio) || precio <= 0) {
      Alert.alert('Error', 'Ingrese un monto valido mayor a 0.');
      return;
    }

    let total;
    let detalle;
    const impuesto = 0.12;
    const costoContado = 0.07;
    const costoDomicilio = 25.00;

    // Equivalente a: if (radioOption1.isChecked()) — radioOption1 = contado
    if (tipoPago === 'contado') {
      total = precio + (precio * costoContado) + (precio * impuesto);
      detalle = `Monto: B/ ${precio.toFixed(2)}\n7% adicional: B/ ${(precio * costoContado).toFixed(2)}\n12% impuesto: B/ ${(precio * impuesto).toFixed(2)}`;
    } else {
      // Credito — el impuesto aplica sobre el monto
      const anos = plazo === '1ano' ? 1 : 2;
      total = precio + (precio * impuesto);
      detalle = `Monto: B/ ${precio.toFixed(2)}\n12% impuesto: B/ ${(precio * impuesto).toFixed(2)}\nPlazo: ${anos} ano(s)`;
    }

    if (domicilio) {
      total += costoDomicilio;
      detalle += `\nEntrega a domicilio: B/ 25.00`;
    }

    navigation.navigate('Ejercicio6Resultado', {
      tipoPago,
      plazo: tipoPago === 'credito' ? plazo : null,
      total: total.toFixed(2),
      detalle,
      domicilio,
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Panfoto</Text>
      <Text style={styles.subtitulo}>Calculo de pago (if isChecked)</Text>

      <Text style={styles.label}>Monto de la mercancia (B/):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 150.00"
        keyboardType="decimal-pad"
        value={monto}
        onChangeText={setMonto}
      />

      <Text style={styles.label}>Tipo de pago:</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={tipoPago} onValueChange={setTipoPago} style={styles.picker}>
          <Picker.Item label="Al contado" value="contado" />
          <Picker.Item label="A credito"  value="credito" />
        </Picker>
      </View>

      {tipoPago === 'credito' && (
        <>
          <Text style={styles.label}>Plazo de cancelacion:</Text>
          <TouchableOpacity style={styles.radio} onPress={() => setPlazo('1ano')}>
            <View style={[styles.radioCircle, plazo === '1ano' && styles.radioSelected]} />
            <Text style={styles.radioLabel}>1 ano</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radio} onPress={() => setPlazo('2anos')}>
            <View style={[styles.radioCircle, plazo === '2anos' && styles.radioSelected]} />
            <Text style={styles.radioLabel}>2 anos</Text>
          </TouchableOpacity>
        </>
      )}

      <View style={styles.checkRow}>
        <Checkbox
          value={domicilio}
          onValueChange={setDomicilio}
          color={domicilio ? '#2563EB' : undefined}
        />
        <Text style={styles.checkLabel}>Entrega a domicilio (+B/ 25.00)</Text>
      </View>

      <TouchableOpacity style={styles.boton} onPress={calcular}>
        <Text style={styles.botonTexto}>Calcular</Text>
      </TouchableOpacity>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#FFF7ED' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#9A3412', marginBottom: 4 },
  subtitulo: { fontSize: 13, color: '#888', marginBottom: 16, fontStyle: 'italic' },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, fontSize: 15, marginBottom: 4, borderWidth: 1, borderColor: '#FED7AA' },
  pickerContainer: { backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#FED7AA', marginBottom: 4, overflow: 'hidden' },
  picker: { height: 50 },
  radio: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  radioCircle: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#EA580C', marginRight: 10, backgroundColor: '#fff' },
  radioSelected: { backgroundColor: '#EA580C' },
  radioLabel: { fontSize: 15, color: '#333' },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16, marginBottom: 8 },
  checkLabel: { fontSize: 15, color: '#333', marginLeft: 10 },
  boton: { backgroundColor: '#EA580C', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 20 },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
