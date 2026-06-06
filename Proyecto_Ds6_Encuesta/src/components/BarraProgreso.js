/**
 * BarraProgreso.js
 * Componente reutilizable que muestra una barra de progreso horizontal animada.
 * Se usa en la pantalla de resultados para representar el porcentaje de votos
 * de cada candidato. El relleno se anima suavemente cuando cambia el porcentaje.
 *
 * Props:
 *   - porcentaje (number): valor de 0 a 100 que define el ancho del relleno.
 *   - color (string): color del relleno de la barra.
 *
 * Autor: Angel Martínez - Cédula: 8-893-602
 * Asignatura: Herramientas Aplicadas IV - UTP
 */

import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

/**
 * BarraProgreso
 * Renderiza una barra de fondo gris con un relleno animado proporcional
 * al porcentaje recibido.
 *
 * @param {object} props
 * @param {number} props.porcentaje - Porcentaje (0-100) de llenado.
 * @param {string} [props.color] - Color del relleno (por defecto COLORS.barFill).
 */
export default function BarraProgreso({ porcentaje, color = COLORS.barFill }) {
  // Valor animado que controla el ancho del relleno. Persiste entre renders.
  const anchoAnimado = useRef(new Animated.Value(0)).current;

  // Normaliza el porcentaje al rango válido [0, 100].
  const porcentajeSeguro = Math.max(0, Math.min(100, Math.round(porcentaje)));

  /**
   * Efecto que dispara la animación del ancho cada vez que cambia el porcentaje.
   * Animated.timing interpola el valor desde su estado actual hasta el nuevo.
   */
  useEffect(() => {
    Animated.timing(anchoAnimado, {
      toValue: porcentajeSeguro,
      duration: 600,
      useNativeDriver: false, // El ancho (layout) no es soportado por el native driver.
    }).start();
  }, [porcentajeSeguro, anchoAnimado]);

  // Interpola el valor numérico (0-100) a un string de porcentaje ('0%'-'100%').
  const anchoInterpolado = anchoAnimado.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.fondo}>
      <Animated.View
        style={[
          styles.relleno,
          { width: anchoInterpolado, backgroundColor: color },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fondo: {
    width: '100%',
    height: 14,
    backgroundColor: COLORS.barBackground,
    borderRadius: 7,
    overflow: 'hidden',
  },
  relleno: {
    height: '100%',
    borderRadius: 7,
  },
});
