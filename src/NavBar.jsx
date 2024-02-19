import { useState } from "react";
import { useForm } from "./hooks/useForm";
import { MedicamentApp } from "./MedicamentApp";


export const NavBar = () => {

    const { medicamento, onInputChange, onResetForm } = useForm({
        medicamento: '',
    }); 

    const [mostrarMedicamentApp, setMostrarMedicamentApp] = useState(false);
    const [valorBusqueda, setValorBusqueda] = useState('');

    const onFormSubmit = (event) =>{
        event.preventDefault();
        setValorBusqueda(medicamento); // Almacena el valor de búsqueda antes de limpiarlo
        setMostrarMedicamentApp(true); // Cambia el estado para mostrar MedicamentApp
        onResetForm(); // Limpia el formulario después de almacenar el valor de búsqueda
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

                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Laboratorios</a>
                        </li>
                    </ul>
                    
                    <form onSubmit={ onFormSubmit } className="d-flex" role="search" >
                        <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" onChange={ onInputChange }/>
                        <button className="btn btn-outline-success"  type="submit">Buscar</button>
                    </form>
                </div>
            </div>
            </nav>
       
            {mostrarMedicamentApp && (
                <>
                    <h3>Búsqueda: { valorBusqueda }</h3>
                    <MedicamentApp nombreMedicamento={ valorBusqueda } />
                </>
            )} 
            
        </>
    )
}
