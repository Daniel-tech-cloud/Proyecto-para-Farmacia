import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useFetch, useDebounce } from '../../../hooks';

export const Busqueda = ({ tipo }) => {
    const [datoABuscar, setDatoABuscar] = useState('');
    const [url, setUrl] = useState(null);
    const [resultados, setResultados] = useState([]);
    const [errorBusqueda, setErrorBusqueda] = useState('');
    const debouncedDatoABuscar = useDebounce(datoABuscar, 500);
    const { data, isLoading, hasError } = useFetch(url);

    const navigate = useNavigate();

    // Realiza la búsqueda inicial al montar el componente
    useEffect(() => {
        setUrl(`http://localhost:3001/api/events/search/${tipo}/search?nombre=a`);
    }, [tipo]);

    useEffect(() => {
        if (debouncedDatoABuscar) {
            setUrl(`http://localhost:3001/api/events/search/${tipo}/search?nombre=${debouncedDatoABuscar}`);
        } else {
            setResultados([]);
            setErrorBusqueda('');
        }
    }, [debouncedDatoABuscar, tipo]);

    useEffect(() => {
        if (data) {
            const tipoRespuestaMap = {
                'Medicamentos': 'medicamentos',
                'Laboratorios': 'laboratorios',
                'Sustancias': 'sustancias'
            };
            const resultadosKey = tipoRespuestaMap[tipo];
            if (data[resultadosKey]) {
                setResultados(data[resultadosKey]);
                if (data[resultadosKey].length === 0) {
                    setErrorBusqueda('No se encontraron coincidencias.');
                } else {
                    setErrorBusqueda('');
                }
            } else {
                setResultados([]);
                setErrorBusqueda('No se encontraron coincidencias.');
            }
        }
    }, [data, tipo]);

    const handleVerIndicaciones = (idMedicina) => {
        navigate(`/busqueda/medicina/${idMedicina}`);
    };

    const handleVerLaboratorio = (idLaboratorio) => {
        navigate(`/busqueda/laboratorio/${idLaboratorio}`);
    };

    const handleVerSustancia = (idSustancia) => {
        navigate(`/busqueda/sustancia/${idSustancia}`);
    };

    const handleInputChange = (event) => {
        setDatoABuscar(event.target.value);
    };

    return (
        <>
            <div className="container mt-5">
                <div className="col">
                    <div className="row">
                        <h1 className="color-h1 font-h1"> <small className="text-body"> Búsqueda por: {tipo} </small> </h1>
                    </div>
                </div>
                
                <form className="form-inline mt-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group d-flex">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={datoABuscar} 
                            onChange={handleInputChange} 
                            placeholder={`Buscar ${tipo}`}
                        />
                        <button type="submit" className="btn btn-primary p-3 ms-2" disabled> 
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </form>    
            </div>
            
            <div className="container mt-5">
                <div className="row">
                    {isLoading && <p>Cargando...</p>}
                    {errorBusqueda && <p>{errorBusqueda}</p>}
                    {Array.isArray(resultados) && resultados.length > 0 && resultados.map((item) => (
                        <div className="col-md-4 mb-4" key={item.id}>
                            <div className="card border-light">
                                <img src={item.imagen} className="card-img-top" alt={item.nombre} />
                                <div className="card-body card-font">
                                    <h5 className="card-title">{item.nombre}</h5>
                                    <p className="card-text">Descripción: {item.descripcion}</p>

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
