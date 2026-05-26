import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function Ejercicio6Resultado({ route, navigation }) {
  const { tipoPago, plazo, total, detalle, domicilio } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Panfoto — Resumen</Text>
      <View style={styles.card}>
        <Text style={styles.tipoLabel}>
          Tipo de pago: {tipoPago === 'contado' ? 'Al contado' : `A credito (${plazo === '1ano' ? '1 ano' : '2 anos'})`}
        </Text>
        {domicilio && <Text style={styles.domicilio}>Entrega a domicilio incluida</Text>}
        <View style={styles.separador} />
        <Text style={styles.detalleTexto}>{detalle}</Text>
        <View style={styles.separador} />
        <Text style={styles.totalLabel}>TOTAL A PAGAR:</Text>
        <Text style={styles.totalValor}>B/ {total}</Text>
      </View>
      <TouchableOpacity style={styles.boton} onPress={() => navigation.goBack()}>
        <Text style={styles.botonTexto}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 28, backgroundColor: '#FFF7ED', alignItems: 'center' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#9A3412', marginBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '100%', elevation: 3, marginBottom: 24 },
  tipoLabel: { fontSize: 15, color: '#555', marginBottom: 8 },
  domicilio: { fontSize: 14, color: '#EA580C', marginBottom: 8 },
  separador: { height: 1, backgroundColor: '#FED7AA', marginVertical: 12 },
  detalleTexto: { fontSize: 14, color: '#444', lineHeight: 22 },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#555', marginTop: 4 },
  totalValor: { fontSize: 32, fontWeight: 'bold', color: '#9A3412', marginTop: 4 },
  boton: { backgroundColor: '#EA580C', borderRadius: 8, padding: 14, alignItems: 'center', width: '100%' },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
