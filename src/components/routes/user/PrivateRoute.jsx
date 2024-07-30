import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

// Componente de ruta privada
export const PrivateRoute = ({ element: Component, ...rest }) => {
    const { user } = useUser();
    
    // Si el usuario no está autenticado, redirige a /home
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Renderiza el componente protegido, pasando las props
    return <Component {...rest} />;
};


