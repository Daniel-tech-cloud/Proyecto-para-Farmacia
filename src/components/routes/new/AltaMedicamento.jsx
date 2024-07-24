import React, { useState, useEffect } from 'react';

export const AltaMedicamento = () => {
    const [laboratorios, setLaboratorios] = useState([]);
    const [sustancias, setSustancias] = useState([]);
    const [presentaciones, setPresentaciones] = useState([]);

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
        
            // Fetch sustancias
        fetch('http://localhost:3001/api/events/search/presentaciones/')
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                setPresentaciones(data.presentaciones);
            } else {
                console.error('Error en la respuesta de las sustancias:', data);
            }
        })
        .catch(error => {
            console.error('Error al obtener las sustancias:', error);
        });
    }, []);
    const handleAltaMedicamento = async (event) => {
        event.preventDefault(); // Prevenir el envío del formulario por defecto

        // Obtener los valores del formulario
        const nombre = document.getElementById('name').value;
        const sustancia = document.getElementById('substance').value;
        const presentacion = document.getElementById('presentation').value;
        const laboratorio = document.getElementById('laboratory').value;
        const descripcion = document.getElementById('description').value;
        const indicaciones = document.getElementById('indications').value;
        const imagen = document.getElementById('image').files[0]; // Manejar la subida de archivos según necesidad
        console.log(nombre,
            sustancia,
            presentacion,
            laboratorio,
            descripcion,
            indicaciones,
            imagen,);

        // Crear un objeto con los datos del formulario
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('sustancia', sustancia);
        formData.append('presentacion', presentacion);
        formData.append('laboratorio', laboratorio);
        formData.append('descripcion', descripcion);
        formData.append('indicaciones', indicaciones);
        formData.append('imagen', imagen);
        console.log(formData);

        // Enviar los datos al servidor
        try {
            const response = await fetch('http://localhost:3001/api/events/new/medicamento/', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito al usuario
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            // Aquí puedes manejar errores, como mostrar un mensaje al usuario indicando que hubo un problema
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="bg-form">
                <h2 className="font-title d-flex justify-content-center mb-5">Nuevo Medicamento</h2>
                <form className="row" onSubmit={handleAltaMedicamento}>
                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="name" className="font-form form-label">Nombre</label>
                        <input type="text" id="name" className="form-control" placeholder="Ingresa el nombre del medicamento" />
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="substance" className="font-form form-label">Sustancia</label>
                        <select id="substance" className="font-ddl form-select">
                            <option value="">Selecciona la sustancia</option>
                            {sustancias.map(item => (
                                <option key={item.id} value={item.nombre}>
                                    {item.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="presentation" className="font-form form-label">Presentación</label>
                        <select id="presentation" className="font-ddl form-select">
                        <option value="">Selecciona la sustancia</option>
                        {presentaciones.map(item => (
                            <option key={item.id} value={item.nombre}>
                                {item.nombre}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="laboratory" className="font-form form-label">Laboratorio</label>
                        <select id="laboratory" className="font-ddl form-select">
                            <option value="">Selecciona el laboratorio</option>
                            {laboratorios.map(lab => (
                                <option key={lab.id} value={lab.nombre}>
                                    {lab.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="description" className="font-form form-label">Descripción</label>
                        <textarea id="description" className="form-control" rows="3" placeholder="Ingresa la descripción del medicamento"></textarea>
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="indications" className="font-form form-label">Indicaciones</label>
                        <textarea id="indications" className="form-control" rows="3" placeholder="Ingresa las indicaciones del medicamento"></textarea>
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="image" className="font-form form-label">Imagen</label>
                        <input type="file" id="image" className="form-control" />
                    </div>
                    <div className="mt-5 d-flex justify-content-end">
                        <button type="submit" className="btn-custom">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
