import { useState } from 'react'

export default function AsignarActividad({ programas, onAsignar }) {
  const [actividad, setActividad] = useState({
    programaId: '',
    comisaria: '',
    fecha: '',
    hora: ''
  })

  const handleChange = (e) => {
    setActividad({ ...actividad, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!actividad.programaId || !actividad.comisaria || !actividad.fecha || !actividad.hora) return

    const programaSeleccionado = programas.find(p => p.id === parseInt(actividad.programaId))
    onAsignar({
      ...actividad,
      programaNombre: programaSeleccionado.nombre,
      id: Date.now()
    })
    setActividad({ programaId: '', comisaria: '', fecha: '', hora: '' })
  }

  // Estadísticas de ejemplo
  const totalProgramas = programas.length
  const ejemploActividadesPorPrograma = programas.map(p => ({
    nombre: p.nombre,
    count: Math.floor(Math.random() * 5) // número aleatorio 0-4 para ejemplo
  }))

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
      <h2 className="text-xl font-bold text-blue-800">Asignar Actividad</h2>
      <select
        name="programaId"
        value={actividad.programaId}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">Selecciona un programa</option>
        {programas.map(p => (
          <option key={p.id} value={p.id}>{p.nombre}</option>
        ))}
      </select>
      <input
        type="text"
        name="comisaria"
        placeholder="Nombre de la Comisaría"
        value={actividad.comisaria}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="date"
        name="fecha"
        value={actividad.fecha}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="time"
        name="hora"
        value={actividad.hora}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Guardar Actividad
      </button>

      {/* Estadísticas (ejemplo) */}
      <div className="mt-4 text-sm text-gray-700">
        <p><strong>Total programas disponibles:</strong> {totalProgramas}</p>
        <p className="mt-2 font-semibold">Actividades asignadas por programa (ejemplo):</p>
        <ul className="list-disc list-inside">
          {ejemploActividadesPorPrograma.map(p => (
            <li key={p.nombre}>{p.nombre}: {p.count}</li>
          ))}
        </ul>
      </div>
    </form>
  )
}
