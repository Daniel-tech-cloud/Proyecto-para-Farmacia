import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Indicaciones, Busqueda, Laboratorios, NavBar, } from "../components";



export const AppRouter = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="home" element={ <Home /> } />
                <Route path="laboratorios" element={ <Laboratorios /> } />
                <Route path="indicaciones" element={ <Indicaciones /> } />
                <Route path="/" element={ <Navigate to="/home"/> } />

                <Route path="/api/busqueda/medicina" element={<Busqueda tipo="Medicamento" />} />
                <Route path="/api/busqueda/laboratorio" element={<Busqueda tipo="Laboratorio" />} />
                <Route path="/api/busqueda/sustancia" element={<Busqueda tipo="Sustancia" />} />

                <Route path="/api/busqueda/medicina/:id" element={<Indicaciones/>} />
            </Routes>
        </>
    )
}
