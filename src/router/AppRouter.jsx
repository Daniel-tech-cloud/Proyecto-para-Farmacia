import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Inventario, NavBar, Laboratorios, Footer } from "../components";
import { RegistroUsuario, Login, PrivateRoute } from "../components/routes/user";
import { Busqueda, Informacion, Descripcion } from "../components/routes/busqueda";
import { AltaMedicamento } from "../components/routes/new";
import { UserProvider } from "../components/context/UserContext";
import { UpdateMedicamento, UpdateLaboratorio, UpdateSustancia } from "../components/routes/update";

export const AppRouter = () => {
    return (
        <UserProvider>
            <NavBar />
            <div className="main-container">
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

                    {/* Rutas de actualización */}
                    <Route path="update/medicamento/:id" element={<UpdateMedicamento />} />
                    <Route path="update/laboratorio/:id" element={<UpdateLaboratorio />} />
                    <Route path="update/sustancia/:id" element={<UpdateSustancia />} />

                    {/* Usa PrivateRoute para rutas protegidas */}
                    <Route path="alta" element={<PrivateRoute element={AltaMedicamento} />} />
                    <Route path="inventario" element={<PrivateRoute element={Inventario} />} />

                    {/* Redirige a home si la ruta no coincide */}
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
                <Footer />
            </div>
        </UserProvider>
    );
};
