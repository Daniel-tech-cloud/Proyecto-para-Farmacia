import { Routes, Route, Navigate } from "react-router-dom";
import { Home, NavBar, Ver, Footer } from "../components";
import { RegistroUsuario, Login, PrivateRoute } from "../components/routes/user";
import { Busqueda, Informacion, Descripcion } from "../components/routes/busqueda";
import { Add, AltaMedicamento } from "../components/routes/new";
import { Inventario } from "../components/routes/Inventario/";
import { UserProvider } from "../components/context/UserContext";
import { UpdateMedicamento, UpdateEntity } from "../components/routes/update";
import { updateLaboratorio, updateSustancia } from "../services/api";

export const AppRouter = () => {
    return (
        <UserProvider>
            <NavBar />
            <div className="main-container">
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="login" element={ <Login /> } />
                    <Route path="registro" element={ <RegistroUsuario /> } />
                    <Route path="home" element={ <Home /> } />
                    <Route path="medicamentos" element={ <Ver tipo="Medicamento" /> } />
                    <Route path="laboratorios" element={ <Ver tipo="Laboratorio" /> } />
                    <Route path="sustancias" element={ <Ver tipo="Sustancia" /> } />

                    {/* Rutas de búsqueda públicas */}
                    <Route path="busqueda/medicina" element={ <Busqueda tipo="Medicamento" /> } />
                    <Route path="busqueda/laboratorio" element={ <Busqueda tipo="Laboratorio" /> } />
                    <Route path="busqueda/sustancia" element={ <Busqueda tipo="Sustancia" /> } />
                    <Route path="busqueda/medicina/:id" element={ <Descripcion /> } />
                    <Route path="busqueda/laboratorio/:id" element={ <Informacion tipo="Laboratorio" /> } />
                    <Route path="busqueda/sustancia/:id" element={ <Informacion tipo="Sustancia" /> } />

                    {/* Rutas de actualización */}
                    <Route path="update/medicamento/:id" element={ <UpdateMedicamento /> } />
                    <Route path="update/laboratorio/:id" element={ <UpdateEntity type="Laboratorios" updateFunction={updateLaboratorio} /> } />
                    <Route path="update/sustancia/:id" element={ <UpdateEntity type="Sustancias" updateFunction={updateSustancia} /> } />

                    {/* Usa PrivateRoute para rutas protegidas */}
                    
                    {/* Rutas para agregar nueva sustancia, laboratorio */}
                    {/* Rutas para agregar nueva sustancia, laboratorio */}
                    <Route path="/new/sustancia" element={<PrivateRoute element={Add} tipo="Sustancia" />} />
                    <Route path="/new/laboratorio" element={<PrivateRoute element={Add} tipo="Laboratorio" />} />
                    <Route path="/new/medicamento" element={<PrivateRoute element={AltaMedicamento} />} />


                    <Route path="inventario" element={ <PrivateRoute element={ Inventario } /> } />

                    {/* Redirige a home si la ruta no coincide */}
                    <Route path="*" element={ <Navigate to="/home" /> } />
                </Routes>
                <Footer />
            </div>
        </UserProvider>
    );
};
