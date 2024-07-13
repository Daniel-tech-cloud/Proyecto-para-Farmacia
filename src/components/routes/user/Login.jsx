import { useState } from 'react';

export const Login = () => {

    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, pass })
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                // Guardar token en localStorage o sessionStorage
                // localStorage.setItem('token', data.token); // Ejemplo: Guarda el token en localStorage

                // TODO Implementar context y actualizar el contexto con los datos del usuario en navbar  

                // TODO Redirigir a la página de inicio

              
            } else {
                alert(data.msg); // Muestra el mensaje de error en caso de fallo en la autenticación
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error al intentar iniciar sesión. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-rich-black">
            <div className="w-100 max-w-md p-8 space-y-4 rounded-lg bg-rich-black">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-cadet-gray">Inicio de sesión</h2>
                    <p className="text-cadet-gray">Ingresa tu email y contraseña</p>
                </div>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email" className="mb-1 text-sm font-medium text-cadet-gray">Correo electrónico</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ingresa tu correo electrónico"
                            className="form-control rounded-md focus:outline-none focus:ring-2 focus:ring-pacific-cyan focus:border-pacific-cyan"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="mb-1 text-sm font-medium text-cadet-gray">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            value={pass}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa tu contraseña"
                            className="form-control rounded-md focus:outline-none focus:ring-2 focus:ring-pacific-cyan focus:border-pacific-cyan"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100 px-4 py-2 font-medium text-rich-black bg-pacific-cyan rounded-md hover:bg-dark-pacific-cyan focus:outline-none focus:ring-2 focus:ring-pacific-cyan focus:ring-offset-2"
                    >
                        Acceder
                    </button>
                </form>
            </div>
        </div>
    );
};
