# Proyecto #1 - Venta de Auto (DS6)

**Estudiante:** Angel Martínez
**Cédula:** 8-893-602
**Materia:** Desarrollo de Software VI
**Profesora:** Marlina Sánchez
**Entrega:** 21/mayo/26

App móvil hecha en **React Native + Expo** que implementa la pantalla "Venta de Auto" descrita en el PDF del proyecto.

## Funcionalidad

- **Entradas:** Costo del auto y Salario del cliente.
- **Transmisión:**
  - `Manual` → no aumenta el precio.
  - `Automática` → suma `$1500.00` al precio original.
- **Forma de pago:**
  - **Contado** → cobra 7% de ITBM. Muestra: costo, impuesto y gran total.
  - **Crédito** → aplica interés compuesto `Cf = Ci(1+r)^n` con `r = 0.08` y `n = 9` años, luego suma ITBM (7%). El capital final se divide en `9 × 12 = 108` pagos mensuales. Si el 30% del salario cubre la letra → **APROBADO**; si no, **NO APROBADO**. Muestra: letra mensual, 30% del salario y veredicto.

## Cómo ejecutar

Requisitos: Node.js 18+ y la app **Expo Go** en tu celular (Android/iOS).

```bash
# 1) instalar dependencias
npm install

# 2) iniciar el bundler
npm start
```

Cuando se abra Expo en el navegador, escanea el QR con **Expo Go** (Android) o con la cámara (iOS).

Alternativas:

```bash
npm run android   # abre el emulador de Android
npm run ios       # abre el simulador de iOS (solo macOS)
npm run web       # corre la versión web
```

## Estructura

```
proyecto 1 ds6/
├── App.js              # componente principal con la UI y la lógica
├── index.js            # punto de entrada (registerRootComponent)
├── app.json            # configuración de Expo
├── package.json        # dependencias
├── babel.config.js
└── README.md
```
