// Ejercicio 8: Spinner anidado — Animales vertebrados / invertebrados
// Al elegir una categoria en el Spinner 1, el Spinner 2 muestra 5 ejemplos
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ANIMALES = {
  vertebrados: {
    label: 'Vertebrados',
    ejemplos: ['Leon', 'Delfin', 'Aguila', 'Salmon', 'Rana'],
  },
  invertebrados: {
    label: 'Invertebrados',
    ejemplos: ['Arana', 'Mariposa', 'Pulpo', 'Estrella de mar', 'Abeja'],
  },
};

export default function Ejercicio8() {
  const [categoria, setCategoria] = useState('vertebrados');
  const [ejemplo, setEjemplo] = useState(ANIMALES.vertebrados.ejemplos[0]);

  function onCategoriaChange(valor) {
    setCategoria(valor);
    setEjemplo(ANIMALES[valor].ejemplos[0]); // reinicia el segundo spinner
  }

  const ejemplosActuales = ANIMALES[categoria].ejemplos;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Animales — Spinner Anidado</Text>

      <Text style={styles.label}>Categoria:</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={categoria} onValueChange={onCategoriaChange} style={styles.picker}>
          <Picker.Item label="Vertebrados"   value="vertebrados" />
          <Picker.Item label="Invertebrados" value="invertebrados" />
        </Picker>
      </View>

      <Text style={styles.label}>Ejemplo de {ANIMALES[categoria].label}:</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={ejemplo} onValueChange={setEjemplo} style={styles.picker}>
          {ejemplosActuales.map((animal) => (
            <Picker.Item key={animal} label={animal} value={animal} />
          ))}
        </Picker>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Seleccionado:</Text>
        <Text style={styles.categoria}>{ANIMALES[categoria].label}</Text>
        <Text style={styles.animalNombre}>{ejemplo}</Text>
        <Text style={styles.info}>
          {categoria === 'vertebrados'
            ? 'Poseen columna vertebral (espina dorsal).'
            : 'No poseen columna vertebral.'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#F0FDF4' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#14532D', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 6, marginTop: 10 },
  pickerContainer: {
    backgroundColor: '#fff', borderRadius: 8, borderWidth: 1,
    borderColor: '#BBF7D0', marginBottom: 8, overflow: 'hidden',
  },
  picker: { height: 50 },
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 20,
    marginTop: 20, elevation: 3, alignItems: 'center',
  },
  cardTitulo: { fontSize: 14, color: '#555', marginBottom: 8 },
  categoria: { fontSize: 16, color: '#15803D', fontWeight: 'bold', marginBottom: 4 },
  animalNombre: { fontSize: 28, fontWeight: 'bold', color: '#14532D', marginBottom: 8 },
  info: { fontSize: 13, color: '#666', textAlign: 'center', fontStyle: 'italic' },
});
