import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import '../../../style.css';

export const Descripcion = () => {
  // Obtener el parámetro `id` de la URL
  const { id } = useParams();
  
  // Estados para manejar los datos, carga y errores
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  // Efecto para fetch de datos cuando el componente se monta o `id` cambia
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar la solicitud fetch
        const response = await fetch(`${API_URL}/events/search/medicamentos/${id}`);
        const responseData = await response.json();

        // Verificar si la respuesta es exitosa y contiene el medicamento
        if (response.ok && responseData.medicamento) {
          setData(responseData.medicamento);
        } else {
          setError('No se encontró el medicamento.');
          setData(null);
        }
      } catch (error) {
        // Manejar errores en la solicitud
        setError('Ocurrió un error al obtener los datos.');
      } finally {
        // Independientemente del resultado, terminar el estado de carga
        setLoading(false);
      }
    };

    fetchData();
  }, [id, API_URL]);

  // Mostrar mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Mostrar mensaje de error si ocurre un problema
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5 mb-5">
      <h1 className="font-h1 mt-4">
        <small className="text-body">Detalles del Medicamento</small>
      </h1>
      <div className="row">
        <div className="col-md-6">
          <img
            // Mostrar una imagen predeterminada si no hay imagen disponible
            src={data?.imagen || 'default-image.png'}
            className="img-fluid product-image rounded"
            alt={data?.nombre || 'Medicamento'}
          />
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{data?.nombre}</h2>
              <p className="card-text"><strong>Descripción:</strong> {data?.descripcion}</p>
              <p className="card-text"><strong>Indicaciones:</strong> <FontAwesomeIcon icon={faClock} /> {data?.indicaciones}</p>
              <p className="card-text"><strong>Laboratorio:</strong> {data?.laboratorios?.nombre || 'No disponible'}</p>
              <p className="card-text"><strong>Sustancia:</strong> {data?.sustancias?.nombre || 'No disponible'}</p>
              <p className="card-text"><strong>Presentación:</strong> {data?.presentaciones?.nombre || 'No disponible'}</p>
              <button className="btn btn-outline-info w-100 btn-font p-1 ms-2">Agregar al carrito</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
