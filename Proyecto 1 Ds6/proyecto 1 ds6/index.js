// ============================================================================
//  index.js — Punto de entrada de la aplicación (lo primero que se ejecuta)
//  Estudiante: Angel Martínez   Cédula: 8-893-602   DS6 · Proyecto #1
//  NOTA: este archivo casi nunca se cambia; solo registra cuál es el componente
//  principal. Por eso aquí NO hay líneas marcadas para cambiar.
// ============================================================================

import { registerRootComponent } from 'expo';  // Trae la función de Expo que "registra" el componente raíz de la app
import App from './App';                        // Importa el componente principal App (definido en App.js)

registerRootComponent(App);                     // Le dice a la app que arranque mostrando el componente App
