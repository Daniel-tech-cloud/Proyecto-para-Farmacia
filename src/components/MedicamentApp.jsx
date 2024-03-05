import React from 'react';
import { useBuscarEnCSV } from '../hooks/useBuscarEnCSV';


export const MedicamentApp = ({ nombreMedicamento, archivoCSV }) => {
    const medicamentos = useBuscarEnCSV(archivoCSV, nombreMedicamento);

    return (
        <>
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
                                    <form className="d-flex" role="search" >
                                        <button className="btn btn-primary" type="submit">Indicaciones</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};
