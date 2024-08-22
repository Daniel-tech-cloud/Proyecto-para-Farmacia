import { useFetch } from '../hooks';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../style.css'; 

export const Ver = ({ tipo }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const endpoints = {
        'Medicamento': `${API_URL}/events/search/medicamentos/`,
        'Laboratorio': `${API_URL}/events/search/laboratorios/`,
        'Sustancia': `${API_URL}/events/search/sustancias/`
    };
    const navigate = useNavigate(); 

    const { data, isLoading, hasError } = useFetch(endpoints[tipo]);
    
    // Define rutas específicas para medicamentos y otros tipos
    const getDetailLink = (item) => {
        if (tipo === 'Medicamento') {
            return `/busqueda/medicina/${item.id}`; // Ruta específica para medicamentos
        } else {
            return `/busqueda/${tipo.toLowerCase()}/${item.id}`; // Ruta general para otros tipos
        }
    };

    const handleNewMedicament = () => {
        navigate("/new/medicamento");
    }

    return (
        <div className="container mt-5">
            <h1 className="font-h1">
                <small className="text-body">Ver {tipo.toLowerCase()}s:</small>
            </h1>
            <button className="btn btn-primary m-3" onClick={handleNewMedicament}>
                <FontAwesomeIcon icon={faPlus} /> Agregar nuevo medicamento
            </button>
            {isLoading && <h2 className="text-center">Cargando...</h2>}
            {hasError && <p className="text-danger">Ocurrió un error al cargar los {tipo.toLowerCase()}s.</p>}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3 mb-5">
                {data && data[`${tipo.toLowerCase()}s`] && data[`${tipo.toLowerCase()}s`].map((item) => (
                    <div className="col" key={item.id}>
                        <div className="card laboratorio-card">
                            <div className="card-body">
                                <h5 className="card-title">Número: {item.id}</h5>
                                <p className="card-text">Nombre: {item.nombre}</p>
                                <div className="d-grid gap-2">
                                    <div className="row">
                                        <div className="col">
                                            <a href={getDetailLink(item)} className="btn btn-primary">
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
