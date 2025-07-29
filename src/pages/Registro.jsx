import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/MeridaLogo.png';
import { Button } from '../components/ui/button';

export default function Registro() {
  const [step, setStep] = useState(1);
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [metodoAcceso, setMetodoAcceso] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && !nombreCompleto.trim()) return setError('Nombre completo es obligatorio');
    if (step === 3 && !telefono.trim()) return setError('Número telefónico es obligatorio');
    if (step === 4 && password.length < 5) return setError('Contraseña demasiado corta');

    setError('');
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!metodoAcceso) {
      setError('Debe seleccionar un método de acceso');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/usuarios/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreCompleto,
          correo,
          telefono,
          password,
          metodoAcceso,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.mensaje || 'Error al registrar');
        return;
      }

      navigate('/Actividades');
    } catch (error) {
      console.error('Error:', error);
      setError('Ocurrió un error en el registro');
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <img src={Logo} alt="Logo" className="mx-auto mb-6 h-20" />
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Registro de Usuario
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {step === 1 && (
            <div>
              <label className="block text-left text-gray-600 mb-1">Nombre Completo</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                required
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="block text-left text-gray-600 mb-1">Correo Electrónico (opcional)</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <label className="block text-left text-gray-600 mb-1">Número Telefónico</label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>
          )}

          {step === 4 && (
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
          )}

          {step === 5 && (
            <div>
              <label className="block text-left text-gray-600 mb-1">Método de Acceso</label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="metodo"
                    value="telefono"
                    onChange={(e) => setMetodoAcceso(e.target.value)}
                  />
                  <span className="ml-2 text-gray-700">Acceder con Teléfono</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="metodo"
                    value="correo"
                    onChange={(e) => setMetodoAcceso(e.target.value)}
                  />
                  <span className="ml-2 text-gray-700">Acceder con Correo</span>
                </label>
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {step < 5 ? (
            <Button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-lg rounded-lg"
              onClick={handleNext}
            >
              Siguiente
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 text-lg rounded-lg"
            >
              Finalizar Registro
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
