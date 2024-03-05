import { useEffect, useState } from 'react';
import Papa from 'papaparse';

export const useBuscarEnCSV = (nombreArchivo, datoABuscar) => {
    const [resultados, setResultados] = useState([]);

    useEffect(() => {
        const buscarEnCSV = () => {
            Papa.parse(nombreArchivo, {
                download: true,
                header: true,
                complete: function (results) {
                    const datos = results.data;
                    const datoABuscarMinusculas = datoABuscar.toLowerCase();
                    const filasEncontradas = datos.filter(fila => fila.descripcion && fila.descripcion.toLowerCase().includes(datoABuscarMinusculas));
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