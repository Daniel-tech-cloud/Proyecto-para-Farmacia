
export const RegistroUsuario = () => {
    return (
        <div className="container card mt-5 mb-5">
            <div className="card-header">
                <h2 className="card-title font-h1">Registro de Usuario</h2>
                <p className="card-description card-font">Completa los siguientes campos para crear una nueva cuenta.</p>
            </div>
            <div className="card-body card-font">
                <div className="form-group">
                    <label htmlFor="first-name">Nombre</label>
                    <input id="first-name" type="text" className="form-control" placeholder="Ingresa tu nombre" required />
                </div>
                <div className="form-group">
                    <label htmlFor="last-name">Apellido Paterno</label>
                    <input id="last-name" type="text" className="form-control" placeholder="Ingresa tu apellido paterno" required />
                </div>
                <div className="form-group">
                    <label htmlFor="mother-last-name">Apellido Materno</label>
                    <input id="mother-last-name" type="text" className="form-control" placeholder="Ingresa tu apellido materno" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input id="email" type="email" className="form-control" placeholder="Ingresa tu correo electrónico" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input id="password" type="password" className="form-control" placeholder="Ingresa tu contraseña" required />
                </div>
            </div>
            <div className="card-footer d-flex justify-content-end">
                <button className="btn btn-outline-info btn-font p-1 ms-2l">Registrarse</button>
            </div>
        </div>
    )
}

