/**
 * cedulas.js
 * Padrón electoral del sistema de votación de la UTP.
 *
 * En lugar de almacenar millones de cédulas en un arreglo (todas las
 * combinaciones posibles ocuparían demasiada memoria), el padrón se valida
 * mediante el FORMATO oficial de la cédula panameña. De esta forma cualquier
 * cédula válida del país queda habilitada para iniciar sesión y votar.
 *
 * Se conserva además un arreglo de cédulas de ejemplo para fines de
 * demostración y documentación.
 *
 * Autores: Angel Martínez (8-893-602) e Idaineth Hanna
 * Asignatura: Herramientas Aplicadas IV - UTP
 */

/**
 * Cédulas de ejemplo para pruebas rápidas y demostración del flujo.
 * No son las únicas válidas: cualquier cédula con formato panameño correcto
 * (ver esCedulaPanamenaValida) es aceptada por el sistema.
 */
export const cedulasRegistradas = [
  '8-893-602', // Angel Martínez
  '8-715-765',
  '8-901-234',
  '8-456-789',
  '8-123-456',
  '8-654-321',
  '8-777-888',
  '8-111-222',
  '8-333-444',
  '8-555-666',
  '8-999-000',
];

/**
 * Expresión regular que describe los formatos válidos de la cédula panameña:
 *   - Provincia regular: número del 1 al 13  (ej. 8-123-456, 8-1234-5678)
 *   - Naturalizados / extranjeros con prefijo de letras: E, N, PE, AV, PI...
 *     (ej. E-8-12345, N-19-1234, PE-12-3456)
 *
 * Estructura general:  PROVINCIA - TOMO - ASIENTO
 *   PROVINCIA: 1 a 13, o un prefijo de 1 a 3 letras mayúsculas.
 *   TOMO:      1 a 4 dígitos.
 *   ASIENTO:   1 a 6 dígitos.
 */
export const FORMATO_CEDULA_PANAMENA =
  /^([1-9]|1[0-3]|[A-Z]{1,3})-\d{1,4}-\d{1,6}$/;

/**
 * esCedulaPanamenaValida
 * Indica si una cédula corresponde a una combinación válida del formato
 * oficial panameño. Equivale a tener "todas las combinaciones posibles"
 * habilitadas sin almacenarlas una por una.
 *
 * @param {string} cedula - Cédula a validar (ya recortada de espacios).
 * @returns {boolean} true si la cédula tiene un formato panameño válido.
 */
export function esCedulaPanamenaValida(cedula) {
  return FORMATO_CEDULA_PANAMENA.test(cedula.trim().toUpperCase());
}

export default cedulasRegistradas;
