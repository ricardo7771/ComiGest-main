import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../images/MeridaLogo.png'
import { Button } from '../components/ui/button'

export default function Login() {
  const [metodoAcceso, setMetodoAcceso] = useState('telefono') // por defecto
  const [datoAcceso, setDatoAcceso] = useState('') // teléfono o correo
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metodoAcceso,
          datoAcceso,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.mensaje || 'Credenciales inválidas')
        return
      }

      navigate('/Actividades')
    } catch (err) {
      console.error('Error en login:', err)
      setError('Error al iniciar sesión')
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <img src={Logo} alt="Logo" className="mx-auto mb-6 h-20" />
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Iniciar Sesión</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-left text-gray-600 mb-1">Método de Acceso</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="metodoAcceso"
                  value="telefono"
                  checked={metodoAcceso === 'telefono'}
                  onChange={(e) => setMetodoAcceso(e.target.value)}
                />
                <span className="ml-2">Teléfono</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="metodoAcceso"
                  value="correo"
                  checked={metodoAcceso === 'correo'}
                  onChange={(e) => setMetodoAcceso(e.target.value)}
                />
                <span className="ml-2">Correo</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-left text-gray-600 mb-1">
              {metodoAcceso === 'telefono' ? 'Número Telefónico' : 'Correo Electrónico'}
            </label>
            <input
              type={metodoAcceso === 'telefono' ? 'tel' : 'email'}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={datoAcceso}
              onChange={(e) => setDatoAcceso(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-left text-gray-600 mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-lg rounded-lg"
          >
            Iniciar Sesión
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-blue-600 hover:underline font-semibold">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
