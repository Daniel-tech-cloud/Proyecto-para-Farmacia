import { Routes, Route, Navigate } from "react-router-dom";
import { Home, NavBar, Laboratorios } from "../components";
import { RegistroUsuario, Login } from "../components/routes/user";
import {  Busqueda,  Informacion, Indicaciones } from "../components/routes/busqueda";


export const AppRouter = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="home" element={ <Home /> } />
                <Route path="laboratorios" element={ <Laboratorios /> } />
                <Route path="login" element={ <Login /> } />
                
                <Route path="*" element={ <Navigate to="/login" />} /> {/* Redirige a home si la ruta no coincide */}


                <Route path="registro" element={ <RegistroUsuario /> } />

                <Route path="busqueda/medicina" element={<Busqueda tipo="Medicamento" />} />
                <Route path="busqueda/laboratorio" element={<Busqueda tipo="Laboratorio" />} />
                <Route path="busqueda/sustancia" element={<Busqueda tipo="Sustancia" />} />

                <Route path="busqueda/medicina/:id" element={<Indicaciones />} />

                <Route path="busqueda/laboratorio/:id" element={<Informacion tipo="Laboratorio" />} />
                <Route path="busqueda/sustancia/:id" element={<Informacion tipo="Sustancia" />} />


                
            </Routes>
        </>
    );
}
