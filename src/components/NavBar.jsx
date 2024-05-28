
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg background-navbar rounded-3">
            <div className="container-fluid">
                <NavLink className="navbar-brand d-flex align-items-center" to="/">
                    <img src="/public/img/logo.png" alt="Logo" className="img-logo img-fluid" />
                    <h1 className="m-0">Farmacia Tlatelolco</h1>
                </NavLink>

                <button className="navbar-toggler" type="button" onClick={() => setShowMenu(!showMenu)}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''} text-center`}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-font">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" exact to="/">Inicio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/laboratorios">Laboratorios</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
