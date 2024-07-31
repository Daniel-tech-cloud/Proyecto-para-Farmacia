import React, { useState, useEffect } from 'react';

export const AltaMedicamento = () => {
    const [laboratorios, setLaboratorios] = useState([]);
    const [sustancias, setSustancias] = useState([]);
    const [presentaciones, setPresentaciones] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        sustancia: '',
        presentacion: '',
        laboratorio: '',
        descripcion: '',
        indicaciones: '',
        imagen: null
    });

    useEffect(() => {
        // Fetch laboratorios
        fetch('http://localhost:3001/api/events/search/laboratorios/')
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    setLaboratorios(data.laboratorios);
                } else {
                    console.error('Error en la respuesta de los laboratorios:', data);
                }
            })
            .catch(error => {
                console.error('Error al obtener los laboratorios:', error);
            });

        // Fetch sustancias
        fetch('http://localhost:3001/api/events/search/sustancias/')
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    setSustancias(data.sustancias);
                } else {
                    console.error('Error en la respuesta de las sustancias:', data);
                }
            })
            .catch(error => {
                console.error('Error al obtener las sustancias:', error);
            });

        // Fetch presentaciones
        fetch('http://localhost:3001/api/events/search/presentaciones/')
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    setPresentaciones(data.presentaciones);
                } else {
                    console.error('Error en la respuesta de las presentaciones:', data);
                }
            })
            .catch(error => {
                console.error('Error al obtener las presentaciones:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: files ? files[0] : value
        }));
    };

    const handleAltaMedicamento = async (event) => {
        event.preventDefault(); // Prevenir el envío del formulario por defecto

        // Crear un objeto con los datos del formulario
        const formDataToSend = new FormData();
        formDataToSend.append('nombre', formData.nombre);
        formDataToSend.append('sustancia', formData.sustancia);
        formDataToSend.append('presentacion', formData.presentacion);
        formDataToSend.append('laboratorio', formData.laboratorio);
        formDataToSend.append('descripcion', formData.descripcion);
        formDataToSend.append('indicaciones', formData.indicaciones);
        formDataToSend.append('imagen', formData.imagen);

        // Enviar los datos al servidor
        try {
            const response = await fetch('http://localhost:3001/api/events/new/medicamento/', {
                method: 'POST',
                body: formDataToSend
            });
            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            if (data.ok) {
                // Limpiar los campos del formulario y mostrar mensaje de éxito
                setFormData({
                    nombre: '',
                    sustancia: '',
                    presentacion: '',
                    laboratorio: '',
                    descripcion: '',
                    indicaciones: '',
                    imagen: null
                });
                alert('El medicamento se ha guardado exitosamente.');
            } else {
                console.error('Error en la respuesta del servidor:', data);
                alert('Hubo un problema al guardar el medicamento.');
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('Hubo un problema al enviar los datos.');
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="bg-form">
                <h2 className="font-title d-flex justify-content-center mb-5">Nuevo Medicamento</h2>
                <form className="row" onSubmit={handleAltaMedicamento}>
                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="nombre" className="font-form form-label">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            className="form-control"
                            placeholder="Ingresa el nombre del medicamento"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="sustancia" className="font-form form-label">Sustancia</label>
                        <select
                            id="sustancia"
                            className="font-ddl form-select"
                            value={formData.sustancia}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona la sustancia</option>
                            {sustancias.map(item => (
                                <option key={item.id} value={item.nombre}>
                                    {item.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="presentacion" className="font-form form-label">Presentación</label>
                        <select
                            id="presentacion"
                            className="font-ddl form-select"
                            value={formData.presentacion}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona la presentación</option>
                            {presentaciones.map(item => (
                                <option key={item.id} value={item.nombre}>
                                    {item.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="laboratorio" className="font-form form-label">Laboratorio</label>
                        <select
                            id="laboratorio"
                            className="font-ddl form-select"
                            value={formData.laboratorio}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona el laboratorio</option>
                            {laboratorios.map(lab => (
                                <option key={lab.id} value={lab.nombre}>
                                    {lab.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="descripcion" className="font-form form-label">Descripción</label>
                        <textarea
                            id="descripcion"
                            className="form-control"
                            rows="3"
                            placeholder="Ingresa la descripción del medicamento"
                            value={formData.descripcion}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="indicaciones" className="font-form form-label">Indicaciones</label>
                        <textarea
                            id="indicaciones"
                            className="form-control"
                            rows="3"
                            placeholder="Ingresa las indicaciones del medicamento"
                            value={formData.indicaciones}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="imagen" className="font-form form-label">Imagen</label>
                        <input
                            type="file"
                            id="imagen"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-5 d-flex justify-content-end">
                        <button type="submit" className="btn-custom">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
