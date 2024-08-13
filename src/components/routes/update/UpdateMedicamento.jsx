

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
        <div className="container mt-5 mb-5">
            <h2> Actualizar medicamento </h2>
            <div className="card shadow-lg p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            className="form-control"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Sustancia</label>
                        <input
                            type="text"
                            name="idSustancia"
                            className="form-control"
                            value={formData.idSustancia}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Presentación</label>
                        <input
                            type="text"
                            name="idPresentacion"
                            className="form-control"
                            value={formData.idPresentacion}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Laboratorio</label>
                        <input
                            type="text"
                            name="idLaboratorio"
                            className="form-control"
                            value={formData.idLaboratorio}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <input
                            type="text"
                            name="descripcion"
                            className="form-control"
                            value={formData.descripcion}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Indicaciones</label>
                        <input
                            type="text"
                            name="indicaciones"
                            className="form-control"
                            value={formData.indicaciones}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Compuesto</label>
                        <input
                            type="text"
                            name="compuesto"
                            className="form-control"
                            value={formData.compuesto}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Imagen</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="d-flex justify-content-end"> 
                        <button type="submit" className="btn btn-primary">Actualizar Medicamento</button>

                    </div>
                </form>
            </div>
        </div>
    );
};
