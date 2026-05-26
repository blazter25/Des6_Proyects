import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Ejercicio10Resultado({ route, navigation }) {
  const { comboNombre, precioBase, conSoda, agrandar, total } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Restaurante Tedy</Text>
      <Text style={styles.subtitulo}>Tu orden</Text>

      <View style={styles.card}>
        <Text style={styles.comboNombre}>{comboNombre}</Text>
        <View style={styles.separador} />

        <View style={styles.fila}>
          <Text style={styles.filaLabel}>Combo base:</Text>
          <Text style={styles.filaValor}>B/ {precioBase}</Text>
        </View>
        {conSoda && (
          <View style={styles.fila}>
            <Text style={styles.filaLabel}>Soda:</Text>
            <Text style={styles.filaValor}>B/ 1.50</Text>
          </View>
        )}
        {agrandar && (
          <View style={styles.fila}>
            <Text style={styles.filaLabel}>Agrandado:</Text>
            <Text style={styles.filaValor}>B/ 1.00</Text>
          </View>
        )}

        <View style={styles.separador} />
        <View style={styles.fila}>
          <Text style={styles.totalLabel}>TOTAL:</Text>
          <Text style={styles.totalValor}>B/ {total}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.boton} onPress={() => navigation.goBack()}>
        <Text style={styles.botonTexto}>Nueva Orden</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 28, backgroundColor: '#FFF1F2', alignItems: 'center', justifyContent: 'center' },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#9F1239', marginBottom: 4 },
  subtitulo: { fontSize: 14, color: '#888', marginBottom: 24 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 24, width: '100%', elevation: 3, marginBottom: 24 },
  comboNombre: { fontSize: 18, fontWeight: 'bold', color: '#9F1239', marginBottom: 12, textAlign: 'center' },
  separador: { height: 1, backgroundColor: '#FECDD3', marginVertical: 10 },
  fila: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  filaLabel: { fontSize: 15, color: '#555' },
  filaValor: { fontSize: 15, color: '#333', fontWeight: '500' },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: '#9F1239' },
  totalValor: { fontSize: 24, fontWeight: 'bold', color: '#DC2626' },
  boton: { backgroundColor: '#DC2626', borderRadius: 8, padding: 14, alignItems: 'center', width: '100%' },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
