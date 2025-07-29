// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Logo from '../images/MeridaLogo.png'

export default function Home() {
  const navigate = useNavigate()
  
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-3xl text-center mx-4">
      <img src={Logo} alt="logo" />
        <h1 className="text-5xl font-extrabold text-blue-700 mb-6">
          ComiGest
        </h1>
        <h2 className="text-xl font-semibold text-gray-600 mb-4">
          Plataforma de Gestión para Comisarías
        </h2>
        <p className="text-gray-700 text-lg mb-8">
          Bienvenido a la plataforma de gestión integral de reportes y brigadas
          de la Subdirección de Atención a Comisarías de Mérida, Yucatán. Consulta el estado de cada comisaría, visualiza reportes activos y colabora en la solución de problemas comunitarios.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => navigate('/Mapa')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-lg shadow-md"
          >
            Ver Mapa de Comisarías
          </Button>
          <Button
            onClick={() => navigate('/Actividades')}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 text-lg rounded-lg"
          >
            Iniciar sesión
          </Button>
        </div>
      </div>
    </div>
  )
}
