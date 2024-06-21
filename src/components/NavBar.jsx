import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import '../style.css';

export const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    
    const isAuthenticated = () => {
        
    }

    return (
        <>
           <nav className="navbar navbar-expand-lg background-navbar rounded-3">
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center" href="/">
                        <img src="/public/img/logo.png" alt="Logo" className="img-logo img-fluid" />
                        <h1 className="m-0">Farmacia Tlatelolco</h1>
                    </a>

                    <button className="navbar-toggler" type="button" onClick={() => setShowMenu(!showMenu)}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`}>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-font d-flex align-items-center">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/home">Inicio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/laboratorios">Laboratorios</a>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="navbar-brand">
                    <span>
                        Daniel Barrera {/*  // TODO: Validar usuario */}
                                        {/*  // TODO: Arreglar fondo de navbar */}
                    </span>

                    <button className="ms-3 btn btn-outline-danger">
                        <FontAwesomeIcon icon={faSignOutAlt} /> Salir
                    </button>
                </div>

            </nav>
        </>
    )
}