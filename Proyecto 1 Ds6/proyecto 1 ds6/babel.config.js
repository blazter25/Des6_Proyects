// ============================================================================
//  babel.config.js — Configuración de Babel (el "traductor" del código)
//  Estudiante: Angel Martínez   Cédula: 8-893-602   DS6 · Proyecto #1
//  Babel convierte el código moderno de React/JSX a algo que el dispositivo
//  entiende. Para un proyecto Expo básico, este archivo se deja tal cual.
// ============================================================================

module.exports = function (api) {        // Exporta la configuración como una función que recibe la "api" de Babel
  api.cache(true);                       // Guarda en caché la configuración para que compile más rápido la próxima vez
  return {                               // Devuelve el objeto de configuración
    presets: ['babel-preset-expo'],      // Usa el preset oficial de Expo (incluye soporte de React Native y JSX)
  };
};
