// ============================================================================
//  App.js — Componente principal de la app "Venta de Auto"
//  Estudiante: Angel Martínez   Cédula: 8-893-602
//  Materia: Desarrollo de Software VI (DS6)   Proyecto #1
//  ----------------------------------------------------------------------------
//  NOTA PARA LA SUSTENTACIÓN: las líneas marcadas con  <-- CAMBIAR  son las que
//  la profesora puede pedirte modificar en vivo (textos, colores, fórmulas,
//  porcentajes, etc.). Ahí se explica qué tendrías que tocar.
// ============================================================================

import React, { useState } from 'react';          // React + el hook useState (para guardar datos que cambian en pantalla)
import {
  StyleSheet,          // Permite crear los estilos (como el CSS) de la app
  Text,                // Componente para mostrar texto en pantalla
  View,                // Contenedor / caja (equivale a un <div> en web)
  TextInput,           // Caja de texto donde el usuario escribe (costo, salario)
  Image,               // Componente para mostrar imágenes (lo usa el bloque de imagen comentado más abajo)
  TouchableOpacity,    // Botón presionable que se atenúa al tocarlo
  ScrollView,          // Contenedor con scroll (permite desplazar la pantalla)
  KeyboardAvoidingView,// Evita que el teclado tape los campos al escribir
  Platform,            // Detecta el sistema operativo (iOS / Android / web)
} from 'react-native';                              // Todo lo anterior viene de React Native
import { StatusBar } from 'expo-status-bar';        // Barra superior del sistema (hora, batería, señal)

// --- CONSTANTES DE LA LÓGICA DEL NEGOCIO -----------------------------------
// Estas 5 constantes definen toda la "matemática" del proyecto. Son las primeras
// candidatas a que la profesora te pida cambiar valores en la defensa.
const ANIOS_CREDITO = 9;          // <-- CAMBIAR: cantidad de años del crédito (n en la fórmula de interés compuesto)
const TASA_INTERES = 0.08;        // <-- CAMBIAR: tasa de interés anual del crédito (0.08 = 8%)
const ITBM = 0.07;                // <-- CAMBIAR: impuesto ITBM (0.07 = 7%)
const AUMENTO_AUTOMATICA = 1500;  // <-- CAMBIAR: monto extra que se suma si la transmisión es Automática ($1500.00)
const PORCENTAJE_SALARIO = 0.30;  // <-- CAMBIAR: porción del salario que puede destinarse a la letra (0.30 = 30%)

// Función que da formato de moneda a un número: separa miles y deja 2 decimales.
const formatear = (n) =>
  Number(n).toLocaleString('es-PA', {   // <-- CAMBIAR: 'es-PA' es el formato regional de Panamá; cámbialo si piden otro país
    minimumFractionDigits: 2,           // Mínimo de decimales a mostrar (siempre 2)
    maximumFractionDigits: 2,           // Máximo de decimales a mostrar (siempre 2)
  });

// --- COMPONENTE Row: muestra una fila "etiqueta : valor" en los resultados ---
function Row({ k, v, bold }) {            // Recibe: k=clave/etiqueta, v=valor, bold=si va en negrita
  return (
    <View style={styles.row}>            {/* Caja que ordena la clave y el valor en una fila */}
      <Text style={[styles.rowKey, bold && styles.bold]}>{k}</Text>   {/* Texto de la izquierda (la etiqueta) */}
      <Text style={[styles.rowVal, bold && styles.bold]}>{v}</Text>   {/* Texto de la derecha (el valor) */}
    </View>
  );
}

// --- COMPONENTE Radio: un botón de opción (círculo seleccionable) ------------
function Radio({ selected, label, onPress, color, dimmed }) {  // selected=si está marcado, label=texto, onPress=acción, color=color, dimmed=atenuado
  // `dimmed` solo atenúa visualmente la opción (transparencia), pero NO la deshabilita:
  // el TouchableOpacity sigue respondiendo al onPress, por lo que continúa siendo seleccionable.
  return (
    <TouchableOpacity
      style={[styles.radioRow, dimmed && styles.radioDimmed]}  // Estilo de la fila; si dimmed=true se ve atenuada
      onPress={onPress}                                        // Qué hacer al tocar (lo define quien usa el Radio)
      activeOpacity={0.7}                                      // <-- CAMBIAR: opacidad al presionar (0.7 = se atenúa al 70%)
    >
      <View style={[styles.radioOuter, { borderColor: color }]}>          {/* Círculo exterior (borde) del radio */}
        {selected ? <View style={[styles.radioInner, { backgroundColor: color }]} /> : null}  {/* Punto interior: solo aparece si está seleccionado */}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>           {/* Texto que acompaña al radio (ej. "Manual") */}
    </TouchableOpacity>
  );
}

// --- COMPONENTE PRINCIPAL: App ----------------------------------------------
export default function App() {
  // useState crea una "variable de estado": cuando cambia, la pantalla se redibuja.
  const [costo, setCosto] = useState('');               // Texto del campo Costo (empieza vacío)
  const [salario, setSalario] = useState('');           // Texto del campo Salario (empieza vacío)
  const [transmision, setTransmision] = useState('manual');   // <-- CAMBIAR: opción de transmisión por defecto ('manual' o 'automatica')
  const [formaPago, setFormaPago] = useState('contado');      // <-- CAMBIAR: forma de pago por defecto ('contado' o 'credito')
  const [resultado, setResultado] = useState(null);     // Guarda el resultado del cálculo (null = aún no se calcula nada)
  const [error, setError] = useState('');               // Mensaje de error a mostrar (vacío = sin error)

  // --- FUNCIÓN calcular: se ejecuta al presionar el botón "Calcular" ---------
  const calcular = () => {
    setError('');            // Limpia errores anteriores
    setResultado(null);      // Borra el resultado anterior

    const costoNum = parseFloat(costo);   // Convierte el texto del costo a número decimal

    if (isNaN(costoNum) || costoNum <= 0) {                 // Si no es un número o es menor/igual a 0...
      setError('Ingrese un costo válido (mayor a 0).');     // <-- CAMBIAR: mensaje de error del costo inválido
      return;                                               // ...detiene la función (no calcula nada)
    }

    let precioBase = costoNum;                  // El precio base inicial es el costo ingresado
    if (transmision === 'automatica') {         // Si la transmisión es Automática...
      precioBase += AUMENTO_AUTOMATICA;         // ...se le suma el aumento (1500)
    }

    // ----- CASO 1: PAGO DE CONTADO -----
    if (formaPago === 'contado') {
      const impuesto = precioBase * ITBM;       // Calcula el ITBM (7% del precio base)
      const granTotal = precioBase + impuesto;  // Gran total = precio base + impuesto
      setResultado({                            // Guarda el resultado para mostrarlo en pantalla
        tipo: 'contado',                        // Marca que es un resultado de contado
        costo: precioBase,
        impuesto,
        granTotal,
      });
      return;                                   // Termina aquí (ya calculó el contado)
    }

    // ----- CASO 2: PAGO A CRÉDITO -----
    // El crédito usa el salario para evaluar la aprobación.
    // Si el salario es inválido o 0, se avisa PERO igual se muestra el resultado:
    // se toma como 0, por lo que el 30% del salario es 0 y queda NO APROBADO.
    let salarioNum = parseFloat(salario);                  // Convierte el texto del salario a número
    if (isNaN(salarioNum) || salarioNum <= 0) {            // Si el salario es inválido o <= 0...
      setError('Ingrese un salario mayor a 0.');           // <-- CAMBIAR: mensaje de error del salario inválido
      salarioNum = 0;                                      // ...lo trata como 0 (así quedará NO APROBADO)
    }

    // Fórmula de interés compuesto:  Cf = Ci * (1 + r)^n
    const capitalConInteres = precioBase * Math.pow(1 + TASA_INTERES, ANIOS_CREDITO);  // <-- CAMBIAR: aquí está la fórmula del interés compuesto
    const itbm = capitalConInteres * ITBM;                 // ITBM sobre el capital con interés
    const capitalFinal = capitalConInteres + itbm;         // Capital final = capital con interés + ITBM
    const letraMensual = capitalFinal / (ANIOS_CREDITO * 12);  // <-- CAMBIAR: número de cuotas; 9 años x 12 meses = 108 letras
    const treintaSalario = salarioNum * PORCENTAJE_SALARIO;    // 30% del salario del cliente
    const aprobado = treintaSalario >= letraMensual;       // <-- CAMBIAR: regla de aprobación (30% del salario debe cubrir la letra)

    setResultado({                  // Guarda el resultado del crédito para mostrarlo
      tipo: 'credito',              // Marca que es un resultado de crédito
      costo: precioBase,
      capitalConInteres,
      itbm,
      capitalFinal,
      letraMensual,
      treintaSalario,
      aprobado,
    });
  };

  // --- FUNCIÓN limpiar: se ejecuta al presionar el botón "Limpiar" -----------
  const limpiar = () => {
    setCosto('');                 // Vacía el campo Costo
    setSalario('');               // Vacía el campo Salario
    setTransmision('manual');     // <-- CAMBIAR: valor al que regresa la transmisión al limpiar
    setFormaPago('contado');      // <-- CAMBIAR: valor al que regresa la forma de pago al limpiar
    setResultado(null);           // Borra el resultado mostrado
    setError('');                 // Borra el mensaje de error
  };

  // El salario solo se usa para evaluar el crédito (letra <= 30% del salario).
  // Se deshabilita en transmisión Manual, EXCEPTO cuando el pago es a Crédito.
  const salarioDeshabilitado = transmision === 'manual' && formaPago !== 'credito';  // <-- CAMBIAR: condición que deshabilita el campo Salario

  // --- INTERFAZ VISUAL (lo que se dibuja en pantalla) ------------------------
  return (
    <KeyboardAvoidingView
      style={styles.safe}                                            // Estilo del contenedor general (fondo gris)
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}       // En iOS empuja el contenido al subir el teclado
    >
      <StatusBar style="light" />     {/* <-- CAMBIAR: color de íconos de la barra de estado ('light' u 'dark') */}
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">  {/* Permite hacer scroll y tocar botones con el teclado abierto */}
        <View style={styles.phoneFrame}>      {/* Marco negro que simula un celular */}
          <View style={styles.phoneNotch} />  {/* Pequeña barra (notch) decorativa arriba del celular */}
          <View style={styles.screen}>        {/* "Pantalla" blanca interna del celular */}
            <Text style={styles.title}>Venta de Auto</Text>          {/* <-- CAMBIAR: título principal que se muestra en pantalla */}

            {/* ========================================================================= */}
            {/*  IMAGEN — Para mostrar una imagen, DESCOMENTA el bloque que necesites.    */}
            {/*  PASO 1: copia tu imagen dentro de la carpeta  assets/images             */}
            {/*  PASO 2: descomenta UNA de las dos opciones de abajo y pon tu archivo/URL */}
            {/* ------------------------------------------------------------------------- */}

            {/* OPCIÓN A — Imagen LOCAL (archivo guardado en assets/images):              */}
            {/* <Image
                  source={require('./assets/images/AQUI-EL-NOMBRE.png')}  // <-- CAMBIAR: nombre de tu archivo en assets/images
                  style={styles.imagen}
                  resizeMode="contain"
                /> */}

            {/* OPCIÓN B — Imagen por URL (foto que está en internet):                    */}
            {/* <Image
                  source={{ uri: 'https://AQUI-PEGA-EL-URL.jpg' }}        // <-- CAMBIAR: pega aquí el URL de la imagen
                  style={styles.imagen}
                  resizeMode="contain"
                /> */}
            {/* ========================================================================= */}

            <Text style={styles.label}>Costo:</Text>                 {/* <-- CAMBIAR: etiqueta del primer campo */}
            <TextInput
              style={styles.input}              // Estilo de la caja de texto
              keyboardType="numeric"            // <-- CAMBIAR: tipo de teclado (numeric = solo números)
              placeholder="0.00"                // <-- CAMBIAR: texto guía que aparece cuando el campo está vacío
              value={costo}                     // Muestra lo que hay guardado en "costo"
              onChangeText={setCosto}           // Cada vez que escribes, guarda el texto en "costo"
            />

            <Text style={[styles.label, salarioDeshabilitado && styles.labelDisabled]}>  {/* Etiqueta del salario; se atenúa si está deshabilitado */}
              Salario:                                              {/* <-- CAMBIAR: etiqueta del segundo campo */}
            </Text>
            <TextInput
              style={[styles.input, salarioDeshabilitado && styles.inputDisabled]}  // Estilo normal o atenuado según corresponda
              keyboardType="numeric"            // Teclado numérico
              placeholder="0.00"                // <-- CAMBIAR: texto guía del campo salario
              value={salario}                   // Muestra lo guardado en "salario"
              onChangeText={setSalario}         // Guarda lo que se escribe en "salario"
              editable={!salarioDeshabilitado}  // Si está deshabilitado, no se puede escribir
            />
            {salarioDeshabilitado ? (           // Si el salario está deshabilitado, muestra una pista...
              <Text style={styles.hint}>El salario se deshabilita en Manual con pago de Contado.</Text>  // <-- CAMBIAR: texto de ayuda/pista
            ) : null}                          

            <Text style={styles.section}>Transmisión:</Text>        {/* <-- CAMBIAR: título de la sección de transmisión */}
            <Radio
              color="#2D9CDB"                    // <-- CAMBIAR: color del radio de transmisión (azul)
              selected={transmision === 'manual'}// Marcado si la transmisión actual es 'manual'
              label="Manual"                     // <-- CAMBIAR: texto de la opción
              onPress={() => setTransmision('manual')}   // Al tocar, cambia la transmisión a 'manual'
            />
            <Radio
              color="#2D9CDB"                    // <-- CAMBIAR: color del radio (debe combinar con el de arriba)
              selected={transmision === 'automatica'}    // Marcado si la transmisión es 'automatica'
              label="Automática"                 // <-- CAMBIAR: texto de la opción
              onPress={() => setTransmision('automatica')}  // Al tocar, cambia a 'automatica'
              dimmed={transmision === 'manual'}  // Se ve atenuada cuando la opción activa es Manual (solo visual)
            />

            <Text style={styles.section}>Forma de pago:</Text>      {/* <-- CAMBIAR: título de la sección de forma de pago */}
            <Radio
              color="#D35400"                    // <-- CAMBIAR: color del radio de forma de pago (naranja)
              selected={formaPago === 'credito'} // Marcado si la forma de pago es 'credito'
              label="Crédito"                    // <-- CAMBIAR: texto de la opción
              onPress={() => setFormaPago('credito')}    // Al tocar, cambia a 'credito'
            />
            <Radio
              color="#D35400"                    // <-- CAMBIAR: color del radio (combina con el de arriba)
              selected={formaPago === 'contado'} // Marcado si la forma de pago es 'contado'
              label="Contado"                    // <-- CAMBIAR: texto de la opción
              onPress={() => setFormaPago('contado')}    // Al tocar, cambia a 'contado'
            />

            <View style={styles.buttonsRow}>     {/* Fila que contiene los dos botones */}
              <TouchableOpacity style={styles.btnPrimary} onPress={calcular}>   {/* Botón azul que ejecuta calcular() */}
                <Text style={styles.btnText}>Calcular</Text>        {/* <-- CAMBIAR: texto del botón principal */}
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSecondary} onPress={limpiar}>  {/* Botón gris que ejecuta limpiar() */}
                <Text style={styles.btnTextSecondary}>Limpiar</Text>{/* <-- CAMBIAR: texto del botón secundario */}
              </TouchableOpacity>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}   {/* Si hay error, lo muestra en rojo; si no, nada */}

            {/* ----- BLOQUE DE RESULTADO PARA CONTADO ----- */}
            {resultado && resultado.tipo === 'contado' ? (    // Se muestra solo si hay resultado y es de tipo 'contado'
              <View style={styles.resultBox}>
                <Text style={styles.resultTitle}>Resultado (Contado)</Text>   {/* <-- CAMBIAR: título del recuadro de resultado */}
                <Row k="Costo:" v={`B/. ${formatear(resultado.costo)}`} />          {/* <-- CAMBIAR: 'B/.' es el símbolo del Balboa (moneda de Panamá) */}
                <Row k="Impuesto (7%):" v={`B/. ${formatear(resultado.impuesto)}`} />  {/* <-- CAMBIAR: etiqueta del impuesto (actualizar % si cambias ITBM) */}
                <Row k="Gran Total:" v={`B/. ${formatear(resultado.granTotal)}`} bold />  {/* Fila del gran total, en negrita */}
              </View>
            ) : null}

            {/* ----- BLOQUE DE RESULTADO PARA CRÉDITO ----- */}
            {resultado && resultado.tipo === 'credito' ? (    // Se muestra solo si hay resultado y es de tipo 'credito'
              <View style={styles.resultBox}>
                <Text style={styles.resultTitle}>Resultado (Crédito)</Text>   {/* <-- CAMBIAR: título del recuadro de crédito */}
                <Text
                  style={[
                    styles.estado,
                    { color: resultado.aprobado ? '#27AE60' : '#C0392B' },  // <-- CAMBIAR: colores APROBADO (verde) / NO APROBADO (rojo)
                  ]}
                >
                  {resultado.aprobado ? 'APROBADO' : 'NO APROBADO'}  {/* <-- CAMBIAR: textos del veredicto del crédito */}
                </Text>
                <Row
                  k="Total a pagar:"                              // <-- CAMBIAR: etiqueta del total a pagar
                  v={`B/. ${formatear(resultado.capitalFinal)}`}
                  bold
                />
                <Row k="Letra:" v={`B/. ${formatear(resultado.letraMensual)}`} />          {/* <-- CAMBIAR: etiqueta de la cuota mensual */}
                <Row
                  k="30% del salario:"                            // <-- CAMBIAR: etiqueta (actualizar % si cambias PORCENTAJE_SALARIO)
                  v={`B/. ${formatear(resultado.treintaSalario)}`}
                />
              </View>
            ) : null}
          </View>
        </View>

        <Text style={styles.footer}>
        {'\n'}Desarrollo de Software VI · Proyecto #1   {/* <-- CAMBIAR: pie de página con tus datos (nombre, cédula, materia) */}
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ============================================================================
//  ESTILOS — Aquí se define la apariencia (colores, tamaños, márgenes).
//  Todo este bloque es "personalizable": la profe puede pedir cambiar colores,
//  tamaños de letra, bordes, etc. Las marcas señalan los más probables.
// ============================================================================
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E5E7EB' },   // <-- CAMBIAR: color de fondo general de la app (gris claro)
  scroll: { padding: 16, alignItems: 'center' },   // Relleno interno y centrado del contenido con scroll
  phoneFrame: {                                    // Marco negro tipo celular
    width: '100%',                                 // Ocupa todo el ancho disponible
    maxWidth: 380,                                 // <-- CAMBIAR: ancho máximo del "celular" en pantalla
    backgroundColor: '#111',                       // <-- CAMBIAR: color del marco del celular (casi negro)
    borderRadius: 36,                              // <-- CAMBIAR: redondeo de las esquinas del marco
    padding: 14,                                   // Relleno interno del marco
    paddingTop: 22,                                // Relleno extra arriba
    paddingBottom: 26,                             // Relleno extra abajo
    shadowColor: '#000',                           // Color de la sombra
    shadowOpacity: 0.25,                           // Qué tan visible es la sombra (25%)
    shadowRadius: 12,                              // Difuminado de la sombra
    shadowOffset: { width: 0, height: 6 },         // Desplazamiento de la sombra
    elevation: 6,                                  // Sombra en Android (nivel de elevación)
  },
  phoneNotch: {                                    // Barrita decorativa (notch) del celular
    alignSelf: 'center',                           // Centrada horizontalmente
    width: 70,                                     // Ancho del notch
    height: 6,                                     // Alto del notch
    borderRadius: 3,                               // Esquinas redondeadas
    backgroundColor: '#444',                       // <-- CAMBIAR: color del notch (gris oscuro)
    marginBottom: 14,                              // Espacio debajo del notch
  },
  screen: {                                        // Pantalla blanca interna
    backgroundColor: '#FFFFFF',                    // <-- CAMBIAR: color de la "pantalla" interna (blanco)
    borderRadius: 22,                              // Redondeo de esquinas de la pantalla
    padding: 18,                                   // Relleno interno
  },
  title: {                                         // Estilo del título "Venta de Auto"
    fontSize: 22,                                  // <-- CAMBIAR: tamaño de letra del título
    fontWeight: '700',                             // Grosor de la letra (negrita)
    textAlign: 'center',                           // Texto centrado
    marginBottom: 14,                              // Espacio debajo del título
    color: '#1F2937',                              // <-- CAMBIAR: color del título
  },
  imagen: {                                        // Estilo de la imagen (lo usa el bloque de imagen comentado de arriba)
    width: '100%',                                 // <-- CAMBIAR: ancho de la imagen ('100%' = todo el ancho disponible)
    height: 160,                                   // <-- CAMBIAR: alto de la imagen en píxeles
    borderRadius: 12,                              // <-- CAMBIAR: redondeo de las esquinas de la imagen
    marginBottom: 14,                              // Espacio debajo de la imagen
  },
  label: {                                         // Estilo de las etiquetas "Costo:" y "Salario:"
    fontSize: 14,                                  // Tamaño de letra
    fontWeight: '600',                             // Semi-negrita
    color: '#374151',                              // <-- CAMBIAR: color de las etiquetas
    marginTop: 8,                                  // Espacio arriba
  },
  input: {                                         // Estilo de las cajas de texto
    borderBottomWidth: 1.5,                        // Grosor de la línea inferior
    borderBottomColor: '#9CA3AF',                  // <-- CAMBIAR: color de la línea inferior del input
    fontSize: 16,                                  // Tamaño del texto que escribe el usuario
    paddingVertical: 6,                            // Relleno arriba/abajo
    marginBottom: 4,                               // Espacio debajo del input
    color: '#111',                                 // Color del texto escrito
  },
  inputDisabled: {                                 // Estilo extra cuando el input está deshabilitado
    // Apariencia de campo deshabilitado (atenuado y no editable).
    opacity: 0.45,                                 // Lo hace semitransparente
    backgroundColor: '#F3F4F6',                    // Fondo gris muy claro
    borderBottomColor: '#D1D5DB',                  // Línea inferior más clara
    color: '#9CA3AF',                              // Texto gris
  },
  labelDisabled: {                                 // Estilo extra de la etiqueta cuando está deshabilitada
    color: '#9CA3AF',                              // La pone en gris
  },
  hint: {                                          // Estilo del texto de ayuda/pista
    fontSize: 11,                                  // Tamaño pequeño
    color: '#9CA3AF',                              // Color gris
    fontStyle: 'italic',                           // En cursiva
    marginBottom: 2,                               // Espacio abajo
  },
  section: {                                       // Estilo de los títulos de sección ("Transmisión:", "Forma de pago:")
    marginTop: 14,                                 // Espacio arriba
    marginBottom: 2,                               // Espacio abajo
    fontSize: 14,                                  // Tamaño de letra
    fontWeight: '700',                             // Negrita
    color: '#374151',                              // <-- CAMBIAR: color de los títulos de sección
  },
  radioRow: {                                      // Fila de cada opción tipo radio
    flexDirection: 'row',                          // Coloca el círculo y el texto en línea
    alignItems: 'center',                          // Alineados verticalmente al centro
    paddingVertical: 6,                            // Relleno arriba/abajo
  },
  radioDimmed: {                                   // Estilo cuando un radio se ve atenuado
    // Solo apariencia: la opción se ve transparente/atenuada pero sigue siendo seleccionable.
    opacity: 0.35,                                 // <-- CAMBIAR: nivel de transparencia del radio atenuado
  },
  radioOuter: {                                    // Círculo exterior del radio
    width: 20,                                     // Ancho
    height: 20,                                    // Alto
    borderRadius: 10,                              // Lo vuelve un círculo (mitad del ancho)
    borderWidth: 2,                                // Grosor del borde
    alignItems: 'center',                          // Centra el punto interior
    justifyContent: 'center',                      // Centra el punto interior
    marginRight: 10,                               // Espacio a la derecha (entre círculo y texto)
  },
  radioInner: {                                    // Punto interior del radio (cuando está marcado)
    width: 10,                                     // Ancho
    height: 10,                                    // Alto
    borderRadius: 5,                               // Lo vuelve un círculo
  },
  radioLabel: {                                    // Texto al lado de cada radio
    fontSize: 15,                                  // Tamaño de letra
    color: '#1F2937',                              // Color del texto
  },
  buttonsRow: {                                    // Fila que contiene los botones Calcular/Limpiar
    flexDirection: 'row',                          // En línea, uno al lado del otro
    marginTop: 18,                                 // Espacio arriba
    gap: 10,                                        // Espacio entre los dos botones
  },
  btnPrimary: {                                    // Botón principal "Calcular"
    flex: 1,                                        // Ocupa la mitad del espacio disponible
    backgroundColor: '#2D9CDB',                    // <-- CAMBIAR: color de fondo del botón Calcular (azul)
    paddingVertical: 12,                           // Alto interno
    borderRadius: 10,                              // Esquinas redondeadas
    alignItems: 'center',                          // Centra el texto
  },
  btnSecondary: {                                  // Botón secundario "Limpiar"
    flex: 1,                                        // Ocupa la otra mitad
    backgroundColor: '#F3F4F6',                    // <-- CAMBIAR: color de fondo del botón Limpiar (gris claro)
    paddingVertical: 12,                           // Alto interno
    borderRadius: 10,                              // Esquinas redondeadas
    alignItems: 'center',                          // Centra el texto
    borderWidth: 1,                                // Borde fino
    borderColor: '#D1D5DB',                        // Color del borde
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },          // <-- CAMBIAR: color/tamaño del texto del botón Calcular
  btnTextSecondary: { color: '#374151', fontWeight: '700', fontSize: 15 },  // <-- CAMBIAR: color/tamaño del texto del botón Limpiar
  error: {                                         // Estilo del mensaje de error
    color: '#C0392B',                              // <-- CAMBIAR: color del texto de error (rojo)
    marginTop: 10,                                 // Espacio arriba
    textAlign: 'center',                           // Centrado
    fontWeight: '600',                             // Semi-negrita
  },
  resultBox: {                                     // Recuadro que envuelve los resultados
    marginTop: 18,                                 // Espacio arriba
    padding: 14,                                   // Relleno interno
    backgroundColor: '#F9FAFB',                    // <-- CAMBIAR: color de fondo del recuadro de resultado
    borderRadius: 12,                              // Esquinas redondeadas
    borderWidth: 1,                                // Borde fino
    borderColor: '#E5E7EB',                        // Color del borde
  },
  resultTitle: {                                   // Título dentro del recuadro de resultado
    fontWeight: '700',                             // Negrita
    fontSize: 15,                                  // Tamaño
    marginBottom: 8,                               // Espacio abajo
    color: '#111827',                              // Color
    textAlign: 'center',                           // Centrado
  },
  row: {                                           // Fila etiqueta-valor de los resultados
    flexDirection: 'row',                          // En línea
    justifyContent: 'space-between',               // Etiqueta a la izquierda, valor a la derecha
    paddingVertical: 3,                            // Relleno arriba/abajo
  },
  rowKey: { color: '#374151', fontSize: 14 },                       // Estilo de la etiqueta (izquierda)
  rowVal: { color: '#111827', fontSize: 14, fontWeight: '600' },    // Estilo del valor (derecha)
  bold: { fontWeight: '800' },                                      // Estilo extra para resaltar en negrita
  estado: {                                        // Estilo del texto APROBADO / NO APROBADO
    marginTop: 10,                                 // Espacio arriba
    fontSize: 20,                                  // <-- CAMBIAR: tamaño del veredicto del crédito
    fontWeight: '800',                             // Negrita fuerte
    textAlign: 'center',                           // Centrado
    letterSpacing: 1,                              // Separación entre letras
  },
  footer: {                                        // Estilo del pie de página (tus datos)
    marginTop: 16,                                 // Espacio arriba
    fontSize: 12,                                  // Tamaño pequeño
    color: '#6B7280',                              // <-- CAMBIAR: color del pie de página
    textAlign: 'center',                           // Centrado
  },
});
