import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Indicaciones, Laboratorios, NavBar, } from "../components";
import { Busqueda } from '../components/routes/busqueda';


export const AppRouter = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="home" element={ <Home /> } />
                <Route path="laboratorios" element={ <Laboratorios /> } />
                <Route path="indicaciones" element={ <Indicaciones /> } />
                <Route path="/" element={ <Navigate to="/home"/> } />

                <Route path="/api/busqueda/medicina" element={<Busqueda tipo="Medicina" />} />
                <Route path="/api/busqueda/laboratorio" element={<Busqueda tipo="Laboratorios" />} />
                <Route path="/api/busqueda/sustancia" element={<Busqueda tipo="Sustancia activa" />} />
            </Routes>
        </>
    )
}
