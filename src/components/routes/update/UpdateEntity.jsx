import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';

export const UpdateEntity = ({ type, updateFunction }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();    
    const { data, isLoading, hasError } = useFetch(`${API_URL}/events/search/${type.toLowerCase()}/${id}`);
    
    
    useEffect(() => {
        console.log(data);
        if (data && data[type.toLowerCase()]) {
            setNombre(data[type.toLowerCase()].nombre);
            setDescripcion(data[type.toLowerCase()].descripcion);
        }
    }, [data, type]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedData = { nombre, descripcion };
        const response = await updateFunction(id, updatedData);

        if (response.ok) {
            alert(`${type} actualizado exitosamente`);
            navigate(`/${type.toLowerCase()}s`);
        } else {
            alert(`Error al actualizar el ${type}`);
        }
    };

    return (
        <>
            {isLoading && <div className="alert alert-info">Cargando...</div>}
            {hasError && <div className="alert alert-danger">Error: {hasError.message}</div>}
    
            {data && data[type.toLowerCase()] && !isLoading && !hasError && (
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
                        <button type="submit" className="btn btn-primary">Actualizar {type}</button>
                    </form>
                </div>
            )}

            {!data && !isLoading && !hasError && (
                <div className="alert alert-warning">No se encontraron datos para este {type}.</div>
            )}
        </>
    );
};
