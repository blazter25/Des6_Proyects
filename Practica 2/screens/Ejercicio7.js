// Ejercicio 7: Panfoto — igual que Ej.6 PERO usando OnCheckedChangeListener
// En React Native: onChange/onValueChange del RadioGroup/Checkbox actualiza en tiempo real
// El calculo se recalcula automaticamente al cambiar cualquier opcion (sin boton de Calcular)
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';

export default function Ejercicio7({ navigation }) {
  const [monto, setMonto] = useState('');
  const [tipoPago, setTipoPago] = useState('contado');
  const [plazo, setPlazo] = useState('1ano');
  const [domicilio, setDomicilio] = useState(false);
  const [resumen, setResumen] = useState(null);

  // OnCheckedChangeListener equivalente: useEffect que escucha cambios en cualquier estado
  useEffect(() => {
    const precio = parseFloat(monto);
    if (isNaN(precio) || precio <= 0) {
      setResumen(null);
      return;
    }
    const impuesto = 0.12;
    let total;
    let detalle;

    if (tipoPago === 'contado') {
      total = precio + (precio * 0.07) + (precio * impuesto);
      detalle = [
        `Monto:          B/ ${precio.toFixed(2)}`,
        `7% adicional:   B/ ${(precio * 0.07).toFixed(2)}`,
        `12% impuesto:   B/ ${(precio * impuesto).toFixed(2)}`,
      ];
    } else {
      total = precio + (precio * impuesto);
      detalle = [
        `Monto:          B/ ${precio.toFixed(2)}`,
        `12% impuesto:   B/ ${(precio * impuesto).toFixed(2)}`,
        `Plazo: ${plazo === '1ano' ? '1 ano' : '2 anos'}`,
      ];
    }

    if (domicilio) {
      total += 25;
      detalle.push('Domicilio:      B/ 25.00');
    }

    setResumen({ total: total.toFixed(2), detalle });
  }, [monto, tipoPago, plazo, domicilio]);

  const RadioBtn = ({ valor, label, seleccionado, onPress }) => (
    <Text
      style={[styles.radioBtn, seleccionado && styles.radioBtnSelected]}
      onPress={onPress}
    >
      {seleccionado ? '(*)' : '( )'} {label}
    </Text>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Panfoto</Text>
      <Text style={styles.subtitulo}>Calculo en tiempo real (OnCheckedChangeListener)</Text>

      <Text style={styles.label}>Monto (B/):</Text>
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
          <Text style={styles.label}>Plazo:</Text>
          <RadioBtn valor="1ano"   label="1 ano"   seleccionado={plazo === '1ano'}   onPress={() => setPlazo('1ano')} />
          <RadioBtn valor="2anos"  label="2 anos"  seleccionado={plazo === '2anos'}  onPress={() => setPlazo('2anos')} />
        </>
      )}

      <View style={styles.checkRow}>
        <Checkbox value={domicilio} onValueChange={setDomicilio} color={domicilio ? '#7C3AED' : undefined} />
        <Text style={styles.checkLabel}>Entrega a domicilio (+B/ 25.00)</Text>
      </View>

      {resumen && (
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Calculo en tiempo real:</Text>
          {resumen.detalle.map((linea, i) => (
            <Text key={i} style={styles.detalleTexto}>{linea}</Text>
          ))}
          <View style={styles.separador} />
          <Text style={styles.totalLabel}>TOTAL A PAGAR: B/ {resumen.total}</Text>
        </View>
      )}

      {!resumen && (
        <Text style={styles.hint}>Ingrese el monto para ver el calculo automatico</Text>
      )}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#F5F3FF' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#5B21B6', marginBottom: 4 },
  subtitulo: { fontSize: 13, color: '#888', marginBottom: 16, fontStyle: 'italic' },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, fontSize: 15, marginBottom: 4, borderWidth: 1, borderColor: '#DDD6FE' },
  pickerContainer: { backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#DDD6FE', marginBottom: 4, overflow: 'hidden' },
  picker: { height: 50 },
  radioBtn: { fontSize: 16, color: '#555', marginVertical: 6, paddingVertical: 8, paddingHorizontal: 4 },
  radioBtnSelected: { color: '#7C3AED', fontWeight: 'bold' },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16, marginBottom: 8 },
  checkLabel: { fontSize: 15, color: '#333', marginLeft: 10 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginTop: 20, elevation: 3 },
  cardTitulo: { fontSize: 15, fontWeight: 'bold', color: '#5B21B6', marginBottom: 10 },
  detalleTexto: { fontSize: 13, color: '#444', fontFamily: 'monospace', lineHeight: 22 },
  separador: { height: 1, backgroundColor: '#DDD6FE', marginVertical: 10 },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: '#5B21B6' },
  hint: { fontSize: 13, color: '#aaa', textAlign: 'center', marginTop: 24, fontStyle: 'italic' },
});
