import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSignInAlt, faBell, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../components/context/UserContext';
import '../style.css';

export const NavBar = () => {

    const API_URL = import.meta.env.VITE_API_URL;
    const [showMenu, setShowMenu] = useState(false);
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const [notifications, setNotifications] = useState(0); // Estado inicial de las notificaciones
    const [expiredMedicaments, setExpiredMedicaments] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const savedUser = sessionStorage.getItem('user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error al analizar el usuario desde localStorage:', error);
            }
        }
    }, [setUser]);

    useEffect(() => {
        if (user) {
            fetchExpiredMedicaments();
        }
    }, [user]);

    const fetchExpiredMedicaments = async () => {
        try {
            const response = await fetch(`${API_URL}/events/inventory/expired`);
            const data = await response.json();
            setExpiredMedicaments(data);
            setNotifications(data.length);
        } catch (error) {
            console.error('Error fetching expired medicaments:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate("/login");
    };

    const isLoginPage = location.pathname === '/login';

    const handleBellClick = () => {
        setShowModal(true);
    };

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
                            <div className="notification-icon position-relative me-5">
                                <button className="btn btn-outline-secondary" onClick={handleBellClick}>
                                    <FontAwesomeIcon icon={faBell} />
                                </button>
                                {notifications > 0 && (
                                    <span className="notification-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {notifications}
                                        <span className="visually-hidden">Notificaciones</span>
                                    </span>
                                )}
                            </div>
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
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Medicamentos Caducados</h5>
                            <button type="button" className="close" onClick={() => setShowModal(false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <div className="modal-body">
                            {expiredMedicaments.length > 0 ? (
                                <ul>
                                    {expiredMedicaments.map(med => (
                                        <li key={med.idInventario}>
                                            {med.nombreMedicamento} - {med.cantidad} unidades
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No hay medicamentos caducados.</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};
