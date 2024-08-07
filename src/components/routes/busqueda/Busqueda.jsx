import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useFetch, useDebounce } from '../../../hooks';

export const Busqueda = ({ tipo }) => {
    // Estados para manejar los datos de búsqueda, URL de la API, resultados y errores
    const [datoABuscar, setDatoABuscar] = useState('');
    const [url, setUrl] = useState(null);
    const [resultados, setResultados] = useState([]);
    const [errorBusqueda, setErrorBusqueda] = useState('');
    const API_URL = import.meta.env.VITE_API_URL;

    // Hook para manejar el debounce en la búsqueda
    const debouncedDatoABuscar = useDebounce(datoABuscar, 500);

    // Custom hook para hacer fetch de los datos
    const { data, isLoading, hasError } = useFetch(url);

    // Hook para manejar la navegación
    const navigate = useNavigate();

    // Configura la URL para la búsqueda inicial cuando el componente se monta
    useEffect(() => {
        setUrl(`${API_URL}/events/search/${tipo}/search`);
    }, [tipo]);

    // Configura la URL de búsqueda cuando el dato a buscar cambia
    useEffect(() => {
        if (debouncedDatoABuscar) {
            setUrl(`${API_URL}/events/search/${tipo}/search?nombre=${debouncedDatoABuscar}`);
        } else {
            setResultados([]);
            setErrorBusqueda('');
        }
    }, [debouncedDatoABuscar, tipo]);

    // Actualiza los resultados y el mensaje de error cuando los datos cambian
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
                setErrorBusqueda(data[resultadosKey].length === 0 ? 'No se encontraron coincidencias.' : '');
            } else {
                setResultados([]);
                setErrorBusqueda('No se encontraron coincidencias.');
            }
        }
    }, [data, tipo]);

    // Funciones para manejar la navegación a detalles específicos
    const handleVerIndicaciones = (idMedicina) => {
        navigate(`/busqueda/medicina/${idMedicina}`);
    };

    const handleVerLaboratorio = (idLaboratorio) => {
        navigate(`/busqueda/laboratorio/${idLaboratorio}`);
    };

    const handleVerSustancia = (idSustancia) => {
        navigate(`/busqueda/sustancia/${idSustancia}`);
    };

    // Maneja los cambios en el input de búsqueda
    const handleInputChange = (event) => {
        setDatoABuscar(event.target.value);
    };

    return (
        <>
            <div className="container mt-5">
                <div className="col">
                    <div className="row">
                        <h1 className="color-h1 font-h1">
                            <small className="text-body">Búsqueda por: {tipo}</small>
                        </h1>
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
                    {isLoading && <h2 className="text-center">Cargando...</h2>}
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
