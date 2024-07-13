import { Routes, Route, Navigate } from "react-router-dom";
import { Home, NavBar, Laboratorios } from "../components";
import { RegistroUsuario, Login } from "../components/routes/user";
import {  Busqueda,  Informacion, Indicaciones } from "../components/routes/busqueda";
import { AltaMedicamento } from "../components/routes/new";


export const AppRouter = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="home" element={ <Home /> } />
                <Route path="laboratorios" element={ <Laboratorios /> } />
                <Route path="login" element={ <Login /> } />

                <Route path="*" element={ <Navigate to="/login" />} /> {/* Redirige a home si la ruta no coincide */}
                {/* Registro usuario */}
                <Route path="registro" element={ <RegistroUsuario /> } />

                {/* Búsqeuda */}
                <Route path="busqueda/medicina" element={<Busqueda tipo="Medicamentos" />} />
                <Route path="busqueda/laboratorio" element={<Busqueda tipo="Laboratorios" />} />
                <Route path="busqueda/sustancia" element={<Busqueda tipo="Sustancias" />} />
                <Route path="busqueda/medicina/:id" element={<Indicaciones />} />
                <Route path="busqueda/laboratorio/:id" element={<Informacion tipo="Laboratorios" />} />
                <Route path="busqueda/sustancia/:id" element={<Informacion tipo="Sustancia" />} />

                <Route path="alta" element={ <AltaMedicamento /> } />

                
            </Routes>
        </>
    );
}
