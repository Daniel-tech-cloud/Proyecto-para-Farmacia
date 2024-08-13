import { useState, useEffect } from 'react';

export const AltaMedicamento = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [laboratorios, setLaboratorios] = useState([]);
    const [sustancias, setSustancias] = useState([]);
    const [presentaciones, setPresentaciones] = useState([]);
    const [isCompuesto, setIsCompuesto] = useState(false); // Estado para manejar si el medicamento es compuesto
    const [formData, setFormData] = useState({
        nombre: '',
        sustancia: '',
        presentacion: '',
        tipo:'',
        laboratorio: '',
        descripcion: '',
        indicaciones: '',
        imagen: null,
        compuesto: '' // Agrega este campo para el medicamento compuesto
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch laboratorios
                const laboratoriosResponse = await fetch(`${API_URL}/events/search/laboratorios/`);
                const laboratoriosData = await laboratoriosResponse.json();
                if (laboratoriosData.ok) {
                    setLaboratorios(laboratoriosData.laboratorios);
                } else {
                    console.error('Error en la respuesta de los laboratorios:', laboratoriosData);
                }

                // Fetch sustancias
                const sustanciasResponse = await fetch(`${API_URL}/events/search/sustancias/`);
                const sustanciasData = await sustanciasResponse.json();
                if (sustanciasData.ok) {
                    setSustancias(sustanciasData.sustancias);
                } else {
                    console.error('Error en la respuesta de las sustancias:', sustanciasData);
                }

                // Fetch presentaciones
                const presentacionesResponse = await fetch(`${API_URL}/events/search/presentaciones/`);
                const presentacionesData = await presentacionesResponse.json();
                if (presentacionesData.ok) {
                    setPresentaciones(presentacionesData.presentaciones);
                } else {
                    console.error('Error en la respuesta de las presentaciones:', presentacionesData);
                }
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
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

        const formDataToSend = new FormData();
        formDataToSend.append('nombre', formData.nombre);
        formDataToSend.append('tipo', formData.tipo);
        formDataToSend.append('sustancia', formData.sustancia);
        formDataToSend.append('presentacion', formData.presentacion);
        formDataToSend.append('laboratorio', formData.laboratorio);
        formDataToSend.append('descripcion', formData.descripcion);
        formDataToSend.append('indicaciones', formData.indicaciones);
        formDataToSend.append('imagen', formData.imagen);
        if (isCompuesto) {
            formDataToSend.append('compuesto', formData.compuesto);
        }

        try {
            const response = await fetch(`${API_URL}/events/new/medicamento/`, {
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
                    tipo:'',
                    laboratorio: '',
                    descripcion: '',
                    indicaciones: '',
                    imagen: null,
                    compuesto: ''
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
                <h2 className="font-title d-flex justify-content-center mb-5">Nuevo medicamento</h2>
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
                        <a className="d-flex justify-content-end" href="/new/sustancia"> Agregar nueva sustancia </a>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="sustancia" className="font-form form-label">Tipo</label>
                        <select
                            id="tipo"
                            className="font-ddl form-select"
                            value={formData.tipo}
                            onChange={handleChange}
                        >
                        <option value="">Selecciona el tipo</option>
                            <option value="Medicamento">Medicamento</option>
                            <option value="Naturista">Naturista</option>
                            <option value="Cosmético">Cosmético</option>
                            <option value="Artículo">Artículo</option>
                                                
                        </select>
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="compuesto" className="font-form form-label">Medicamento Compuesto: </label>
                        <button
                            type="button"
                            className="btn btn-secondary m-1"
                            onClick={() => setIsCompuesto(prevState => !prevState)}
                        >
                            {isCompuesto ? 'Sí' : 'No'}
                        </button>
                        {isCompuesto && (
                            <input
                                type="text"
                                id="compuesto"
                                className="form-control mt-3"
                                placeholder="Ingresa información del compuesto"
                                value={formData.compuesto}
                                onChange={handleChange}
                            />
                        )}
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
                        <a className="d-flex justify-content-end" href="/new/laboratorio"> Agregar nuevo laboratorio </a>
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
