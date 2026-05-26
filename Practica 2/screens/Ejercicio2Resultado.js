import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Ejercicio2Resultado({ route, navigation }) {
  const { titulo, resultado, formula, unidad } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Calculo automatico — Formula:</Text>
      <Text style={styles.formula}>{formula}</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>{titulo} calculado:</Text>
        <Text style={styles.valor}>{resultado} {unidad}</Text>
      </View>

      <TouchableOpacity style={styles.boton} onPress={() => navigation.goBack()}>
        <Text style={styles.botonTexto}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 28, backgroundColor: '#F0F4FF', alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 15, color: '#555', marginBottom: 4 },
  formula: { fontSize: 20, fontWeight: 'bold', color: '#2563EB', marginBottom: 24 },
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 24, alignItems: 'center',
    width: '100%', elevation: 3, marginBottom: 28,
  },
  cardLabel: { fontSize: 16, color: '#555', marginBottom: 8 },
  valor: { fontSize: 32, fontWeight: 'bold', color: '#1E3A8A' },
  boton: { backgroundColor: '#2563EB', borderRadius: 8, padding: 14, alignItems: 'center', width: '100%' },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
