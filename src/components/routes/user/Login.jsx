
export const Login = () => {
  return (
    <>
        <div className="d-flex align-items-center justify-content-center vh-100 bg-rich-black">
        <div className="w-100 max-w-md p-8 space-y-4 rounded-lg bg-rich-black">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-cadet-gray">Inicio de sesión</h2>
            <p className="text-cadet-gray">Ingresa tu email y contraseña</p>
          </div>
          <form className="space-y-4">
            <div className="form-group">
              <label htmlFor="email" className="mb-1 text-sm font-medium text-cadet-gray">Email</label>
              <input
                id="email"
                type="email"
                placeholder="algo@gmai.com"
                className="form-control rounded-md focus:outline-none focus:ring-2 focus:ring-pacific-cyan focus:border-pacific-cyan"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="mb-1 text-sm font-medium text-cadet-gray">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                className="form-control rounded-md focus:outline-none focus:ring-2 focus:ring-pacific-cyan focus:border-pacific-cyan"
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
    
    </>
    
  )
}

