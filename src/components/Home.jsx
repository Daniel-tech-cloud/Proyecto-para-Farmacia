import { Link } from 'react-router-dom';
import imgMedicina from '../../public/img/medicina.png';
import imgLaboratorio from '../../public/img/laboratorio.png';
import imgSustancia from '../../public/img/sustancia.png';
import '../style.css';

// Componente para la tarjeta de búsqueda
const TarjetaBusqueda = ({ imagen, alt, tipoBusqueda, ruta }) => (
    <div className="col-md-4 mb-4">
        <div className="card border-light">
            <img src={imagen} className="img-fluid align-self-center rounded" alt={alt} />
            <div className="card-body card-font">
                <h5 className="card-title">Búsqueda por: </h5>
                <h5 className="card-title ms-2">{tipoBusqueda}</h5>
                <Link to={ruta}>
                    <button className="btn btn-outline-info w-100 btn-font">Ver más...</button>
                </Link>
            </div>
        </div>
    </div>
);

export const Home = () => {
    const obtenerSaludo = () => {
        const fecha = new Date();
        const hora = fecha.getHours();
        if (hora < 12) return "¡Buenos días!";
        if (hora < 18) return "¡Buenas tardes!";
        return "¡Buenas noches!";
    };

    return (
        <>
            <div className="container mt-5 mb-4">
                <h1 className="color-h1 font-h1">
                    <small className="text-body">{obtenerSaludo()}</small>
                </h1>
            </div>

            <div className="container d-flex justify-content-center">
                <div className="row">
                    <TarjetaBusqueda 
                        imagen={imgMedicina} 
                        alt="medicina" 
                        tipoBusqueda="Nombre de medicamento" 
                        ruta="/busqueda/medicina"
                    />
                    <TarjetaBusqueda 
                        imagen={imgLaboratorio} 
                        alt="laboratorio" 
                        tipoBusqueda="Laboratorio" 
                        ruta="/busqueda/laboratorio"
                    />
                    <TarjetaBusqueda 
                        imagen={imgSustancia} 
                        alt="sustancia activa" 
                        tipoBusqueda="Sustancia activa" 
                        ruta="/busqueda/sustancia"
                    />
                </div>
            </div>
            <hr /> 
        </>
    );
};
