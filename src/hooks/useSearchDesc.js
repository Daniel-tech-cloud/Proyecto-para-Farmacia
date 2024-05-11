import { useEffect, useState } from 'react';
import Papa from 'papaparse';

export const useSearchDesc = (nombreArchivo, datoABuscar) => {
    const [resultados, setResultados] = useState([]);

    useEffect(() => {
        const buscarEnCSV = () => {
            Papa.parse(nombreArchivo, {
                download: true,
                header: true,
                complete: function (results) {
                    const { data } = results; // Desestructuración del objeto results
                    const datoABuscarMinusculas = datoABuscar.toLowerCase();
                    const filasEncontradas = data.filter(fila => {
                        const { descripcion } = fila; // Desestructuración de cada fila
                        return descripcion && descripcion.toLowerCase().includes(datoABuscarMinusculas);
                    });
                    if (filasEncontradas.length > 0) {
                        setResultados(filasEncontradas);
                    } else {
                        console.log('No se encontraron filas para la palabra clave proporcionada.');
                    }
                }
            });
        };

        buscarEnCSV();

    }, [nombreArchivo, datoABuscar]);

    return resultados;
};