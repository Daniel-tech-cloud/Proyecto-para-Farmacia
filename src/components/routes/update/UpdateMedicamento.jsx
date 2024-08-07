// components/UpdateMedicamento.js
import { useState } from 'react';
import { updateMedicamento } from '../../../services/api';

export const UpdateMedicamento = ({ id }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        idSustancia: '',
        idPresentacion: '',
        idLaboratorio: '',
        descripcion: '',
        indicaciones: '',
        compuesto: ''
    });
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await updateMedicamento(id, formData, image);
        console.log(response);
        if (response.ok) {
            alert('Medicamento actualizado exitosamente');
        } else {
            alert('Error al actualizar el medicamento');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div>
                <label>Sustancia</label>
                <input type="text" name="idSustancia" value={formData.idSustancia} onChange={handleChange} />
            </div>
            <div>
                <label>Presentación</label>
                <input type="text" name="idPresentacion" value={formData.idPresentacion} onChange={handleChange} />
            </div>
            <div>
                <label>Laboratorio</label>
                <input type="text" name="idLaboratorio" value={formData.idLaboratorio} onChange={handleChange} />
            </div>
            <div>
                <label>Descripción</label>
                <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} />
            </div>
            <div>
                <label>Indicaciones</label>
                <input type="text" name="indicaciones" value={formData.indicaciones} onChange={handleChange} />
            </div>
            <div>
                <label>Compuesto</label>
                <input type="text" name="compuesto" value={formData.compuesto} onChange={handleChange} />
            </div>
            <div>
                <label>Imagen</label>
                <input type="file" onChange={handleImageChange} />
            </div>
            <button type="submit">Actualizar Medicamento</button>
        </form>
    );
};


