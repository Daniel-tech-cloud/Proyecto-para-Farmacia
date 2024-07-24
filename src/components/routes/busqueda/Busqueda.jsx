import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


export const Busqueda = ({ tipo }) => {
    const [datoABuscar, setDatoABuscar] = useState('');
    const [resultados, setResultados] = useState([]);

    const navigate = useNavigate();

    const handleVerIndicaciones = (idMedicina) => {
        navigate(`/busqueda/medicina/${idMedicina}`);
    };

    const handleVerLaboratorio = (idLaboratorio) => {
        navigate(`/busqueda/laboratorio/${idLaboratorio}`);
    };

    const handleVerSustancia = (idSustancia) => {
        navigate(`/busqueda/sustancia/${idSustancia}`);
    };

    const handleInputChange = async (event) => {
        setDatoABuscar(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/api/events/search/${tipo}/search?nombre=${datoABuscar}`);
            const data = await response.json();
            
            // Mapea el tipo de búsqueda a la propiedad correspondiente en la respuesta
            const tipoRespuestaMap = {
                'Medicamentos': 'medicamentos',
                'Laboratorios': 'laboratorios',
                'Sustancias': 'sustancias'
            };

            const resultadosKey = tipoRespuestaMap[tipo];
            // Verifica si la respuesta tiene la propiedad correspondiente
            if (data && data[resultadosKey]) {
                setResultados(data[resultadosKey]);
            } else {
                setResultados([]);
            }
            console.log(data);
        } catch (error) {
            console.error('Error al realizar la búsqueda:', error);
        }
    };

    return (
        <>
            <div className="container mt-5">
                <div className="col">
                    <div className="row">
                        <h1 className="color-h1 font-h1"> <small className="text-body"> Búsqueda por: {tipo} </small> </h1>
                    </div>
                </div>
                
                <form className="form-inline mt-5" onSubmit={handleSubmit}>
                    <div className="form-group d-flex">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={datoABuscar} 
                            onChange={handleInputChange} 
                            placeholder={`${tipo}`}
                        />
                        <button type="submit" className="btn btn-primary p-3 ms-2"> 
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </form>    
            </div>
            
            <div className="container mt-5">
                <div className="row">
                    {resultados && resultados.map((item) => (
                        <div className="col-md-4 mb-4" key={item.id}>
                            <div className="card border-light">
                                {/* Imagen en la parte superior de la tarjeta */}
                                <img src={item.imagen} className="card-img-top" alt={item.nombre} />
                                <div className="card-body card-font">
                                    <h5 className="card-title">{item.nombre}</h5>
                                    <p className="card-text">Descripción: {item.descripcion}</p>

                                    {/* Condición para mostrar el botón adecuado */}
                                    {tipo === 'Medicamentos' && (
                                        <button
                                            type="button"
                                            className="mt-2 btn btn-outline-info w-100 btn-font p-1 ms-2"
                                            onClick={() => handleVerIndicaciones(item.id)}
                                        >
                                            Indicaciones
                                        </button>
                                    )}
                                    
                                    {tipo === 'Laboratorios' && (
                                        <button
                                            type="button"
                                            className="mt-2 btn btn-outline-info w-100 btn-font p-1 ms-2"
                                            onClick={() => handleVerLaboratorio(item.id)}
                                        >
                                            Ver más
                                        </button>
                                    )}
                                    
                                    {tipo === 'Sustancias' && (
                                        <button
                                            type="button"
                                            className="mt-2 btn btn-outline-info w-100 btn-font p-1 ms-2"
                                            onClick={() => handleVerSustancia(item.id)}
                                        >
                                            Ver más
                                        </button>
                                    )}
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};
