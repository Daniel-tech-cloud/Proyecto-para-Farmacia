import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export const PrivateRoute = ({ element: Component, ...rest }) => {
    const { user } = useUser();

    return user ? <Component {...rest} /> : <Navigate to="/login" />;
};


