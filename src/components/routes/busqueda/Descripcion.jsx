import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import '../../../style.css';

export const Descripcion = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/events/search/medicamentos/${id}`);
        const responseData = await response.json();
        if (responseData.ok) {
          setData(responseData.medicamento);
        } else {
          setData(null);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mt-5 mb-5">
      <h1 className="font-h1 mt-4">
        <small className="text-body">Detalles del Medicamento</small>
      </h1>
      <div className="row">
        <div className="col-md-6">
          <img
            src={ data?.imagen }
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
              <p className="card-text"><strong>Laboratorio:</strong> {data?.laboratorios?.nombre}</p>
              <p className="card-text"><strong>Sustancia:</strong> {data?.sustancias?.nombre}</p>
              <p className="card-text"><strong>Presentación:</strong> {data?.presentaciones?.nombre}</p>
              <button className="btn btn-outline-info w-100 btn-font p-1 ms-2">Agregar al carrito</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
