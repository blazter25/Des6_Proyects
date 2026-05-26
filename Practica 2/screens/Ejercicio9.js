// Ejercicio 9: Orden de comida — precio, CheckBox jubilado (25% descuento), Intent
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';

export default function Ejercicio9({ navigation }) {
  const [precio, setPrecio] = useState('');
  const [esJubilado, setEsJubilado] = useState(false);

  function calcular() {
    const p = parseFloat(precio);
    if (isNaN(p) || p <= 0) {
      Alert.alert('Error', 'Ingrese un precio valido mayor a 0.');
      return;
    }
    const descuento = esJubilado ? p * 0.25 : 0;
    const total = p - descuento;
    navigation.navigate('Ejercicio9Resultado', {
      precioOriginal: p.toFixed(2),
      descuento: descuento.toFixed(2),
      total: total.toFixed(2),
      esJubilado,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Orden de Comida</Text>

      <Text style={styles.label}>Precio de la orden (B/):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 12.50"
        keyboardType="decimal-pad"
        value={precio}
        onChangeText={setPrecio}
      />

      <View style={styles.checkRow}>
        <Checkbox
          value={esJubilado}
          onValueChange={setEsJubilado}
          color={esJubilado ? '#0284C7' : undefined}
        />
        <Text style={styles.checkLabel}>Jubilado (descuento 25%)</Text>
      </View>

      <TouchableOpacity style={styles.boton} onPress={calcular}>
        <Text style={styles.botonTexto}>Calcular Total</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#F0F9FF' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#075985', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 6 },
  input: {
    backgroundColor: '#fff', borderRadius: 8, padding: 12,
    fontSize: 15, marginBottom: 16, borderWidth: 1, borderColor: '#BAE6FD',
  },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  checkLabel: { fontSize: 15, color: '#333', marginLeft: 10 },
  boton: { backgroundColor: '#0284C7', borderRadius: 8, padding: 14, alignItems: 'center' },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
