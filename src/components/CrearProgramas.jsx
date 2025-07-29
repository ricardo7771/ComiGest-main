// src/components/CrearPrograma.jsx
import { useState } from 'react'

export default function CrearPrograma({ onAgregar }) {
  const [nombre, setNombre] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!nombre.trim()) return
    onAgregar({ id: Date.now(), nombre })
    setNombre('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
      <h2 className="text-xl font-bold text-blue-800">Crear Programa</h2>
      <input
        type="text"
        placeholder="Nombre del Programa"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Guardar Programa
      </button>
    </form>
  )
}
