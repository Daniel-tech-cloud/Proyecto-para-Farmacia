import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateLaboratorio } from '../../../services/api';
import { useFetch } from '../../../hooks/useFetch';

export const UpdateLaboratorio = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();    
    const { data, isLoading, hasError } = useFetch(`${API_URL}/events/search/laboratorios/${id}`);

    // Este useEffect se ejecuta cuando los datos se cargan correctamente
    useEffect(() => {
        if (data && data.laboratorio) { // Verifica que data y data.laboratorio no estén vacíos
            setNombre(data.laboratorio.nombre);
            setDescripcion(data.laboratorio.descripcion);
        }
    }, [data]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedData = { nombre, descripcion };
        const response = await updateLaboratorio(id, updatedData);

        if (response.ok) {
            alert('Laboratorio actualizado exitosamente');
            navigate('/laboratorios');
        } else {
            alert('Error al actualizar el laboratorio');
        }
    };

    return (
        <>
            {isLoading && <div className="alert alert-info">Cargando...</div>}
            {hasError && <div className="alert alert-danger">Error: {hasError.message}</div>}
    
            {data && data.laboratorio && !isLoading && !hasError && (
                <div className="container">
                    <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded">
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={descripcion} 
                                onChange={(e) => setDescripcion(e.target.value)} 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Actualizar Laboratorio</button>
                    </form>
                </div>
            )}

            {!data && !isLoading && !hasError && (
                <div className="alert alert-warning">No se encontraron datos para este laboratorio.</div>
            )}
        </>
    );
};
