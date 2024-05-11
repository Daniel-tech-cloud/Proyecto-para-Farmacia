import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Indicaciones, Laboratorios, NavBar, } from "../components";


export const AppRouter = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="home" element={ <Home /> } />
                <Route path="laboratorios" element={ <Laboratorios /> } />
                <Route path="indicaciones" element={ <Indicaciones /> } />
                <Route path="/" element={ <Navigate to="/home"/> } />
            </Routes>
        </>
    )
}
