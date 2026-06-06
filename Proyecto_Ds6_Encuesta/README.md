# Sistema de Votación para Rector - UTP

Aplicación móvil desarrollada en **React Native con Expo** que simula un sistema de
votación electrónica para la elección de Rector de la **Universidad Tecnológica de
Panamá (UTP)**.

---

## Integrantes

- **Angel Martínez** — Cédula: 8-893-602
- **Idaineth Hanna**

**Asignatura:** Herramientas Aplicadas IV
**Universidad:** Universidad Tecnológica de Panamá (UTP)

---

## Descripción

La aplicación valida la identidad del votante por su cédula, permite seleccionar
un candidato entre cuatro opciones, registra el voto y muestra los resultados en
porcentajes en tiempo real mediante barras de progreso animadas.

El estado de la votación (conteo de votos, cédulas que ya votaron y total) se
administra de forma global con la **Context API de React**, sin librerías externas
de manejo de estado.

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| React Native + Expo (SDK 56) | Framework móvil |
| @react-navigation/native + native-stack | Navegación entre pantallas |
| React Context API | Estado global (sin Redux) |
| JavaScript | Lenguaje (sin TypeScript) |
| StyleSheet nativo | Estilos (sin librerías de UI) |
| @expo/vector-icons (Ionicons) | Íconos |

---

## Estructura del proyecto

```
sistema-votacion-utp/
├── App.js                      # Entrada: Stack Navigator + VotacionProvider
├── src/
│   ├── theme.js                # Paleta institucional (COLORS)
│   ├── context/
│   │   └── VotacionContext.js  # Estado global y lógica de votación
│   ├── data/
│   │   ├── cedulas.js          # Padrón de cédulas registradas
│   │   └── candidatos.js       # Lista de candidatos
│   ├── screens/
│   │   ├── LoginScreen.js      # Pantalla 1: identificación por cédula
│   │   ├── VotacionScreen.js   # Pantalla 2: selección y emisión de voto
│   │   └── ResultadosScreen.js # Pantalla 3: resultados en porcentajes
│   └── components/
│       ├── CandidatoCard.js    # Tarjeta de candidato seleccionable
│       └── BarraProgreso.js    # Barra de progreso animada
├── assets/
└── package.json
```

---

## Flujo de la aplicación

1. **LoginScreen (Identificación):** el votante ingresa su cédula. Se valida que:
   - El campo no esté vacío.
   - El formato sea válido (contiene guiones y al menos 7 dígitos).
   - La cédula esté registrada en el padrón (`src/data/cedulas.js`).
   - La cédula no haya votado previamente.

   Si todo es correcto, navega a la pantalla de votación pasando la cédula.

2. **VotacionScreen (Votación):** muestra los 4 candidatos en una cuadrícula 2x2.
   El votante selecciona uno (solo uno a la vez) y presiona **Votar**. El voto se
   registra en el contexto global y se reemplaza la pantalla por la de resultados
   (sin opción de retroceder).

3. **ResultadosScreen (Resultados):** muestra, por cada candidato, su avatar,
   nombre, una barra de progreso animada y el porcentaje de votos en tiempo real,
   más el total de votos. El botón **Nueva consulta** regresa a la pantalla de
   inicio para que otro votante use el sistema.

---

## Cédulas para iniciar sesión

El padrón acepta **cualquier cédula con formato panameño válido** (todas las
combinaciones posibles), por lo que no es necesario memorizar una lista. Son
válidas, por ejemplo:

- Provincias regulares (1 a 13): `8-123-456`, `3-715-765`, `8-1234-5678`
- Naturalizados / extranjeros con prefijo de letras: `E-8-12345`, `N-19-1234`, `PE-12-3456`

Estructura aceptada: `PROVINCIA-TOMO-ASIENTO`, donde la provincia es un número
del 1 al 13 o un prefijo de hasta 3 letras (E, N, PE, AV…), el tomo tiene de 1 a
4 dígitos y el asiento de 1 a 6 dígitos.

Cédulas de ejemplo listas para usar:

```
8-893-602   8-715-765   8-901-234   8-456-789   8-123-456
8-654-321   8-777-888   8-111-222   8-333-444   8-555-666
```

> Nota: cada cédula solo puede votar una vez. Si intentas votar de nuevo con la
> misma cédula, el sistema lo impedirá ("Esta cédula ya emitió su voto").

---

## Cómo ejecutar el proyecto

Requisitos previos: tener instalado **Node.js** y la app **Expo Go** en tu
dispositivo móvil (o un emulador Android/iOS).

```bash
# 1. Entrar a la carpeta del proyecto
cd sistema-votacion-utp

# 2. Instalar dependencias (si aún no están instaladas)
npm install

# 3. Iniciar el servidor de desarrollo
npx expo start
```

Luego escanea el código QR con la app **Expo Go** (Android) o la cámara (iOS),
o presiona `a` para abrir en un emulador Android y `w` para abrir en el navegador.

---

## Criterios de calidad aplicados

- Funciones reutilizables y nombradas (sin lógica inline en el JSX).
- Separación de responsabilidades: `data` / `context` / `screens` / `components`.
- Manejo de errores con `Alert.alert()` y títulos descriptivos.
- Código comentado con bloques de documentación en cada función y componente.
- Nombres en español.
- Listas con `key` y dependencias correctas en `useEffect`.

---

*Proyecto académico desarrollado por Angel Martínez (8-893-602) e Idaineth Hanna
para la asignatura Herramientas Aplicadas IV de la Universidad Tecnológica de Panamá.*
