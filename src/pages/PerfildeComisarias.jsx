import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function PerfilComisaria() {
  const { id } = useParams();
  const [comisaria, setComisaria] = useState(null);
  const [reportes, setReportes] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ direccion: '', telefono: '' });

  useEffect(() => {
  fetch(`http://localhost:8000/api/comisarias/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log("comisaria:", data);
      setComisaria(data);
    });

  fetch(`http://localhost:8000/api/comisarias/${id}/reportes`)
    .then(res => res.json())
    .then(data => {
      console.log("reportes:", data);
      setReportes(data);
    });

  fetch(`http://localhost:8000/api/comisarias/${id}/actividades`)
    .then(res => res.json())
    .then(data => {
      console.log("actividades:", data);
      setActividades(data);
    });
}, [id]);


  const guardarCambios = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/comisarias/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setComisaria(data);
      setEditando(false);
      alert('✅ Cambios guardados correctamente');
    } catch (err) {
      console.error(err);
      alert('❌ Error al guardar los cambios');
    }
  };

  if (!comisaria) return <p className="p-10">Cargando perfil de la comisaría...</p>;

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">📍 {comisaria.nombre}</h1>

      <div className="mb-6 bg-grey shadow p-6 rounded">
        <p><strong>Comisario a cargo:</strong> {comisaria.comisario}</p>

        {editando ? (
          <>
            <label className="block mb-2">
              <span className="font-semibold">Teléfono:</span>
              <input
                className="w-full border rounded px-3 py-1 mt-1"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              />
            </label>
            <label className="block mb-4">
              <span className="font-semibold">Dirección:</span>
              <input
                className="w-full border rounded px-3 py-1 mt-1"
                value={form.direccion}
                onChange={(e) => setForm({ ...form, direccion: e.target.value })}
              />
            </label>
            <button onClick={guardarCambios} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2">
              Guardar Cambios
            </button>
            <button onClick={() => setEditando(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">
              Cancelar
            </button>
          </>
        ) : (
          <>
            <p><strong>Teléfono:</strong> {comisaria.telefono}</p>
            <p><strong>Dirección:</strong> {comisaria.direccion}</p>
            <button onClick={() => setEditando(true)} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Editar
            </button>
          </>
        )}
      </div>

      <div className="mb-8 bg-white shadow p-6 rounded">
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">🚨 Reportes Recientes</h2>
        {reportes.length === 0 ? (
          <p className="text-gray-600">No hay reportes registrados.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {reportes.map((r, i) => (
              <li key={i}>
                <strong>{r.tipo}</strong> ({r.estado}) – {r.fecha} {r.hora}
                <br />
                <span className="text-sm text-gray-700">{r.descripcion}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white shadow p-6 rounded">
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">🗓️ Actividades Realizadas</h2>
        {actividades.length === 0 ? (
          <p className="text-gray-600">No hay actividades registradas.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {actividades.map((a, i) => (
              <li key={i}>
                <strong>{a.titulo}</strong> – {a.tipo} – {a.fecha}
                <br />
                <span className="text-sm text-gray-700">{a.descripcion}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
