import React, { useState } from 'react';

export const RegistroUsuario = () => {
    const [rol, setRol] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [motherLastName, setMotherLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        const userData = {
            idRol: parseInt(rol, 10),
            nombre: firstName,
            apPaterno: lastName,
            apMaterno: motherLastName,
            email: email,
            pass: password
        };

        fetch('http://localhost:3001/api/auth/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="container card mt-5 mb-5">
            <div className="card-header">
                <h2 className="card-title font-h1">Registro de Usuario</h2>
                <p className="card-description card-font">Completa los siguientes campos para crear una nueva cuenta.</p>
            </div>
            <div className="card-body card-font">
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="rol" className="font-form form-label">Roles</label>
                    <select id="rol" className="font-ddl form-select" value={rol} onChange={(e) => setRol(e.target.value)}>
                        <option value="">Selecciona rol</option>
                        <option key="1" value="1">Administrador</option>
                        <option key="2" value="2">Usuario</option>
                        <option key="3" value="3">Invitado</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="first-name">Nombre</label>
                    <input id="first-name" type="text" className="form-control" placeholder="Ingresa tu nombre" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="last-name">Apellido Paterno</label>
                    <input id="last-name" type="text" className="form-control" placeholder="Ingresa tu apellido paterno" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="mother-last-name">Apellido Materno</label>
                    <input id="mother-last-name" type="text" className="form-control" placeholder="Ingresa tu apellido materno" required value={motherLastName} onChange={(e) => setMotherLastName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input id="email" type="email" className="form-control" placeholder="Ingresa tu correo electrónico" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input id="password" type="password" className="form-control" placeholder="Ingresa tu contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <div className="card-footer d-flex justify-content-end">
                <button className="btn btn-outline-info btn-font p-1 ms-2l" onClick={handleRegister}>Registrarse</button>
            </div>
        </div>
    );
}
