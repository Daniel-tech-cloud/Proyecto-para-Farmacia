import { Routes, Route, Navigate } from "react-router-dom";
import { Home,  Busqueda, Indicaciones, Informacion, Laboratorios, NavBar } from "../components";

export const AppRouter = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="home" element={ <Home /> } />
                <Route path="laboratorios" element={ <Laboratorios /> } />
                <Route path="indicaciones" element={ <Indicaciones /> } />
                
                <Route path="/" element={ <Navigate to="/home"/> } />

                <Route path="busqueda/medicina" element={<Busqueda tipo="Medicamento" />} />
                <Route path="busqueda/laboratorio" element={<Busqueda tipo="Laboratorio" />} />
                <Route path="busqueda/sustancia" element={<Busqueda tipo="Sustancia" />} />

                <Route path="busqueda/medicina/:id" element={<Indicaciones />} />

                <Route path="busqueda/laboratorio/:id" element={<Informacion />} />
                <Route path="busqueda/sustancia/:id" element={<Informacion />} />

                <Route path="*" element={ <Navigate to="/home" />} /> {/* Redirige a home si la ruta no coincide */}
            </Routes>
        </>
    );
}
