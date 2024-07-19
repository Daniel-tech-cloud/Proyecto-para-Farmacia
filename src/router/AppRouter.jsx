import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, NavBar, Laboratorios } from '../components';
import { RegistroUsuario, Login } from '../components/routes/user';
import { Busqueda, Informacion, Indicaciones } from '../components/routes/busqueda';
import { AltaMedicamento } from '../components/routes/new';
import { UserProvider, useUser } from '../components/context/UserContext';
import PrivateRoute from '../components/routes/user/PrivateRoute'; // Importa el componente PrivateRoute

export const AppRouter = () => {
    return (
        <UserProvider>
            <NavBar />
            <Routes>
                <Route path="login" element={<Login />} />

                {/* Usa PrivateRoute para rutas protegidas */}
                <Route path="home" element={<PrivateRoute element={Home} />} />
                <Route path="laboratorios" element={<PrivateRoute element={Laboratorios} />} />
                <Route path="alta" element={<PrivateRoute element={AltaMedicamento} />} />

                <Route path="registro" element={<RegistroUsuario />} />

                <Route path="busqueda/medicina" element={<PrivateRoute element={<Busqueda tipo="Medicamentos" />} />} />
                <Route path="busqueda/laboratorio" element={<PrivateRoute element={<Busqueda tipo="Laboratorios" />} />} />
                <Route path="busqueda/sustancia" element={<PrivateRoute element={<Busqueda tipo="Sustancias" />} />} />
                <Route path="busqueda/medicina/:id" element={<PrivateRoute element={<Indicaciones />} />} />
                <Route path="busqueda/laboratorio/:id" element={<PrivateRoute element={<Informacion tipo="Laboratorios" />} />} />
                <Route path="busqueda/sustancia/:id" element={<PrivateRoute element={<Informacion tipo="Sustancia" />} />} />

                <Route path="*" element={<Navigate to="/home" />} /> {/* Redirige a home si la ruta no coincide */}
            </Routes>
        </UserProvider>
    );
};

