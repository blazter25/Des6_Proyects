import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const ejercicios = [
  { id: 1, titulo: 'Ej. 1 - Ley de Ohm con RadioButton y boton', screen: 'Ejercicio1' },
  { id: 2, titulo: 'Ej. 2 - Ley de Ohm sin boton (auto-calculo)', screen: 'Ejercicio2' },
  { id: 3, titulo: 'Ej. 3 - Ley de Ohm con Spinner (Picker)', screen: 'Ejercicio3' },
  { id: 4, titulo: 'Ej. 4 - Factorial / Fibonacci con RadioButton', screen: 'Ejercicio4' },
  { id: 5, titulo: 'Ej. 5 - Factorial / Fibonacci con Spinner', screen: 'Ejercicio5' },
  { id: 6, titulo: 'Ej. 6 - Panfoto (if isChecked)', screen: 'Ejercicio6' },
  { id: 7, titulo: 'Ej. 7 - Panfoto (OnCheckedChangeListener)', screen: 'Ejercicio7' },
  { id: 8, titulo: 'Ej. 8 - Animales: Spinner anidado', screen: 'Ejercicio8' },
  { id: 9, titulo: 'Ej. 9 - Orden de Comida con descuento jubilado', screen: 'Ejercicio9' },
  { id: 10, titulo: 'Ej. 10 - Restaurante Tedy (Combos)', screen: 'Ejercicio10' },
];

export default function MenuPrincipal({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.universidad}>Universidad Tecnologica de Panama</Text>
        <Text style={styles.materia}>Programacion Movil - Practica #2</Text>
        <Text style={styles.alumno}>Angel Martinez  |  8-893-602</Text>
        <Text style={styles.profesora}>Prof. Marlina Sanchez</Text>
      </View>

      {ejercicios.map((ej) => (
        <TouchableOpacity
          key={ej.id}
          style={styles.boton}
          onPress={() => navigation.navigate(ej.screen)}
          activeOpacity={0.7}
        >
          <Text style={styles.botonTexto}>{ej.titulo}</Text>
        </TouchableOpacity>
      ))}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
    padding: 16,
  },
  header: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  universidad: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  materia: {
    color: '#BFDBFE',
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
  alumno: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  profesora: {
    color: '#BFDBFE',
    fontSize: 12,
    marginTop: 2,
  },
  boton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  botonTexto: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '500',
  },
});
