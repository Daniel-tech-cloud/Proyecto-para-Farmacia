import { Routes, Route, Navigate } from "react-router-dom"
import { Home } from "../components/Home"
import { Indicaciones } from "../components/Indicaciones"
import { Laboratorios } from "../components/Laboratorios"


export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="home" element={ <Home /> } />
                <Route path="laboratorios" element={ <Laboratorios /> } />
                <Route path="indicaciones" element={ <Indicaciones /> } />
                <Route path="/" element={ <Navigate to="/home"/> } />
            </Routes>
        </>
    )
}
