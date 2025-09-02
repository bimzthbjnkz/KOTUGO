import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix untuk marker icon
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface AngkotMapProps {
  driverPosition: [number, number];
  passengerPosition?: [number, number];
  height?: string;
}

const AngkotMap: React.FC<AngkotMapProps> = ({ 
  driverPosition = [-6.914744, 107.609810], // Default Bandung
  passengerPosition,
  height = '400px'
}) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-neomorph">
      <MapContainer 
        center={driverPosition} 
        zoom={15} 
        style={{ height, width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <Marker position={driverPosition} icon={defaultIcon}>
          <Popup>Posisi Angkot</Popup>
        </Marker>
        
        {passengerPosition && (
          <Marker position={passengerPosition} icon={defaultIcon}>
            <Popup>Posisi Anda</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default AngkotMap;