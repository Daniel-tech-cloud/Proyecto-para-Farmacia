import { useFetch } from '../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import '../style.css'; 

export const Ver = ({ tipo }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const endpoints = {
        'Medicamentos': `${API_URL}/events/search/medicamentos/`,
        'Laboratorios': `${API_URL}/events/search/laboratorios/`,
        'Sustancias': `${API_URL}/events/search/sustancias/`
    };

    const { data, isLoading, hasError } = useFetch(endpoints[tipo]);

    return (
        <div className="container mt-5">
            <h1 className="font-h1">
                <small className="text-body">Ver {tipo.toLowerCase()}:</small>
            </h1>
            {isLoading && <h2 className="text-center">Cargando...</h2>}
            {hasError && <p className="text-danger">Ocurrió un error al cargar los {tipo.toLowerCase()}.</p>}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3 mb-5">
                {data && data[tipo.toLowerCase()] && data[tipo.toLowerCase()].map((item) => (
                    <div className="col " key={item.id}>
                        <div className="card laboratorio-card ">
                            <div className="card-body col-2 w-100">
                                <h5 className="card-title">Número: {item.id}</h5>
                                <p className="card-text">Nombre: {item.nombre}</p>
                                <div className="d-grid gap-2">
                                    <div className="row">
                                        <div className="col">
                                            <a href={`/busqueda/${tipo.toLowerCase()}/${item.id}`} className="btn btn-primary">
                                                <FontAwesomeIcon icon={faInfoCircle} /> Más información
                                            </a>
                                        </div>
                                        <div className="col text-end">
                                            <a href={`/update/${tipo.toLowerCase()}/${item.id}`} className="btn btn-secondary">
                                                <FontAwesomeIcon icon={faEdit} /> Editar {tipo}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
