/**
 * VotacionScreen.js
 * Segunda pantalla de la aplicación. Muestra los cuatro candidatos a Rector
 * en una cuadrícula 2x2 mediante el componente CandidatoCard. El votante
 * selecciona un candidato (solo uno a la vez) y emite su voto. Al votar,
 * se registra en el contexto y se reemplaza la pantalla por la de resultados.
 *
 * Autor: Angel Martínez - Cédula: 8-893-602
 * Asignatura: Herramientas Aplicadas IV - UTP
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import CandidatoCard from '../components/CandidatoCard';
import { candidatos } from '../data/candidatos';
import { useVotacion } from '../context/VotacionContext';
import { COLORS } from '../theme';

/**
 * VotacionScreen
 * Pantalla de selección de candidato y emisión del voto.
 *
 * @param {object} props
 * @param {object} props.navigation - Objeto de navegación de React Navigation.
 * @param {object} props.route - Objeto de ruta; contiene route.params.cedula.
 */
export default function VotacionScreen({ navigation, route }) {
  // Cédula del votante recibida desde la pantalla de login.
  const { cedula } = route.params;
  const { registrarVoto } = useVotacion();

  // Id del candidato seleccionado (null si no hay selección).
  const [candidatoSeleccionado, setCandidatoSeleccionado] = useState(null);

  /**
   * seleccionarCandidato
   * Establece el candidato actualmente seleccionado. Solo permite uno a la vez.
   *
   * @param {number} id - Id del candidato a seleccionar.
   */
  const seleccionarCandidato = (id) => {
    setCandidatoSeleccionado(id);
  };

  /**
   * manejarVotar
   * Valida que haya un candidato seleccionado, registra el voto en el contexto
   * y reemplaza la pantalla actual por la de resultados (sin opción de volver).
   */
  const manejarVotar = () => {
    if (candidatoSeleccionado === null) {
      Alert.alert('Error', 'Seleccione un candidato');
      return;
    }

    registrarVoto(candidatoSeleccionado, cedula);
    navigation.replace('Resultados');
  };

  // Indica si el botón de votar debe estar deshabilitado.
  const botonDeshabilitado = candidatoSeleccionado === null;

  return (
    <View style={styles.contenedor}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Encabezado */}
        <Text style={styles.titulo}>Elecciones a Rector</Text>
        <Text style={styles.subtitulo}>Universidad Tecnológica de Panamá</Text>

        {/* Cédula del votante actual */}
        <View style={styles.cedulaContenedor}>
          <Text style={styles.cedulaEtiqueta}>Votante:</Text>
          <Text style={styles.cedulaValor}>{cedula}</Text>
        </View>

        {/* Cuadrícula 2x2 de candidatos */}
        <View style={styles.grid}>
          {candidatos.map((candidato) => (
            <View key={candidato.id} style={styles.celda}>
              <CandidatoCard
                nombre={candidato.nombre}
                imagen={candidato.imagen}
                seleccionado={candidatoSeleccionado === candidato.id}
                onPress={() => seleccionarCandidato(candidato.id)}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Botón Votar (deshabilitado hasta seleccionar un candidato) */}
      <TouchableOpacity
        style={[styles.boton, botonDeshabilitado && styles.botonDeshabilitado]}
        onPress={manejarVotar}
        disabled={botonDeshabilitado}
        activeOpacity={0.8}
      >
        <Text style={styles.botonTexto}>Votar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  cedulaContenedor: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cedulaEtiqueta: {
    fontSize: 15,
    color: COLORS.textLight,
    marginRight: 6,
  },
  cedulaValor: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  celda: {
    width: '48%',
    marginBottom: 16,
  },
  boton: {
    backgroundColor: COLORS.primary,
    height: 54,
    margin: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonDeshabilitado: {
    opacity: 0.5,
  },
  botonTexto: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: 'bold',
  },
});
