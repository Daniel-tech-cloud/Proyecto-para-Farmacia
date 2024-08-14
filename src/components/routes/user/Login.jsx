import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    pass: password
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token; // Suponiendo que el token se devuelve en data.token
                const fullName = `${data.nombre} ${data.apPaterno}`;
                
                // Almacena el token en el localStorage
                localStorage.setItem('token', token);

                // Almacena el usuario en el contexto
                setUser(fullName); 

                // Guarda el nombre del usuario en el localStorage (opcional)
                localStorage.setItem('user', JSON.stringify(fullName)); 

                // Redirige a la página principal
                navigate("/home");
            } else {
                console.error('Error al iniciar sesión:', response.statusText);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa tu contraseña"
                            className="form-control rounded-md focus:outline-none focus:ring-2 focus:ring-pacific-cyan focus:border-pacific-cyan"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-custom"
                    >
                        Acceder
                    </button>
                    <div className="text-center mt-4">
                        <p className="text-cadet-gray">
                            ¿No tienes una cuenta? <a href="/registro" className="text-pacific-cyan">Regístrate aquí</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
