import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom

import '../style.css';

export const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    // Función para cerrar sesión
    const handleLogout = () => {
        // Lógica para cerrar sesión
    };

    return (
        <nav className="navbar navbar-expand-lg background-navbar rounded-3">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src="/public/img/logo.png" alt="Logo" className="img-logo img-fluid" />
                    <h1 className="m-0">Farmacia Tlatelolco</h1>
                </Link>

                <button className="navbar-toggler" type="button" onClick={() => setShowMenu(!showMenu)}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-font d-flex align-items-center">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/laboratorios" className="nav-link">Laboratorios</Link>
                        </li>
                    </ul>
                </div>

                <div className="navbar-brand d-flex align-items-center">
                    <span className="me-3">
                        Daniel Barrera {/*  // TODO: Validar usuario */}
                                        {/*  // TODO: Arreglar fondo de navbar */}
                    </span>
                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} /> Salir
                    </button>
                </div>
            </div>
        </nav>
    );
};

