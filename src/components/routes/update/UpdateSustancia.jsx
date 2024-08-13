// components/UpdateSustancia.js
import React, { useState } from 'react';
import { updateSustancia } from '../../../services/api';

export const UpdateSustancia = ({ id }) => {

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { nombre, descripcion };
        const response = await updateSustancia(id, data);
        console.log(response);
        if (response.ok) {
            alert('Registro actualizado exitosamente');
        } else {
            alert('Error al actualizar la sustancia');
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
            <button type="submit">Actualizar Sustancia</button>
        </form>
    );
};


