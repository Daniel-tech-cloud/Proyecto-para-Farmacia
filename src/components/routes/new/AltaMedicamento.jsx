import React, { useState, useEffect } from 'react';

export const AltaMedicamento = () => {
    const [laboratorios, setLaboratorios] = useState([]);
    const [sustancias, setSustancias] = useState([]);

    useEffect(() => {
        // Fetch laboratorios
        fetch('http://localhost:3001/api/events/search/laboratorios/')
            .then(response => response.json())
            .then(data => {
                setLaboratorios(data);
                
            })
            .catch(error => {
                console.error('Error al obtener los laboratorios:', error);
            });

        // Fetch sustancias
        fetch('http://localhost:3001/api/events/search/sustancias/')
            .then(response => response.json())
            .then(data => {
                setSustancias(data);
            })
            .catch(error => {
                console.error('Error al obtener las sustancias:', error);
            });
    }, []);


    return (
        <>
            <div className="container mt-5 mb-5">
                <div className="bg-form">
                    <h2 className="font-title d-flex justify-content-center mb-5">Nuevo Medicamento</h2>
                    <form className="row">
                        <div className="col-12 col-md-6 mb-3">
                            <label htmlFor="name" className="font-form form-label">Nombre</label>
                            <input type="text" id="name" className="form-control" placeholder="Ingresa el nombre del medicamento" />
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                            <label htmlFor="substance" className="font-form form-label">Sustancia</label>
                            <select id="substance" className="font-ddl form-select">
                                <option value="">Selecciona la sustancia</option>
                                {Array.isArray(sustancias) && sustancias.map(item => (
                                    <option key={item.sustancias.id} value={item.sustancias.nombre}>
                                        {item.sustancias.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                            <label htmlFor="presentation" className="font-form form-label">Presentación</label>
                            <select id="presentation" className="font-ddl form-select">
                                <option value="">Selecciona la presentación</option>
                                <option value="comprimidos">Comprimidos</option>
                                <option value="capsulas">Cápsulas</option>
                                <option value="jarabe">Jarabe</option>
                            </select>
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                            <label htmlFor="laboratory" className="font-form form-label">Laboratorio</label>
                            <select id="laboratory" className="font-ddl form-select">
                                <option value="">Selecciona el laboratorio</option>
                                {Array.isArray(laboratorios) && laboratorios.map(lab => (
                                    <option key={lab.id} value={lab.id}>
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
        </>
    );
};
