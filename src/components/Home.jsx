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
                            <img src="../public/img/medicina.png" className="img-fluid align-self-center rounded" alt="..."/>
                            <div className="card-body card-font">
                                <h5 className="card-title">Realizar alguna búsqueda por nombre de medicamento</h5>
                                <a href="#" className="btn btn-primary w-100"> Ver </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card border-light">
                            <img src="../public/img/laboratorio.png" className="card-img-top" alt="..."/>
                            <div className="card-body card-font">
                                <h5 className="card-title">Realizar alguna búsqueda por laboratorio</h5> 
                                <a href="#" className="btn btn-primary w-100"> Ver </a>
                            </div>
               
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card border-light">
                            <img src="../public/img/sustancia.png" className="card-img-top" alt="..."/>
                            <div className="card-body card-font">
                                <h5 className="card-title"> Realizar alguna búsqueda por sustancia activa </h5>
                                <a href="#" className="btn btn-primary w-100"> Ver </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr/> 
        </>
    )
}
