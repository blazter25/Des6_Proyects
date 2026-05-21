import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const ANIOS_CREDITO = 9;
const TASA_INTERES = 0.08;
const ITBM = 0.07;
const AUMENTO_AUTOMATICA = 1500;
const PORCENTAJE_SALARIO = 0.30;

const formatear = (n) =>
  Number(n).toLocaleString('es-PA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

function Row({ k, v, bold }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowKey, bold && styles.bold]}>{k}</Text>
      <Text style={[styles.rowVal, bold && styles.bold]}>{v}</Text>
    </View>
  );
}

function Radio({ selected, label, onPress, color, dimmed }) {
  // `dimmed` solo atenúa visualmente la opción (transparencia), pero NO la deshabilita:
  // el TouchableOpacity sigue respondiendo al onPress, por lo que continúa siendo seleccionable.
  return (
    <TouchableOpacity
      style={[styles.radioRow, dimmed && styles.radioDimmed]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.radioOuter, { borderColor: color }]}>
        {selected ? <View style={[styles.radioInner, { backgroundColor: color }]} /> : null}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const [costo, setCosto] = useState('');
  const [salario, setSalario] = useState('');
  const [transmision, setTransmision] = useState('manual');
  const [formaPago, setFormaPago] = useState('contado');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');

  const calcular = () => {
    setError('');
    setResultado(null);

    const costoNum = parseFloat(costo);

    if (isNaN(costoNum) || costoNum <= 0) {
      setError('Ingrese un costo válido (mayor a 0).');
      return;
    }

    let precioBase = costoNum;
    if (transmision === 'automatica') {
      precioBase += AUMENTO_AUTOMATICA;
    }

    if (formaPago === 'contado') {
      const impuesto = precioBase * ITBM;
      const granTotal = precioBase + impuesto;
      setResultado({
        tipo: 'contado',
        costo: precioBase,
        impuesto,
        granTotal,
      });
      return;
    }

    // El crédito usa el salario para evaluar la aprobación.
    // Si el salario es inválido o 0, se avisa PERO igual se muestra el resultado:
    // se toma como 0, por lo que el 30% del salario es 0 y queda NO APROBADO.
    let salarioNum = parseFloat(salario);
    if (isNaN(salarioNum) || salarioNum <= 0) {
      setError('Ingrese un salario mayor a 0.');
      salarioNum = 0;
    }

    const capitalConInteres = precioBase * Math.pow(1 + TASA_INTERES, ANIOS_CREDITO);
    const itbm = capitalConInteres * ITBM;
    const capitalFinal = capitalConInteres + itbm;
    const letraMensual = capitalFinal / (ANIOS_CREDITO * 12);
    const treintaSalario = salarioNum * PORCENTAJE_SALARIO;
    const aprobado = treintaSalario >= letraMensual;

    setResultado({
      tipo: 'credito',
      costo: precioBase,
      capitalConInteres,
      itbm,
      capitalFinal,
      letraMensual,
      treintaSalario,
      aprobado,
    });
  };

  const limpiar = () => {
    setCosto('');
    setSalario('');
    setTransmision('manual');
    setFormaPago('contado');
    setResultado(null);
    setError('');
  };

  // El salario solo se usa para evaluar el crédito (letra <= 30% del salario).
  // Se deshabilita en transmisión Manual, EXCEPTO cuando el pago es a Crédito.
  const salarioDeshabilitado = transmision === 'manual' && formaPago !== 'credito';

  return (
    <KeyboardAvoidingView
      style={styles.safe}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.phoneFrame}>
          <View style={styles.phoneNotch} />
          <View style={styles.screen}>
            <Text style={styles.title}>Venta de Auto</Text>

            <Text style={styles.label}>Costo:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="0.00"
              value={costo}
              onChangeText={setCosto}
            />

            <Text style={[styles.label, salarioDeshabilitado && styles.labelDisabled]}>
              Salario:
            </Text>
            <TextInput
              style={[styles.input, salarioDeshabilitado && styles.inputDisabled]}
              keyboardType="numeric"
              placeholder="0.00"
              value={salario}
              onChangeText={setSalario}
              editable={!salarioDeshabilitado}
            />
            {salarioDeshabilitado ? (
              <Text style={styles.hint}>El salario se deshabilita en Manual con pago de Contado.</Text>
            ) : null}

            <Text style={styles.section}>Transmisión:</Text>
            <Radio
              color="#2D9CDB"
              selected={transmision === 'manual'}
              label="Manual"
              onPress={() => setTransmision('manual')}
            />
            <Radio
              color="#2D9CDB"
              selected={transmision === 'automatica'}
              label="Automática"
              onPress={() => setTransmision('automatica')}
              dimmed={transmision === 'manual'}
            />

            <Text style={styles.section}>Forma de pago:</Text>
            <Radio
              color="#D35400"
              selected={formaPago === 'credito'}
              label="Crédito"
              onPress={() => setFormaPago('credito')}
            />
            <Radio
              color="#D35400"
              selected={formaPago === 'contado'}
              label="Contado"
              onPress={() => setFormaPago('contado')}
            />

            <View style={styles.buttonsRow}>
              <TouchableOpacity style={styles.btnPrimary} onPress={calcular}>
                <Text style={styles.btnText}>Calcular</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSecondary} onPress={limpiar}>
                <Text style={styles.btnTextSecondary}>Limpiar</Text>
              </TouchableOpacity>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            {resultado && resultado.tipo === 'contado' ? (
              <View style={styles.resultBox}>
                <Text style={styles.resultTitle}>Resultado (Contado)</Text>
                <Row k="Costo:" v={`B/. ${formatear(resultado.costo)}`} />
                <Row k="Impuesto (7%):" v={`B/. ${formatear(resultado.impuesto)}`} />
                <Row k="Gran Total:" v={`B/. ${formatear(resultado.granTotal)}`} bold />
              </View>
            ) : null}

            {resultado && resultado.tipo === 'credito' ? (
              <View style={styles.resultBox}>
                <Text style={styles.resultTitle}>Resultado (Crédito)</Text>
                <Text
                  style={[
                    styles.estado,
                    { color: resultado.aprobado ? '#27AE60' : '#C0392B' },
                  ]}
                >
                  {resultado.aprobado ? 'APROBADO' : 'NO APROBADO'}
                </Text>
                <Row
                  k="Total a pagar:"
                  v={`B/. ${formatear(resultado.capitalFinal)}`}
                  bold
                />
                <Row k="Letra:" v={`B/. ${formatear(resultado.letraMensual)}`} />
                <Row
                  k="30% del salario:"
                  v={`B/. ${formatear(resultado.treintaSalario)}`}
                />
              </View>
            ) : null}
          </View>
        </View>

        <Text style={styles.footer}>
          Angel Martínez · 8-893-602{'\n'}Desarrollo de Software VI · Proyecto #1
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E5E7EB' },
  scroll: { padding: 16, alignItems: 'center' },
  phoneFrame: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#111',
    borderRadius: 36,
    padding: 14,
    paddingTop: 22,
    paddingBottom: 26,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  phoneNotch: {
    alignSelf: 'center',
    width: 70,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#444',
    marginBottom: 14,
  },
  screen: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 14,
    color: '#1F2937',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#9CA3AF',
    fontSize: 16,
    paddingVertical: 6,
    marginBottom: 4,
    color: '#111',
  },
  inputDisabled: {
    // Apariencia de campo deshabilitado (atenuado y no editable).
    opacity: 0.45,
    backgroundColor: '#F3F4F6',
    borderBottomColor: '#D1D5DB',
    color: '#9CA3AF',
  },
  labelDisabled: {
    color: '#9CA3AF',
  },
  hint: {
    fontSize: 11,
    color: '#9CA3AF',
    fontStyle: 'italic',
    marginBottom: 2,
  },
  section: {
    marginTop: 14,
    marginBottom: 2,
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  radioDimmed: {
    // Solo apariencia: la opción se ve transparente/atenuada pero sigue siendo seleccionable.
    opacity: 0.35,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioLabel: {
    fontSize: 15,
    color: '#1F2937',
  },
  buttonsRow: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 10,
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: '#2D9CDB',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  btnTextSecondary: { color: '#374151', fontWeight: '700', fontSize: 15 },
  error: {
    color: '#C0392B',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  resultBox: {
    marginTop: 18,
    padding: 14,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  resultTitle: {
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 8,
    color: '#111827',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  rowKey: { color: '#374151', fontSize: 14 },
  rowVal: { color: '#111827', fontSize: 14, fontWeight: '600' },
  bold: { fontWeight: '800' },
  estado: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 1,
  },
  footer: {
    marginTop: 16,
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});
