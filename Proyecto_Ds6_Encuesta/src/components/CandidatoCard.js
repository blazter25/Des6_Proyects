/**
 * CandidatoCard.js
 * Tarjeta reutilizable que representa a un candidato en la pantalla de votación.
 * Muestra el avatar circular del candidato y su nombre. Cuando está seleccionada,
 * resalta el borde con el color primario y muestra un checkmark (✓).
 *
 * Props:
 *   - nombre (string): nombre del candidato.
 *   - imagen (string): URL del avatar del candidato.
 *   - seleccionado (boolean): indica si la tarjeta está seleccionada.
 *   - onPress (function): callback al presionar la tarjeta.
 *
 * Autor: Angel Martínez - Cédula: 8-893-602
 * Asignatura: Herramientas Aplicadas IV - UTP
 */

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme';

/**
 * CandidatoCard
 * Renderiza la tarjeta de un candidato seleccionable.
 *
 * @param {object} props
 * @param {string} props.nombre - Nombre del candidato.
 * @param {string} props.imagen - URL de la imagen/avatar.
 * @param {boolean} props.seleccionado - Estado de selección de la tarjeta.
 * @param {Function} props.onPress - Función a ejecutar al presionar.
 */
export default function CandidatoCard({ nombre, imagen, seleccionado, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.tarjeta, seleccionado && styles.tarjetaSeleccionada]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Indicador de selección (checkmark) en la esquina superior derecha */}
      {seleccionado && (
        <View style={styles.checkContenedor}>
          <Ionicons name="checkmark-circle" size={26} color={COLORS.success} />
        </View>
      )}

      {/* Avatar circular del candidato */}
      <Image source={{ uri: imagen }} style={styles.avatar} />

      {/* Nombre del candidato */}
      <Text style={styles.nombre}>{nombre}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
    // Sombra para dar profundidad a la tarjeta.
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tarjetaSeleccionada: {
    borderColor: COLORS.selected,
  },
  checkContenedor: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 1,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor: COLORS.barBackground,
  },
  nombre: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
});
