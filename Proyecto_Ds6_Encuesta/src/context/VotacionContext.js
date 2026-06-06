/**
 * VotacionContext.js
 * Contexto global de la aplicación usando la Context API de React.
 * Administra el estado de la votación: conteo de votos por candidato,
 * lista de cédulas que ya votaron y total de votos emitidos.
 *
 * Expone:
 *   - VotacionProvider: componente que envuelve la app y provee el estado.
 *   - useVotacion(): hook personalizado para consumir el contexto.
 *
 * Autor: Angel Martínez - Cédula: 8-893-602
 * Asignatura: Herramientas Aplicadas IV - UTP
 */

import React, { createContext, useContext, useState } from 'react';

/**
 * Estado inicial de la votación.
 * - votos: objeto con el conteo de votos por id de candidato.
 * - cedulasQueVotaron: arreglo de cédulas que ya emitieron su voto.
 * - totalVotos: cantidad total de votos registrados.
 */
const estadoInicial = {
  votos: { 1: 0, 2: 0, 3: 0, 4: 0 },
  cedulasQueVotaron: [],
  totalVotos: 0,
};

// Creación del contexto.
const VotacionContext = createContext(undefined);

/**
 * VotacionProvider
 * Proveedor del contexto. Mantiene el estado de la votación y expone
 * las funciones para registrar votos, verificar si una cédula ya votó
 * y obtener los porcentajes de cada candidato.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Componentes hijos a envolver.
 */
export function VotacionProvider({ children }) {
  const [estado, setEstado] = useState(estadoInicial);

  /**
   * registrarVoto
   * Registra el voto de una cédula para un candidato específico.
   * Incrementa el conteo del candidato, agrega la cédula a la lista
   * de votantes y aumenta el total de votos.
   *
   * @param {number} candidatoId - Id del candidato seleccionado.
   * @param {string} cedula - Cédula del votante.
   */
  const registrarVoto = (candidatoId, cedula) => {
    setEstado((prev) => ({
      ...prev,
      votos: {
        ...prev.votos,
        [candidatoId]: prev.votos[candidatoId] + 1,
      },
      cedulasQueVotaron: [...prev.cedulasQueVotaron, cedula],
      totalVotos: prev.totalVotos + 1,
    }));
  };

  /**
   * yaVoto
   * Indica si una cédula ya emitió su voto previamente.
   *
   * @param {string} cedula - Cédula a verificar.
   * @returns {boolean} true si la cédula ya votó, false en caso contrario.
   */
  const yaVoto = (cedula) => {
    return estado.cedulasQueVotaron.includes(cedula);
  };

  /**
   * getPorcentajes
   * Calcula el porcentaje de votos de cada candidato respecto al total.
   * Si no hay votos, devuelve 0% para todos. Usa Math.round para enteros.
   *
   * @returns {object} Objeto con el porcentaje por id de candidato. Ej: {1:34,2:14,...}
   */
  const getPorcentajes = () => {
    const porcentajes = {};
    const { votos, totalVotos } = estado;

    Object.keys(votos).forEach((id) => {
      if (totalVotos === 0) {
        porcentajes[id] = 0;
      } else {
        porcentajes[id] = Math.round((votos[id] / totalVotos) * 100);
      }
    });

    return porcentajes;
  };

  // Valor expuesto a los consumidores del contexto.
  const valor = {
    votos: estado.votos,
    totalVotos: estado.totalVotos,
    cedulasQueVotaron: estado.cedulasQueVotaron,
    registrarVoto,
    yaVoto,
    getPorcentajes,
  };

  return (
    <VotacionContext.Provider value={valor}>
      {children}
    </VotacionContext.Provider>
  );
}

/**
 * useVotacion
 * Hook personalizado para consumir el contexto de votación de forma segura.
 * Lanza un error si se usa fuera del VotacionProvider.
 *
 * @returns {object} Estado y funciones de la votación.
 */
export function useVotacion() {
  const contexto = useContext(VotacionContext);
  if (contexto === undefined) {
    throw new Error('useVotacion debe usarse dentro de un VotacionProvider');
  }
  return contexto;
}

export default VotacionContext;
