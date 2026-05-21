# UNIVERSIDAD TECNOLOGICA DE PANAMA
## Facultad de Ingenieria de Sistemas Computacionales
### Departamento de Programacion

---

**Asignatura:** Programacion Movil
**Practica:** #2
**Profesora:** Marlina Sanchez
**Estudiante:** Angel Martinez
**Cedula:** 8-893-602
**Fecha:** 19 de mayo de 2026
**Tecnologia:** React Native + Expo (Expo Go)

---

## Descripcion del Proyecto

Aplicacion movil desarrollada con **React Native + Expo** que implementa los 10 ejercicios
sobre el uso de componentes UI moviles: RadioButton (manual con TouchableOpacity), Spinner
(Picker de `@react-native-picker/picker`), CheckBox (`expo-checkbox`), TextInput, Button y
navegacion entre pantallas con parametros usando **React Navigation** (equivalente a Intent
explicito entre Activities en Android).

El proyecto se llama `Practica2App` y contiene una pantalla de menu principal desde la cual
se accede a cada ejercicio. Se ejecuta directamente en el celular con **Expo Go** (sin
necesidad de Android Studio ni cable).

---

## Estructura del Proyecto

```
Practica2App/
  App.js                        <- Punto de entrada + Stack Navigator (Intent)
  screens/
    MenuPrincipal.js             <- Menu con lista de 10 ejercicios
    Ejercicio1.js                <- Ley de Ohm: RadioButton + boton
    Ejercicio1Resultado.js       <- Pantalla resultado Ej.1
    Ejercicio2.js                <- Ley de Ohm: sin boton (calculo auto)
    Ejercicio2Resultado.js       <- Pantalla resultado Ej.2
    Ejercicio3.js                <- Ley de Ohm: Spinner (Picker)
    Ejercicio3Resultado.js       <- Pantalla resultado Ej.3
    Ejercicio4.js                <- Factorial/Fibonacci: RadioButton + boton
    Ejercicio4Resultado.js       <- Pantalla resultado Ej.4
    Ejercicio5.js                <- Factorial/Fibonacci: Spinner
    Ejercicio5Resultado.js       <- Pantalla resultado Ej.5
    Ejercicio6.js                <- Panfoto: if isChecked
    Ejercicio6Resultado.js       <- Pantalla resultado Ej.6
    Ejercicio7.js                <- Panfoto: OnCheckedChangeListener (tiempo real)
    Ejercicio7Resultado.js       <- (placeholder)
    Ejercicio8.js                <- Animales: Spinner anidado
    Ejercicio9.js                <- Orden de comida: CheckBox jubilado
    Ejercicio9Resultado.js       <- Pantalla resultado Ej.9
    Ejercicio10.js               <- Restaurante Tedy: combos
    Ejercicio10Resultado.js      <- Pantalla resultado Ej.10
  README.md
  package.json
```

---

## Descripcion de cada Ejercicio

### Ejercicio 1: Ley de Ohm con RadioButton y Boton
**Componentes:** RadioButton (manual), TextInput, Boton, navegacion con parametros
Tres RadioButtons (Voltaje, Corriente, Resistencia). Boton "Calcular" navega a pantalla
de resultado con la formula y el valor calculado.
- V = I x R
- I = V / R
- R = V / I

### Ejercicio 2: Ley de Ohm sin boton
**Componentes:** RadioButton, TextInput, useEffect (OnCheckedChangeListener)
Identico al Ej.1 pero sin boton. El calculo se lanza automaticamente al completar
los dos campos (equivale a eliminar el boton y disparar el Intent en el listener).

### Ejercicio 3: Ley de Ohm con Spinner
**Componentes:** Picker (Spinner), TextInput, Boton, navegacion
Reemplaza el RadioButton por un Spinner/Dropdown para seleccionar el parametro a calcular.

### Ejercicio 4: Factorial y Fibonacci con RadioButton y Boton
**Componentes:** RadioButton, TextInput, Boton, navegacion
Dos RadioButtons: Factorial y Sucesion Fibonacci. Boton Calcular envia a pantalla resultado.

### Ejercicio 5: Factorial y Fibonacci con Spinner
**Componentes:** Picker (Spinner), TextInput, Boton, navegacion
Mismo ejercicio 4 usando un Picker en lugar de RadioButton.

### Ejercicio 6: Panfoto (if isChecked)
**Componentes:** Picker, RadioButton, Checkbox, Boton, navegacion
- Spinner: Al contado / A credito
- RadioButton: plazo 1 ano o 2 anos (solo visible si es credito)
- CheckBox: Entrega a domicilio +B/.25.00
- Logica con if (isChecked): contado = precio + 7% + 12% ITBM; credito = precio + 12% ITBM
- Boton Calcular navega a pantalla de resultado con desglose

### Ejercicio 7: Panfoto (setOnCheckedChangeListener)
**Componentes:** Picker, RadioButton, Checkbox, useEffect
Identica logica al Ej.6. El total se recalcula en tiempo real al cambiar cualquier
componente (equivalente a radioGroup.setOnCheckedChangeListener en Android).

### Ejercicio 8: Animales con Spinner anidado
**Componentes:** Picker anidado (dos Pickers encadenados)
- Picker 1: Vertebrados / Invertebrados
- Picker 2: Se actualiza con 5 ejemplos segun la categoria elegida
  * Vertebrados: Leon, Delfin, Aguila, Salmon, Rana
  * Invertebrados: Arana, Mariposa, Pulpo, Estrella de mar, Abeja

### Ejercicio 9: Orden de comida con descuento jubilado
**Componentes:** TextInput, Checkbox, Boton, navegacion
Se ingresa el precio. Si el CheckBox "Jubilado" esta marcado, se aplica 25% de descuento.
La pantalla de resultado muestra el desglose y total a pagar.

### Ejercicio 10: Restaurante Tedy
**Componentes:** RadioButton (combos), Checkbox, Boton, navegacion
- 2 combos a elegir (RadioButton), precio base B/.3.99
- CheckBox Soda: +B/.1.50
- CheckBox Agrandar: +B/.1.00
- Pantalla de resultado con el resumen de la orden

---

## Equivalencia Android -> React Native

| Concepto Android             | Equivalente React Native          |
|------------------------------|-----------------------------------|
| RadioButton / RadioGroup     | TouchableOpacity + estado manual  |
| Spinner                      | Picker (@react-native-picker/picker) |
| CheckBox                     | Checkbox (expo-checkbox)          |
| Intent explicito             | navigation.navigate() con params  |
| putExtra / getStringExtra    | route.params                      |
| setOnCheckedChangeListener   | useEffect + useState              |
| Activity                     | Screen (componente de funcion)    |
| setContentView               | return JSX                        |

---

## Como ejecutar el proyecto

### Prerequisitos
1. Node.js instalado en la PC
2. App **Expo Go** instalada en el celular:
   - Android: Google Play Store -> buscar "Expo Go"
   - iOS: App Store -> buscar "Expo Go"
3. PC y celular en la **misma red WiFi**

### Pasos

```
# 1. Ir a la carpeta del proyecto
cd "C:\Users\gerar\OneDrive\Escritorio\Practica 2\Practica2App"

# 2. Instalar dependencias (solo la primera vez)
npm install

# 3. Iniciar el servidor Expo
npx expo start
```

4. Aparece un **codigo QR** en la terminal.
5. En Android: abrir Expo Go -> "Scan QR Code" -> escanear el codigo QR.
   En iOS: abrir la camara y apuntar al QR -> tocar el banner que aparece.
6. La aplicacion se carga y ejecuta en el celular.

**Si hay problemas de red (WiFi con restricciones):**
```
npx expo start --tunnel
```

---

## Dependencias instaladas

| Paquete                          | Uso                                    |
|----------------------------------|----------------------------------------|
| `expo` SDK 54                    | Framework base                         |
| `@react-navigation/native`       | Sistema de navegacion (Intent)         |
| `@react-navigation/stack`        | Stack Navigator (historial pantallas)  |
| `@react-native-picker/picker`    | Spinner / Dropdown                     |
| `expo-checkbox`                  | CheckBox                               |
| `react-native-gesture-handler`   | Requerido por React Navigation         |
| `react-native-screens`           | Optimizacion de navegacion             |
| `react-native-safe-area-context` | Manejo de area segura del dispositivo  |

---

*Angel Martinez - Cedula: 8-893-602*
*Programacion Movil - UTP - 2026*
