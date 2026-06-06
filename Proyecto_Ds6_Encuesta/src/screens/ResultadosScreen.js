/**
 * ResultadosScreen.js
 * Tercera pantalla de la aplicación. Muestra los resultados de la votación
 * en tiempo real: por cada candidato se presenta su avatar, nombre, una barra
 * de progreso animada y el porcentaje de votos. Al final se muestra el total
 * de votos y un botón para iniciar una nueva consulta (vuelve al login).
 *
 * Autor: Angel Martínez - Cédula: 8-893-602
 * Asignatura: Herramientas Aplicadas IV - UTP
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import BarraProgreso from '../components/BarraProgreso';
import { candidatos } from '../data/candidatos';
import { useVotacion } from '../context/VotacionContext';
import { COLORS } from '../theme';

/**
 * ResultadosScreen
 * Pantalla de visualización de resultados de la votación.
 *
 * @param {object} props
 * @param {object} props.navigation - Objeto de navegación de React Navigation.
 */
export default function ResultadosScreen({ navigation }) {
  const { votos, totalVotos, getPorcentajes } = useVotacion();
  const porcentajes = getPorcentajes();

  /**
   * volverAlInicio
   * Regresa a la primera pantalla del stack (Login) para una nueva consulta.
   */
  const volverAlInicio = () => {
    navigation.popToTop();
  };

  return (
    <View style={styles.contenedor}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Título */}
        <Text style={styles.titulo}>Votos Escrutados</Text>

        {/* Resultado por candidato */}
        {candidatos.map((candidato) => (
          <View key={candidato.id} style={styles.fila}>
            <Image source={{ uri: candidato.imagen }} style={styles.avatar} />

            <View style={styles.filaContenido}>
              {/* Nombre y porcentaje */}
              <View style={styles.filaEncabezado}>
                <Text style={styles.nombre}>{candidato.nombre}</Text>
                <Text style={styles.porcentaje}>{porcentajes[candidato.id]}%</Text>
              </View>

              {/* Barra de progreso animada */}
              <BarraProgreso
                porcentaje={porcentajes[candidato.id]}
                color={COLORS.barFill}
              />

              {/* Conteo absoluto de votos del candidato */}
              <Text style={styles.conteo}>
                {votos[candidato.id]} voto(s)
              </Text>
            </View>
          </View>
        ))}

        {/* Total de votos */}
        <View style={styles.totalContenedor}>
          <Text style={styles.totalTexto}>Total votos: {totalVotos}</Text>
        </View>
      </ScrollView>

      {/* Botón Nueva consulta */}
      <TouchableOpacity style={styles.boton} onPress={volverAlInicio} activeOpacity={0.8}>
        <Text style={styles.botonTexto}>Nueva consulta</Text>
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
    marginBottom: 24,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 14,
    backgroundColor: COLORS.barBackground,
  },
  filaContenido: {
    flex: 1,
  },
  filaEncabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nombre: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  porcentaje: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  conteo: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 6,
  },
  totalContenedor: {
    marginTop: 10,
    alignItems: 'center',
  },
  totalTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  boton: {
    backgroundColor: COLORS.secondary,
    height: 54,
    margin: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonTexto: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: 'bold',
  },
});
