import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

// HOC para proteger rutas
const PrivateRoute = ({ element: Component, ...rest }) => {
    const { user } = useUser(); // Obtiene el estado del usuario desde el contexto

    return user ? <Component {...rest} /> : <Navigate to="/login" />; // Redirige si no está autenticado
};

export default PrivateRoute;
