import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useFetch, useDebounce } from '../../../hooks';

// Mapeo de tipos a componentes de botón
const TIPO_COMPONENTS = {
    Medicamentos: (item, onClick) => (
        <button
            type="button"
            className="mt-2 btn btn-outline-info w-100 btn-font p-1 ms-2"
            onClick={() => onClick(item.id)}
        >
        Indicaciones
        </button>
    ),
    Laboratorios: (item, onClick) => (
        <button
            type="button"
            className="mt-2 btn btn-outline-info w-100 btn-font p-1 ms-2"
            onClick={() => onClick(item.id)}
        >
        Ver más
        </button>
    ),
    Sustancias: (item, onClick) => (
        <button
            type="button"
            className="mt-2 btn btn-outline-info w-100 btn-font p-1 ms-2"
            onClick={() => onClick(item.id)}
        >
        Ver más
        </button>
    ),
};

export const Busqueda = ({ tipo }) => {
    // Estado para manejar la entrada de búsqueda, resultados, errores y filtro de búsqueda
    const [datoABuscar, setDatoABuscar] = useState('');
    const [resultados, setResultados] = useState([]);
    const [errorBusqueda, setErrorBusqueda] = useState('');
    const [searchByName, setSearchByName] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL;

    // Hook para manejar el debounce en la búsqueda
    const debouncedDatoABuscar = useDebounce(datoABuscar, 500);
    
    // Hook personalizado para hacer fetch de los datos
    const searchField = searchByName ? 'nombre' : 'descripcion';
    const { data, isLoading } = useFetch(`${API_URL}/events/search/${tipo}/search${debouncedDatoABuscar ? `?${searchField}=${debouncedDatoABuscar}` : ''}`);

    // Hook para manejar la navegación
    const navigate = useNavigate();
    
    // Actualiza los resultados y el mensaje de error cuando los datos cambian
    useEffect(() => {
        if (data) {
            const tipoRespuestaMap = {
                Medicamentos: 'medicamentos',
                Laboratorios: 'laboratorios',
                Sustancias: 'sustancias',
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

    // Maneja la navegación a detalles específicos
    const handleClick = (id) => {
        navigate(`/busqueda/medicina/${id}`);
    };

    // Maneja los cambios en el input de búsqueda
    const handleInputChange = (event) => {
        setDatoABuscar(event.target.value);
    };

    // Maneja los cambios en los checkboxes de búsqueda
    const handleCheckboxChange = (event) => {
        setSearchByName(event.target.id === 'buscarPorNombre');
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

                {tipo === 'Medicamentos' && (
                    <div className="form-group d-flex justify-content-start mt-3">
                        <div className="form-check form-switch me-4">
                            <input 
                                className="form-check-input custom-checkbox" 
                                type="radio" 
                                name="searchOption" 
                                id="buscarPorNombre" 
                                checked={searchByName} 
                                onChange={handleCheckboxChange} 
                            />
                            <label className="form-check-label" htmlFor="buscarPorNombre">
                                Buscar por Nombre
                            </label>
                        </div>
                        <div className="form-check form-switch">
                            <input 
                                className="form-check-input custom-checkbox" 
                                type="radio" 
                                name="searchOption" 
                                id="buscarPorDescripcion" 
                                checked={!searchByName} 
                                onChange={handleCheckboxChange} 
                            />
                            <label className="form-check-label" htmlFor="buscarPorDescripcion">
                                Buscar por Descripción
                            </label>
                        </div>
                    </div>
                )}
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
                                {/* Renderiza el botón adecuado basado en el tipo */}
                                {TIPO_COMPONENTS[tipo](item, handleClick)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};
