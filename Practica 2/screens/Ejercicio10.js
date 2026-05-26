// Ejercicio 10: Restaurante Tedy — Combo B/3.99, soda +1.50, agrandar +1.00
// RadioButton para seleccionar combo, CheckBox para soda y agrandar
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import Checkbox from 'expo-checkbox';

const COMBOS = [
  { id: 'combo1', nombre: 'Combo Pollo Frito', descripcion: 'Pollo frito + papas fritas', precio: 3.99 },
  { id: 'combo2', nombre: 'Combo Hamburguesa', descripcion: 'Hamburguesa + papas fritas', precio: 3.99 },
];

export default function Ejercicio10({ navigation }) {
  const [comboSeleccionado, setComboSeleccionado] = useState('combo1');
  const [conSoda, setConSoda] = useState(false);
  const [agrandar, setAgrandar] = useState(false);

  function calcular() {
    const combo = COMBOS.find((c) => c.id === comboSeleccionado);
    let total = combo.precio;
    if (conSoda)   total += 1.50;
    if (agrandar)  total += 1.00;

    navigation.navigate('Ejercicio10Resultado', {
      comboNombre: combo.nombre,
      precioBase: combo.precio.toFixed(2),
      conSoda,
      agrandar,
      total: total.toFixed(2),
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Restaurante Tedy</Text>
      <Text style={styles.subtitulo}>Seleccione su combo</Text>

      {COMBOS.map((combo) => (
        <TouchableOpacity
          key={combo.id}
          style={[styles.comboCard, comboSeleccionado === combo.id && styles.comboCardSelected]}
          onPress={() => setComboSeleccionado(combo.id)}
          activeOpacity={0.8}
        >
          <View style={styles.comboHeader}>
            <View style={[styles.radioCircle, comboSeleccionado === combo.id && styles.radioSelected]} />
            <Text style={styles.comboNombre}>{combo.nombre}</Text>
          </View>
          <Text style={styles.comboDescripcion}>{combo.descripcion}</Text>
          <Text style={styles.comboPrecio}>B/ {combo.precio.toFixed(2)}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.separador} />
      <Text style={styles.extrasLabel}>Extras:</Text>

      <View style={styles.checkRow}>
        <Checkbox
          value={conSoda}
          onValueChange={setConSoda}
          color={conSoda ? '#DC2626' : undefined}
        />
        <Text style={styles.checkLabel}>Agregar soda  (+B/ 1.50)</Text>
      </View>

      <View style={styles.checkRow}>
        <Checkbox
          value={agrandar}
          onValueChange={setAgrandar}
          color={agrandar ? '#DC2626' : undefined}
        />
        <Text style={styles.checkLabel}>Agrandar combo  (+B/ 1.00)</Text>
      </View>

      <View style={styles.resumenPrevio}>
        <Text style={styles.resumenTexto}>
          Estimado: B/ {(() => {
            const combo = COMBOS.find((c) => c.id === comboSeleccionado);
            let t = combo.precio;
            if (conSoda)  t += 1.50;
            if (agrandar) t += 1.00;
            return t.toFixed(2);
          })()}
        </Text>
      </View>

      <TouchableOpacity style={styles.boton} onPress={calcular}>
        <Text style={styles.botonTexto}>Ordenar y Ver Total</Text>
      </TouchableOpacity>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#FFF1F2' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#9F1239', marginBottom: 4 },
  subtitulo: { fontSize: 14, color: '#888', marginBottom: 20 },
  comboCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12,
    borderWidth: 2, borderColor: '#FECDD3', elevation: 2,
  },
  comboCardSelected: { borderColor: '#DC2626', backgroundColor: '#FFF1F2' },
  comboHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  radioCircle: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 2,
    borderColor: '#DC2626', marginRight: 10, backgroundColor: '#fff',
  },
  radioSelected: { backgroundColor: '#DC2626' },
  comboNombre: { fontSize: 16, fontWeight: 'bold', color: '#9F1239' },
  comboDescripcion: { fontSize: 13, color: '#666', marginLeft: 30, marginBottom: 4 },
  comboPrecio: { fontSize: 20, fontWeight: 'bold', color: '#DC2626', marginLeft: 30 },
  separador: { height: 1, backgroundColor: '#FECDD3', marginVertical: 16 },
  extrasLabel: { fontSize: 15, fontWeight: '600', color: '#555', marginBottom: 10 },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  checkLabel: { fontSize: 15, color: '#333', marginLeft: 10 },
  resumenPrevio: {
    backgroundColor: '#FFE4E6', borderRadius: 8, padding: 12,
    marginVertical: 16, alignItems: 'center',
  },
  resumenTexto: { fontSize: 18, fontWeight: 'bold', color: '#9F1239' },
  boton: { backgroundColor: '#DC2626', borderRadius: 8, padding: 14, alignItems: 'center' },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
