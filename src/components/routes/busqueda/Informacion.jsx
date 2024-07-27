import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks";

export const Informacion = ({ tipo }) => {
  const { id } = useParams();

  // Función para construir la URL dependiendo del tipo
  const getUrl = (tipo) => {
    switch (tipo) {
      case 'Laboratorio':
        return `http://localhost:3001/api/events/search/laboratorios/${id}`;
      case 'Sustancia':
        return `http://localhost:3001/api/events/search/sustancias/${id}`;
      default:
        return null;
    }
  };

  const url = getUrl(tipo);
  const { data, isLoading, hasError } = useFetch(url);

  // Determina el objeto correcto basado en el tipo
  const item = tipo === 'Laboratorio' ? data?.laboratorio : data?.sustancias;

  return (
    <div className="container mt-5 mb-5">
      <h1 className="font-h1 mb-4">
        <small className="text-body">Información de</small> {tipo}
      </h1>
      {isLoading && <div className="alert alert-info">Cargando...</div>}
      {hasError && <div className="alert alert-danger">Error: {hasError.message}</div>}
      {item ? (
        <div className="card mb-3">
          <div className="card-header">
            <h2>{item.nombre}</h2>
          </div>
          <div className="card-body">
            <p className="card-text">{item.descripcion}</p>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning">No se encontraron datos.</div>
      )}
    </div>
  );
};
