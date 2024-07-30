import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../components/context/UserContext';
import '../style.css';

export const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error al analizar el usuario desde localStorage:', error);
            }
        }
    }, [setUser]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate("/login");
    };

    const isLoginPage = location.pathname === '/login';

    return (
        <nav className="navbar navbar-expand-lg background-navbar rounded-3">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src="/public/img/logo.png" alt="Logo" className="img-logo img-fluid" />
                    <h1 className="m-0">Farmacia de genéricos</h1>
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
                        {user && (
                            <li className="nav-item">
                                <Link to="/inventario" className="nav-link">Inventario</Link>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="navbar-brand d-flex align-items-center">
                    {user ? (
                        <>
                            <span className="me-3">{user} </span>
                            <button className="btn btn-outline-danger" onClick={handleLogout}>
                                <FontAwesomeIcon icon={faSignOutAlt} /> Salir
                            </button>
                        </>
                    ) : (
                        !isLoginPage && (
                            <Link to="/login" className="btn btn-outline-success">
                                <FontAwesomeIcon icon={faSignInAlt} /> Iniciar Sesión
                            </Link>
                        )
                    )}
                </div>
            </div>
        </nav>
    );
};
