import { Routes, Route, Navigate } from "react-router-dom"
import { Home } from "../components/Home"
import { Indicaciones } from "../components/Indicaciones"
import { Laboratorios } from "../components/Laboratorios"
import { NavBar } from "../components/NavBar"


export const AppRouter = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="home" element={ <Home /> } />
                <Route path="laboratorios" element={ <Laboratorios /> } />
                <Route path="indicaciones" element={ <Indicaciones archivoCSV="../seed/medicamentos.csv" /> } />
                <Route path="/" element={ <Navigate to="/home"/> } />
            </Routes>
        </>
    )
}
