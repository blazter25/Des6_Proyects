# Practica #2 - Programacion Movil

**Universidad Tecnologica de Panama**
Facultad de Ingenieria de Sistemas Computacionales
Departamento de Programacion

**Estudiante:** Angel Martinez
**Cedula:** 8-893-602
**Profesora:** Marlina Sanchez
**Materia:** Programacion Movil (Desarrollo de Software VI)
**Fecha:** Mayo 2026

---

## Descripcion

Aplicacion React Native + Expo que implementa los 10 ejercicios de la Practica #2.
Todos los ejercicios se acceden desde un menu principal y cada uno navega a su pantalla de resultado (equivalente a Intent explicito entre Activities en Android).

## Ejercicios implementados

| # | Descripcion | Componentes principales |
|---|-------------|------------------------|
| 1 | Ley de Ohm con RadioButton y boton Calcular | RadioButton (manual), Intent |
| 2 | Ley de Ohm sin boton (calculo automatico al seleccionar) | RadioButton, useEffect |
| 3 | Ley de Ohm con Spinner (Picker) | Picker, Intent |
| 4 | Factorial / Fibonacci con RadioButton y boton | RadioButton, Intent |
| 5 | Factorial / Fibonacci con Spinner | Picker, Intent |
| 6 | Panfoto - Contado/Credito con if isChecked() | Picker, RadioButton, Checkbox, Intent |
| 7 | Panfoto - setOnCheckedChangeListener (tiempo real) | Picker, RadioButton, Checkbox, useEffect |
| 8 | Animales: Spinner anidado (vertebrados/invertebrados) | Picker anidado |
| 9 | Orden de comida con descuento jubilado 25% | Checkbox, Intent |
| 10| Restaurante Tedy: Combos con soda y agrandar | RadioButton, Checkbox, Intent |

## Instalacion y ejecucion

### Requisitos previos
- Node.js instalado
- App Expo Go instalada en el celular (Android o iOS)
  - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
  - iOS: https://apps.apple.com/app/expo-go/id982107779

### Pasos

1. Instalar dependencias:
   ```
   npm install
   ```

2. Iniciar el servidor de desarrollo:
   ```
   npx expo start
   ```

3. Escanear el codigo QR con la camara del celular (iOS) o con la app Expo Go (Android).

4. La app se cargara automaticamente en el celular.

## Dependencias principales

- `expo` SDK 54
- `@react-navigation/native` + `@react-navigation/stack` — navegacion entre pantallas (Intent)
- `@react-native-picker/picker` — Spinner/Dropdown
- `expo-checkbox` — CheckBox
- `react-native-gesture-handler` — requerido por React Navigation
- `react-native-screens` + `react-native-safe-area-context` — optimizacion de navegacion
