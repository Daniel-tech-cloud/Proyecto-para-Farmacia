// components/UpdateLaboratorio.js
import { useState } from 'react';
import { updateLaboratorio } from '../../../services/api';

export const UpdateLaboratorio = ({ id }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { nombre, descripcion };
        const response = await updateLaboratorio(id, data);
        console.log(response);
        if (response.ok) {
            alert('Laboratorio actualizado exitosamente');
        } else {
            alert('Error al actualizar el laboratorio');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div>
                <label>Descripción</label>
                <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </div>
            <button type="submit">Actualizar Laboratorio</button>
        </form>
    );
};


