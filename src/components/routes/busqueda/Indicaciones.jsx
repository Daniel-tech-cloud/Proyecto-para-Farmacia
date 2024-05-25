import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import '../../../style.css';

export const Indicaciones = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/busqueda/medicina/?dato=${id}`);
        const responseData = await response.json();
        // Suponiendo que responseData es un array, tomar el primer elemento como objeto
        const firstMedicine = responseData[0];
        setData(firstMedicine);
        setLoading(false);
      } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="container">
        <h1 className="font-h1 mt-4">Indicaciones</h1>
        <div className="row">
          <div className="col-md-4">
            <img src="/../public/img/medicamento.png" className="img-fluid product-image rounded" alt="Medicamento" />
          </div>
          <div className="col-md-8">
            <div className="product-info">
              <h2 className="product-title">{data.nombre}</h2>
              <p className="product-price">$ {data.precioVenta}</p>
              <p>Descripción: {data.descripcion}</p>
              <p>Cantidad: {data.cantidad}</p>
              <p>Fecha de caducidad: {data.caducidad.slice(0, 10)}</p>
              <div className="mb-5">
                <p>Indicaciones:</p>
                <FontAwesomeIcon icon={faClock} /> <span>{data.indicaciones}</span>
              </div>
              <button className="btn btn-outline-info w-100 btn-font p-1 ms-2">Comprar</button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
