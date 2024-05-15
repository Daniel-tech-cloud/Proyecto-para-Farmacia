import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../style.css';

export const Home = () => {

    const obtenerSaludo = () => {
        const fecha = new Date();
        const hora = fecha.getHours();

        let saludo;

        if (hora < 12) {
            saludo = "¡Buenos días!";
        } else if (hora < 18) {
            saludo = "¡Buenas tardes!";
        } else {
            saludo = "¡Buenas noches!";
        }
        return saludo;
    }

    return (
        <>
            <div className="container m-2">
                <h1 className="color-h1 font-h1">
                    <small className="text-body">{ obtenerSaludo() }</small>
                </h1>
            </div>

            <div className="container d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card border-light">
                            <img src="../public/img/medicina.png" className="img-fluid align-self-center rounded" alt="medicina"/>
                            <div className="card-body card-font">
                                <h5 className="card-title">Búsqueda por: </h5>
                                <h5 className="card-title ms-2">Nombre de medicamento </h5>
                                <a href="/api/busqueda/medicina" className="btn btn-outline-info w-100 btn-font"> Ver más... </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card border-light">
                            <img src="../public/img/laboratorio.png" className="img-fluid align-self-center rounded" alt="laboratorio"/>
                            <div className="card-body card-font">
                                <h5 className="card-title">Búsqueda por: </h5> 
                                <h5 className="card-title ms-2">Laboratorio</h5> 
                                <a href="/api/busqueda/laboratorio" className="btn btn-outline-info w-100 btn-font"> Ver más... </a>
                            </div>
               
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card border-light">
                            <img src="../public/img/sustancia.png" className="img-fluid align-self-center rounded" alt="sustancia activa"/>
                            <div className="card-body card-font">
                                <h5 className="card-title"> Búsqueda por:  </h5>
                                <h5 className="card-title ms-2"> Sustancia activa </h5>
          
                                <a href="/api/busqueda/sustancia" className="btn btn-outline-info w-100 btn-font"> Ver más... </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr/> 
        </>
    )
}
