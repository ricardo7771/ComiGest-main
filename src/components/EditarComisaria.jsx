import { useState } from 'react'

export default function EditarComisaria() {
  const [comisaria, setComisaria] = useState({
    nombre: '',
    telefono: '',
    filiacion: '',
    folio: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setComisaria({ ...comisaria, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Datos guardados:', comisaria)
    alert('Datos de comisaría actualizados correctamente.')
    // Aquí podrías agregar lógica para enviar los datos al backend si es necesario.
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold text-blue-700 text-center">Editar Datos de Comisaría</h2>

      <div>
        <label className="block font-semibold mb-1">Nombre del Comisario</label>
        <input
          type="text"
          name="nombre"
          value={comisaria.nombre}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Teléfono</label>
        <input
          type="tel"
          name="telefono"
          value={comisaria.telefono}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Filiación</label>
        <input
          type="text"
          name="filiacion"
          value={comisaria.filiacion}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Folio</label>
        <input
          type="text"
          name="folio"
          value={comisaria.folio}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
      >
        Guardar
      </button>
    </form>
  )
}
