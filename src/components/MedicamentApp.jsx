import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBuscarEnCSV } from '../hooks/useBuscarEnCSV';

export const MedicamentApp = ({ nombreMedicamento, archivoCSV }) => {
    const navigate = useNavigate(); // Utiliza useNavigate para obtener la función de navegación

    const mostrarIndicaciones = () => {
        navigate('/indicaciones'); // Navega a la ruta '/indicaciones' cuando el botón se hace clic
    };

    const medicamentos = useBuscarEnCSV(archivoCSV, nombreMedicamento);

    // Si la ruta actual es '/indicaciones', no renderizamos el componente MedicamentApp
    if (window.location.pathname === '/indicaciones') {
        return null;
    }

    return (
        <div className="container">
            <div className="row">
                {medicamentos.map((medicamento, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card h-100 d-flex flex-column">
                            <img src="../img/Quitadol.jpg" className="card-img-top" width="200" height="250" alt="..." />
                            <div className="card-body">
                                <p className="card-text">{medicamento.descripcion}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-end">
                                <button className="btn btn-primary" onClick={mostrarIndicaciones}>Indicaciones</button> {/* Llama a la función mostrarIndicaciones cuando el botón se hace clic */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
