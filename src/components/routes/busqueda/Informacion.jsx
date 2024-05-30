import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks";

export const Informacion = ({ tipo }) => {

  const { id } = useParams();
  let url;

  if (tipo === "Laboratorio") {
    url = `http://localhost:3001/api/busqueda/lab/?dato=${id}`;
  } else if (tipo === "Sustancia") {
    url = `http://localhost:3001/api/busqueda/sus/?dato=${id}`;
  }

  const { data, isLoading, hasError } = useFetch(url);

  return (
    <div className="container mt-5 mb-5">
      <h1 className="font-h1">
        <small className="text-body">Información</small>
      </h1>
      {isLoading && <p>Loading...</p>}
      {hasError && <p>Error: {hasError.message}</p>}
      {data && (
        <div className="container m-5">
          <h2>{data[0].nombre}</h2>
          <p>{data[0].descripcion}</p>
          {/* Renderiza más datos según sea necesario */}
        </div>
      )}
    </div>
  );
};
