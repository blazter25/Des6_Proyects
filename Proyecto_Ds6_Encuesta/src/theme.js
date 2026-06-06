/**
 * theme.js
 * Paleta de colores institucional de la Universidad Tecnológica de Panamá (UTP).
 * Centraliza los colores para mantener consistencia visual en toda la aplicación
 * y facilitar cambios futuros desde un único punto.
 *
 * Autor: Angel Martínez - Cédula: 8-893-602
 * Asignatura: Herramientas Aplicadas IV - UTP
 */

export const COLORS = {
  primary: '#003366',      // Azul institucional oscuro (headers, títulos)
  secondary: '#0066CC',    // Azul secundario (botones, acentos)
  accent: '#FFD700',       // Dorado (detalles destacados)
  background: '#F5F5F5',    // Fondo general de pantallas
  white: '#FFFFFF',        // Blanco (tarjetas, texto sobre fondos oscuros)
  text: '#333333',         // Texto principal
  textLight: '#666666',    // Texto secundario / subtítulos
  success: '#28A745',      // Estados de éxito
  error: '#DC3545',        // Estados de error
  selected: '#0066CC',     // Borde de tarjeta seleccionada
  barFill: '#0066CC',      // Relleno de la barra de progreso
  barBackground: '#E0E0E0', // Fondo de la barra de progreso
};

export default COLORS;
