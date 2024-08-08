import { useFetch } from '../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import '../style.css'; 

export const Laboratorios = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { data, isLoading } = useFetch(`${API_URL}/events/search/laboratorios/`);

    return (
        <div className="container mt-5">
            <h1 className="font-h1">
                <small className="text-body">Ver laboratorios:</small>
            </h1>
            {isLoading && <h2 className="text-center">Cargando...</h2>}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3">
                {data && data.laboratorios.map((laboratorio, index) => (
                    <div className="col" key={index}>
                        <div className="card laboratorio-card">
                            <div className="card-body col-2 w-100">
                                <h5 className="card-title">Número: {laboratorio.id}</h5>
                                <p className="card-text">Nombre: {laboratorio.nombre}</p>
                                <div className="d-grid gap-2">
                                    <div className="row">
                                        <div className="col">
                                            <a href={`/busqueda/laboratorio/${laboratorio.id}`} className="btn btn-primary">
                                                <FontAwesomeIcon icon={faInfoCircle} /> Más información
                                            </a>
                                        </div>
                                        <div className="col text-end">
                                            <a href={`/update/laboratorio/${laboratorio.id}`} className="btn btn-secondary">
                                                <FontAwesomeIcon icon={faEdit} /> Editar Laboratorio
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
