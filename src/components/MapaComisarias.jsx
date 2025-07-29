import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const icons = {
  normal: new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
    iconSize: [32, 32],
  }),
  pendiente: new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    iconSize: [32, 32],
  }),
  urgente: new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconSize: [32, 32],
  }),
};

export default function MapaComisarias() {
  const [comisarias, setComisarias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Carga comisarías desde backend API
    fetch('http://localhost:8000/api/comisarias')
      .then(res => res.json())
      .then(async data => {
        // Si la API ya trae estado actualizado, no hace falta hacer esto
        // Pero si no, se puede hacer para cada comisaria una llamada para obtener reportes y actualizar estado
        const enriched = await Promise.all(
          data.map(async (c) => {
            try {
              const res = await fetch(`http://localhost:8000/api/reportes/comisaria/${c._id}`);
              if (!res.ok) throw new Error('Error de API');
              const reportes = await res.json();
              // Asumiendo que reportes vienen ordenados, tomo el primero para estado más reciente
              const estadoMasReciente = reportes[0]?.estado || 'normal';
              return { ...c, estado: estadoMasReciente };
            } catch (err) {
              // Si falla la API, se usa "normal" por defecto
              return { ...c, estado: 'normal' };
            }
          })
        );
        setComisarias(enriched);
      })
      .catch(err => {
        console.error("Error cargando comisarías:", err);
      });
  }, []);

  const centroMapa = comisarias.length > 0
    ? [comisarias[0].lat, comisarias[0].lng]
    : [20.967370, -89.592586];

  return (
    <div className="h-screen w-full">
      <MapContainer center={centroMapa} zoom={13} className="h-full w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {comisarias.map((c) => (
          <Marker
            key={c.id}
            position={[c.lat, c.lng]}
            icon={icons[c.estado] || icons.normal}
            eventHandlers={{
              dblclick: () => navigate(`/comisaria/${c._id}`)
            }}
          >
            <Tooltip direction="top" offset={[0, -20]} permanent>
              <span className="font-semibold">{c.nombre}</span>
            </Tooltip>
            <Popup>
              <strong>{c.nombre}</strong><br />
              Tel: {c.telefono || 'No disponible'}<br />
              Comisario: {c.comisario || 'No disponible'}<br />
              <button
                className="mt-2 text-blue-600 underline"
                onClick={() => navigate(`/comisaria/${c._id}`)}
              >
                Ver Perfil
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
