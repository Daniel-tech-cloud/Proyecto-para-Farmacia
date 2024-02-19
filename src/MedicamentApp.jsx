import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';


export const MedicamentApp = ({nombreMedicamento}) => {

    const [medicamentos, setMedicamentos] = useState([]);

    useEffect(() => {
        buscarEnCSV(nombreMedicamento); 
    }, [nombreMedicamento]);


    function buscarEnCSV(datoABuscar) {
        Papa.parse("./src/seed/insumos_medicos.csv", {
            download: true,
            header: true,
            complete: function(results) {
                const datos = results.data;
                // Convertir datoABuscar a minúsculas
                const datoABuscarMinusculas = datoABuscar.toLowerCase();
                // Filtrar las filas que contienen la palabra clave en la columna 'descripcion'
                const filasEncontradas = datos.filter(fila => fila.descripcion && fila.descripcion.toLowerCase().includes(datoABuscarMinusculas));
                if (filasEncontradas.length > 0) {
                    setMedicamentos(filasEncontradas);
                } else {
                    console.log('No se encontraron filas para la palabra clave proporcionada.');
                }
            }
        });
    }
    

    return (
        <>
            <div className="container">
                <div className="row">
                    {medicamentos.map((medicamento, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card h-100 d-flex flex-column">
                                <img src="./img/Quitadol.jpg" className="card-img-top" width="200" height="250" alt="..." />
                                <div className="card-body">
                                    <p className="card-text text-justify">{medicamento.descripcion}</p> 
                                </div>
                                <div className="mt-right card-footer">
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
}