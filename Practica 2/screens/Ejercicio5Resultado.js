import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function Ejercicio5Resultado({ route, navigation }) {
  const { opcion, numero, resultado } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.opcion}>{opcion} de {numero} (Spinner)</Text>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Resultado:</Text>
        <Text style={styles.valor}>{resultado}</Text>
      </View>
      <TouchableOpacity style={styles.boton} onPress={() => navigation.goBack()}>
        <Text style={styles.botonTexto}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 28, backgroundColor: '#F0FFF4', alignItems: 'center', justifyContent: 'center' },
  opcion: { fontSize: 20, fontWeight: 'bold', color: '#166534', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 24, width: '100%', elevation: 3, marginBottom: 28, alignItems: 'center' },
  cardLabel: { fontSize: 16, color: '#555', marginBottom: 12 },
  valor: { fontSize: 16, fontWeight: 'bold', color: '#166534', textAlign: 'center' },
  boton: { backgroundColor: '#16A34A', borderRadius: 8, padding: 14, alignItems: 'center', width: '100%' },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
