import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

// Componente de ruta privada
const PrivateRoute = ({ element: Component, ...rest }) => {
    const { user } = useUser();
    
    // Si el usuario no está autenticado, redirige a /login
    if (!user) {
        return <Navigate to="/home" />;
    }

    // Renderiza el componente protegido, pasando las props
    return <Component {...rest} />;
};

export default PrivateRoute;