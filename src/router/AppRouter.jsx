import { Routes, Route, Navigate } from "react-router-dom";
import { Home, NavBar, Laboratorios } from "../components";
import { RegistroUsuario, Login } from "../components/routes/user";
import { Busqueda, Informacion, Descripcion } from "../components/routes/busqueda";
import { AltaMedicamento } from "../components/routes/new";
import { UserProvider } from "../components/context/UserContext";
import PrivateRoute from "../components/routes/user/PrivateRoute"; // Importa el HOC PrivateRoute

export const AppRouter = () => {
    return (
        <UserProvider>
            <NavBar />
            <Routes>
                {/* Rutas públicas */}
                <Route path="login" element={<Login />} />
                <Route path="registro" element={<RegistroUsuario />} />
                <Route path="home" element={<Home />} />
                <Route path="laboratorios" element={<Laboratorios />} />
                
                {/* Rutas de búsqueda públicas */}
                <Route path="busqueda/medicina" element={<Busqueda tipo="Medicamentos" />} />
                <Route path="busqueda/laboratorio" element={<Busqueda tipo="Laboratorios" />} />
                <Route path="busqueda/sustancia" element={<Busqueda tipo="Sustancias" />} />
                <Route path="busqueda/medicina/:id" element={<Descripcion />} />
                <Route path="busqueda/laboratorio/:id" element={<Informacion tipo="Laboratorio" />} />
                <Route path="busqueda/sustancia/:id" element={<Informacion tipo="Sustancia" />} />

                {/* Usuario */}
                <Route path="laboratorios" element={<Laboratorios />} />

                {/* Usa PrivateRoute para rutas protegidas */}
                <Route path="alta" element={<PrivateRoute element={AltaMedicamento} />} />

                {/* Redirige a home si la ruta no coincide */}
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </UserProvider>
    );
};
