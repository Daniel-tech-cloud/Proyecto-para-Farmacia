import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks";
import { useState, useCallback } from 'react';
import { useUser } from "../../context/UserContext"; // Importación del hook useUser

export const Informacion = ({ tipo }) => {
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate(); 
  const [reload, setReload] = useState(false); // Estado para controlar la recarga de datos
  const { user } = useUser(); // Obtención del usuario desde el contexto

  // Función para construir la URL dependiendo del tipo
  const getUrl = useCallback((tipo) => {
    switch (tipo) {
      case 'Laboratorio':
        return `${API_URL}/events/search/laboratorios/${id}`;
      case 'Sustancia':
        return `${API_URL}/events/search/sustancias/${id}`;
      default:
        return null;
    }
  }, [API_URL, id]);

  const url = getUrl(tipo);
  const { data, isLoading, hasError } = useFetch(url, { refresh: reload }); // Pasar estado de recarga al hook

  // Determina el objeto correcto basado en el tipo
  const item = tipo === 'Laboratorio' ? data?.laboratorios : data?.sustancias;

  // Función para manejar la eliminación con confirmación
  const handleDelete = async (itemId) => {
    const confirmed = window.confirm(`¿Está seguro de que desea borrar este ${tipo}?`);

    if (confirmed) {
        try {
            // Construir la URL del endpoint DELETE
            const endpoint = tipo.toLowerCase() === 'laboratorio' ? 'laboratorio' : 'sustancia';
            const deleteUrl = `${API_URL}/events/delete/${endpoint}/${itemId}`;

            // Hacer la solicitud DELETE
            const response = await fetch(deleteUrl, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert(`${tipo} eliminado correctamente`);
                setReload(prev => !prev); // Cambiar el estado para forzar la recarga de datos
                navigate(`/${endpoint}s`); // Redirigir a la página de tipo
            } else {
                const errorData = await response.json();
                alert(`Error al eliminar ${tipo}: ${errorData.error}`);
            }
        } catch (error) {
            alert(`Error al eliminar ${tipo}: ${error.message}`);
        }
    }
};

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

          <div className="d-flex justify-content-end">
            {/* validación usuario */}
            {user && (
              <button className="btn btn-danger m-1" onClick={() => handleDelete(item.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="alert alert-warning">No se encontraron datos.</div>
      )}
    </div>
  );
};
