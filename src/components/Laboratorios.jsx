import { useFetch } from '../hooks/useFetch';

export const Laboratorios = () => {
    const { data } = useFetch('http://localhost:3001/api/laboratorios');
    
    return (
        <>
            <div className="container mt-5">
                <h1 className="font-h1"> <small className="text-body"> Ver laboratorios: </small> </h1> 
                
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3">

                    {/* Generar dinámicamente las tarjetas */}
                    {/* Verificar si data es null antes de mapear*/}
                    {data && data.map((laboratorio, index) => (
                        <div className="col" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Número: {laboratorio.id}</h5>
                                    <p className="card-text">Nombre: {laboratorio.nombre}</p>
                                    <div className="d-flex justify-content-end">
                                        <button className='btn btn-outline-info btn-font'> Más información </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>

        </>
    )
}
