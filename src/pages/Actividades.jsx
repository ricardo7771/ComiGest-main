import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapaComisarias from '../components/MapaComisarias';

import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Actividades = () => {
  const [seccionActiva, setSeccionActiva] = useState('crearActividad');
  const [comisarias, setComisarias] = useState([]);
  const [comisariaSeleccionada, setComisariaSeleccionada] = useState('');
  const [actividad, setActividad] = useState({ titulo: '', descripcion: '', tipo: '', fecha: '' });
  const [actividades, setActividades] = useState([]);
  const [reporte, setReporte] = useState({ tipo: '', fecha: '', hora: '', ubicacion: '', personal: '', descripcion: '' });
  const [reportes, setReportes] = useState([]);
  const [comisaria, setComisaria] = useState({ nombre: '', telefono: '', filiacion: '', folio: '', direccion: '', horario: '' });
  const [usuario, setUsuario] = useState({ nombre: 'Juan Pérez', correo: 'juan.perez@example.com', rol: 'Administrador' });

  useEffect(() => {
    axios.get('http://localhost:8000/api/comisarias')
      .then(res => {
        setComisarias(res.data);
        if (res.data.length > 0) setComisariaSeleccionada(res.data[0]._id);
      })
      .catch(() => alert('Error cargando comisarías'));
  }, []);

  useEffect(() => {
    if (!comisariaSeleccionada) return;

    if (['verActividades', 'estadisticas'].includes(seccionActiva)) {
      axios.get(`http://localhost:8000/api/comisarias/${comisariaSeleccionada}/actividades`)
        .then(res => setActividades(res.data))
        .catch(() => alert('Error cargando actividades'));

      axios.get(`http://localhost:8000/api/comisarias/${comisariaSeleccionada}/reportes`)
        .then(res => setReportes(res.data))
        .catch(() => alert('Error cargando reportes'));
    }
  }, [seccionActiva, comisariaSeleccionada]);

  const handleGuardarActividad = () => {
    if (!actividad.titulo || !actividad.descripcion || !actividad.tipo || !actividad.fecha) {
      alert('Completa todos los campos de la actividad.');
      return;
    }
    axios.post(`http://localhost:8000/api/comisarias/${comisariaSeleccionada}/actividades`, actividad)
      .then(res => {
        setActividades([...actividades, res.data]);
        setActividad({ titulo: '', descripcion: '', tipo: '', fecha: '' });
      })
      .catch(() => alert('Error guardando actividad'));
  };

  const handleGuardarReporte = () => {
    const { tipo, fecha, hora, ubicacion, personal, descripcion } = reporte;
    if (!tipo || !fecha || !hora || !ubicacion || !personal || !descripcion) {
      alert('Completa todos los campos del reporte.');
      return;
    }
    axios.post(`http://localhost:8000/api/comisarias/${comisariaSeleccionada}/reportes`, reporte)
      .then(res => {
        setReportes([...reportes, res.data]);
        setReporte({ tipo: '', fecha: '', hora: '', ubicacion: '', personal: '', descripcion: '' });
      })
      .catch(() => alert('Error guardando reporte'));
  };

  const actividadesPorTipo = actividades.reduce((acc, act) => {
    acc[act.tipo] = (acc[act.tipo] || 0) + 1;
    return acc;
  }, {});

  const reportesPorTipo = reportes.reduce((acc, rep) => {
    acc[rep.tipo] = (acc[rep.tipo] || 0) + 1;
    return acc;
  }, {});

  const dataActividades = {
    labels: Object.keys(actividadesPorTipo),
    datasets: [{
      label: 'Actividades por tipo',
      data: Object.values(actividadesPorTipo),
      backgroundColor: '#3B82F6'
    }]
  };

  const dataReportes = {
    labels: Object.keys(reportesPorTipo),
    datasets: [{
      label: 'Reportes por tipo',
      data: Object.values(reportesPorTipo),
      backgroundColor: ['#EF4444', '#F97316', '#10B981', '#8B5CF6', '#FACC15']
    }]
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <aside className="w-full md:w-64 bg-blue-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Menú Principal</h2>
        <label className="block mb-6">
          <span>Selecciona Comisaría:</span>
          <select className="w-full mt-1 p-2 rounded" value={comisariaSeleccionada} onChange={e => setComisariaSeleccionada(e.target.value)}>
            {comisarias.map(c => (
              <option key={c._id} value={c._id}>{c.nombre}</option>
            ))}
          </select>
        </label>
        <nav className="space-y-4">
          <button onClick={() => setSeccionActiva('crearActividad')} className={`flex items-center w-full px-4 py-2 rounded ${seccionActiva === 'crearActividad' ? 'bg-white text-blue-900 font-semibold' : 'bg-blue-800 hover:bg-blue-700'}`}><span className="mr-2">🗓️</span> Registrar Actividad</button>
          <button onClick={() => setSeccionActiva('verActividades')} className={`flex items-center w-full px-4 py-2 rounded ${seccionActiva === 'verActividades' ? 'bg-white text-blue-900 font-semibold' : 'bg-blue-800 hover:bg-blue-700'}`}><span className="mr-2">📋</span> Ver Actividades</button>
          <button onClick={() => setSeccionActiva('crearReporte')} className={`flex items-center w-full px-4 py-2 rounded ${seccionActiva === 'crearReporte' ? 'bg-white text-blue-900 font-semibold' : 'bg-blue-800 hover:bg-blue-700'}`}><span className="mr-2">📝</span> Crear Reporte</button>
          <button onClick={() => setSeccionActiva('estadisticas')} className={`flex items-center w-full px-4 py-2 rounded ${seccionActiva === 'estadisticas' ? 'bg-white text-blue-900 font-semibold' : 'bg-blue-800 hover:bg-blue-700'}`}><span className="mr-2">📊</span> Estadísticas</button>
          <button onClick={() => setSeccionActiva('editarComisaria')} className={`flex items-center w-full px-4 py-2 rounded ${seccionActiva === 'editarComisaria' ? 'bg-white text-blue-900 font-semibold' : 'bg-blue-800 hover:bg-blue-700'}`}><span className="mr-2">📍</span> Editar Comisaría / Mapa</button>
          <button onClick={() => setSeccionActiva('perfilUsuario')} className={`flex items-center w-full px-4 py-2 rounded ${seccionActiva === 'perfilUsuario' ? 'bg-white text-blue-900 font-semibold' : 'bg-blue-800 hover:bg-blue-700'}`}><span className="mr-2">👤</span> Perfil</button>
        </nav>
      </aside>

      <main className="flex-1 bg-blue-50 p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Gestión de Actividades y Reportes</h1>

        {seccionActiva === 'crearActividad' && (
          <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-blue-900">Nueva Actividad</h2>
            <input type="text" placeholder="Título de la Actividad" value={actividad.titulo} onChange={e => setActividad({ ...actividad, titulo: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2 mb-4" />
            <textarea placeholder="Descripción de la Actividad" value={actividad.descripcion} onChange={e => setActividad({ ...actividad, descripcion: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2 mb-4" rows="3" />
            <input type="text" placeholder="Tipo de Actividad (Patrullaje, Reunión, etc.)" value={actividad.tipo} onChange={e => setActividad({ ...actividad, tipo: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2 mb-4" />
            <input type="date" value={actividad.fecha} onChange={e => setActividad({ ...actividad, fecha: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2 mb-4" />
            <button onClick={handleGuardarActividad} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">Guardar Actividad</button>
          </div>
        )}

        {seccionActiva === 'verActividades' && (
          <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-blue-900">Listado de Actividades y Reportes</h2>
            <h3 className="text-lg font-semibold mb-2">Actividades</h3>
            {actividades.length === 0 ? (
              <p className="text-gray-600">No hay actividades registradas.</p>
            ) : (
              <ul className="list-disc list-inside mb-4">
                {actividades.map((act, index) => (
                  <li key={index}>
                    <strong>{act.titulo}</strong> - {act.tipo} ({act.fecha})
                    <p className="text-sm text-gray-700">{act.descripcion}</p>
                  </li>
                ))}
              </ul>
            )}
            <h3 className="text-lg font-semibold mb-2">Reportes</h3>
            {reportes.length === 0 ? (
              <p className="text-gray-600">No hay reportes registrados.</p>
            ) : (
              <ul className="list-disc list-inside">
                {reportes.map((rep, index) => (
                  <li key={index}>
                    <strong>{rep.tipo}</strong> - {rep.fecha} {rep.hora} ({rep.ubicacion})
                    <p className="text-sm text-gray-700">{rep.descripcion}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {seccionActiva === 'crearReporte' && (
          <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-blue-900">Crear Reporte</h2>
            <input type="text" placeholder="Tipo de Incidente" value={reporte.tipo} onChange={e => setReporte({ ...reporte, tipo: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2 mb-4" />
            <input type="date" value={reporte.fecha} onChange={e => setReporte({ ...reporte, fecha: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2 mb-4" />
            <input type="time" value={reporte.hora} onChange={e => setReporte({ ...reporte, hora: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2 mb-4" />
            <input type="text" placeholder="Ubicación" value={reporte.ubicacion} onChange={e => setReporte({ ...reporte, ubicacion: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2 mb-4" />
            <input type="text" placeholder="Personal Involucrado" value={reporte.personal} onChange={e => setReporte({ ...reporte, personal: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2 mb-4" />
            <textarea placeholder="Descripción de los Hechos" value={reporte.descripcion} onChange={e => setReporte({ ...reporte, descripcion: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2 mb-4" rows="3"></textarea>
            <button onClick={handleGuardarReporte} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">Guardar Reporte</button>
          </div>
        )}

        {seccionActiva === 'estadisticas' && (
          <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-blue-900">Estadísticas</h2>
            <p className="text-gray-600">Aquí se mostrarán gráficos y métricas como:</p>
            <ul className="list-disc list-inside">
              <li>Total de actividades: {actividades.length}</li>
              <li>Total de reportes: {reportes.length}</li>
              <li>Actividades por tipo:</li>
              <ul className="list-disc list-inside ml-6 text-sm text-gray-700">
                {Object.entries(actividadesPorTipo).map(([tipo, cantidad]) => (
                  <li key={tipo}>{tipo}: {cantidad}</li>
                ))}
              </ul>
              <li>Reportes por tipo:</li>
              <ul className="list-disc list-inside ml-6 text-sm text-gray-700">
                {Object.entries(reportesPorTipo).map(([tipo, cantidad]) => (
                  <li key={tipo}>{tipo}: {cantidad}</li>
                ))}
              </ul>
            </ul>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 border rounded shadow">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Actividades por tipo</h3>
                <Bar data={dataActividades} />
              </div>
              <div className="bg-white p-4 border rounded shadow">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Reportes por tipo</h3>
                <Pie data={dataReportes} />
              </div>
            </div>
          </div>
        )}

        {seccionActiva === 'editarComisaria' && (
          <div className="h-full w-full">
            <MapaComisarias />
          </div>
        )}
     {/* Sección de Perfil de Usuario */}
        {seccionActiva === 'perfilUsuario' && (
          <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Perfil de Usuario</h2>
            <p className="text-gray-700 mb-4">Información personal del administrador o usuario activo. Esta pantalla permite consultar datos y facilita la gestión de la sesión.</p>
            <ul className="space-y-2 text-gray-800">
              <li><strong>Nombre completo:</strong> {usuario.nombre}</li>
              <li><strong>Correo institucional:</strong> {usuario.correo}</li>
              <li><strong>Cargo:</strong> {usuario.rol}</li>
              <li><strong>Número telefónico:</strong> {usuario.telefono}</li>
              <li><strong>Fecha de registro:</strong> {usuario.fechaRegistro}</li>
            </ul>
            <div className="mt-6">
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Cerrar sesión</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Actividades;
