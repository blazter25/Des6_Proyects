import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Ejercicio9Resultado({ route, navigation }) {
  const { precioOriginal, descuento, total, esJubilado } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Orden de Comida — Resultado</Text>
      <View style={styles.card}>
        <Text style={styles.fila}>Precio original:   B/ {precioOriginal}</Text>
        {esJubilado && (
          <Text style={styles.descuento}>Descuento 25%:   - B/ {descuento}</Text>
        )}
        <View style={styles.separador} />
        <Text style={styles.totalLabel}>TOTAL A PAGAR:</Text>
        <Text style={styles.totalValor}>B/ {total}</Text>
      </View>
      {esJubilado && (
        <Text style={styles.nota}>Se aplico descuento de jubilado (25%)</Text>
      )}
      <TouchableOpacity style={styles.boton} onPress={() => navigation.goBack()}>
        <Text style={styles.botonTexto}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 28, backgroundColor: '#F0F9FF', alignItems: 'center', justifyContent: 'center' },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#075985', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 24, width: '100%', elevation: 3, marginBottom: 16 },
  fila: { fontSize: 15, color: '#444', marginBottom: 8, fontFamily: 'monospace' },
  descuento: { fontSize: 15, color: '#DC2626', marginBottom: 8, fontFamily: 'monospace' },
  separador: { height: 1, backgroundColor: '#BAE6FD', marginVertical: 12 },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#555' },
  totalValor: { fontSize: 36, fontWeight: 'bold', color: '#075985', marginTop: 4 },
  nota: { fontSize: 13, color: '#0284C7', marginBottom: 20, fontStyle: 'italic' },
  boton: { backgroundColor: '#0284C7', borderRadius: 8, padding: 14, alignItems: 'center', width: '100%' },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
