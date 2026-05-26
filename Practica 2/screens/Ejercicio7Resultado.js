// Ejercicio 7 no tiene pantalla de resultado separada (calculo en tiempo real en la misma pantalla)
// Este archivo queda como placeholder para mantener consistencia con el navegador
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Ejercicio7Resultado() {
  return (
    <View style={styles.c}>
      <Text>El resultado se muestra en la pantalla anterior en tiempo real.</Text>
    </View>
  );
}
const styles = StyleSheet.create({ c: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 } });
