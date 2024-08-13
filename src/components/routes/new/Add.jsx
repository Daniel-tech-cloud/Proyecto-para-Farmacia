import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addLaboratorio, addSustancia } from '../../../services/api'; 
import "../../../style.css";

export const Add = ({ tipo }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newData = { nombre, descripcion };

        // Determinar la función de servicio basada en el tipo (Laboratorio o Sustancia)
        let addFunction;
        if (tipo === 'Laboratorio') {
            addFunction = addLaboratorio;
        } else if (tipo === 'Sustancia') {
            addFunction = addSustancia;
        } else {
            return; // Manejar caso de tipo inválido o desconocido
        }

        const response = await addFunction(newData);

        if (response.ok) {
            alert(`${tipo} registrado exitosamente`);
            navigate(`/${tipo.toLowerCase()}s`); // Redirigir a la lista después del registro
        } else {
            alert(`Error al registrar ${tipo.toLowerCase()}`);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="font-h1"> { tipo } </h2>

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
                <button type="submit" className="btn btn-primary">Agregar {tipo}</button>
            </form>
        </div>
    );
};
