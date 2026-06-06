/**
 * LoginScreen.js
 * Primera pantalla de la aplicación. Permite al votante identificarse mediante
 * su cédula. Valida que el campo no esté vacío, que la cédula tenga formato
 * válido, que esté registrada en el padrón y que no haya votado previamente.
 * Si todas las validaciones pasan, navega a la pantalla de votación.
 *
 * Autor: Angel Martínez - Cédula: 8-893-602
 * Asignatura: Herramientas Aplicadas IV - UTP
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { esCedulaPanamenaValida } from '../data/cedulas';
import { useVotacion } from '../context/VotacionContext';
import { COLORS } from '../theme';

/**
 * validarFormatoCedula
 * Verifica que la cédula tenga un formato aceptable: que contenga guiones
 * y al menos 7 dígitos numéricos.
 *
 * @param {string} cedula - Cédula a validar.
 * @returns {boolean} true si el formato es válido.
 */
function validarFormatoCedula(cedula) {
  const tieneGuiones = cedula.includes('-');
  const cantidadDigitos = (cedula.match(/\d/g) || []).length;
  return tieneGuiones && cantidadDigitos >= 7;
}

/**
 * cedulaEstaRegistrada
 * Indica si una cédula pertenece al padrón electoral. El padrón acepta
 * cualquier cédula con formato panameño válido (todas las combinaciones
 * posibles), por lo que la verificación se hace contra dicho formato.
 *
 * @param {string} cedula - Cédula a buscar.
 * @returns {boolean} true si la cédula está habilitada en el padrón.
 */
function cedulaEstaRegistrada(cedula) {
  return esCedulaPanamenaValida(cedula);
}

/**
 * LoginScreen
 * Pantalla de inicio de sesión / identificación del votante.
 *
 * @param {object} props
 * @param {object} props.navigation - Objeto de navegación de React Navigation.
 */
export default function LoginScreen({ navigation }) {
  const [cedula, setCedula] = useState('');
  const { yaVoto } = useVotacion();

  /**
   * manejarVotar
   * Ejecuta la secuencia de validaciones sobre la cédula ingresada y,
   * si todas se cumplen, navega a la pantalla de votación pasando la cédula.
   */
  const manejarVotar = () => {
    const cedulaLimpia = cedula.trim();

    // 1. Campo vacío.
    if (cedulaLimpia === '') {
      Alert.alert('Error', 'Ingrese su cédula');
      return;
    }

    // 2. Formato de cédula inválido.
    if (!validarFormatoCedula(cedulaLimpia)) {
      Alert.alert('Error', 'Formato de cédula inválido (ejemplo: 8-123-456)');
      return;
    }

    // 3. Cédula no registrada en el padrón.
    if (!cedulaEstaRegistrada(cedulaLimpia)) {
      Alert.alert('Error', 'Cédula no registrada');
      return;
    }

    // 4. Cédula que ya emitió su voto.
    if (yaVoto(cedulaLimpia)) {
      Alert.alert('Error', 'Esta cédula ya emitió su voto');
      return;
    }

    // 5. Todo correcto: navegar a la votación con la cédula como parámetro.
    navigation.navigate('Votacion', { cedula: cedulaLimpia });
    setCedula('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.contenedor}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.contenido}>
        {/* Logo institucional (placeholder desde picsum.photos) */}
        <Image
          source={{ uri: 'https://picsum.photos/seed/utp/120/120' }}
          style={styles.logo}
        />

        {/* Título y subtítulo */}
        <Text style={styles.titulo}>Sistema de Votación</Text>
        <Text style={styles.subtitulo}>Universidad Tecnológica de Panamá</Text>

        {/* Campo de cédula */}
        <TextInput
          style={styles.input}
          placeholder="Ingrese su cédula (X-XXX-XXXX)"
          placeholderTextColor={COLORS.textLight}
          value={cedula}
          onChangeText={setCedula}
          autoCapitalize="none"
          keyboardType="default"
        />

        {/* Botón Votar */}
        <TouchableOpacity style={styles.boton} onPress={manejarVotar} activeOpacity={0.8}>
          <Text style={styles.botonTexto}>Votar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
    backgroundColor: COLORS.barBackground,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 15,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 36,
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.barBackground,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 20,
  },
  boton: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.primary,
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
