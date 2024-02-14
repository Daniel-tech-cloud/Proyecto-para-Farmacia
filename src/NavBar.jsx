import { useState } from "react";
import { useForm } from "./hooks/useForm";
import { MedicamentApp } from "./MedicamentApp";


export const NavBar = () => {

    const { data, onInputChange } = useForm({
        medicamento: '',
    }); 

    const [mostrarMedicamentApp, setMostrarMedicamentApp] = useState(false);

    const onFormSubmit = (event) =>{
        event.preventDefault();
        setMostrarMedicamentApp(true); // Cambia el estado para mostrar MedicamentApp
    }

   
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-3">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"> <h1>Farmacia Tlatelolco</h1> </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Laboratorios
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li> className="dropdown-divider"</li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </li>
                </ul>
                <form onSubmit={ onFormSubmit } className="d-flex" role="search" >
                    <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" onChange={ onInputChange }/>
                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                </form>
                </div>
            </div>
            </nav>

            { mostrarMedicamentApp && <MedicamentApp nombreMedicamento={data} />}
            
        </>
    )
}
