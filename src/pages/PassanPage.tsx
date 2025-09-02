import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SummaryCard from '../components/SummaryCard';
import NextButton from '../components/NextButton';
import AngkotMap from '../components/AngkotMap';
import DropdownSelect from '../components/DropdownSelect'; // Ganti import

const PassanPage: React.FC = () => {
  const [eta, setEta] = useState('5 menit');
  const [seatsAvailable, setSeatsAvailable] = useState(3);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string>('Kalapa - Dago');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Daftar rute yang tersedia
  const routeOptions = [
    'Kalapa - Dago',
    'Dago - Kalapa',
    'Cicaheum - Ledeng',
    'Ledeng - Cicaheum',
    'Stasiun - Cibiru',
    'Cibiru - Stasiun'
  ];
  
  // Ambil plat nomor dari state navigasi atau localStorage
  const plateNumber = location.state?.plateNumber || localStorage.getItem('angkotPlateNumber') || '-';

  // Dapatkan dan pantau lokasi pengguna secara real-time
  useEffect(() => {
    let watchId: number;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting initial location:", error);
          setUserLocation([-6.914744, 107.609810]);
        }
      );

      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error watching position:", error);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className="space-y-6">
      <SummaryCard 
        role="passenger" 
        route={selectedRoute} 
        plateNumber={plateNumber} 
      />
      
      {/* Ganti RouteSelector dengan DropdownSelect */}
      <div className="bg-white rounded-2xl p-4 shadow-neomorph">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Pilih Rute</h3>
        <DropdownSelect
          options={routeOptions}
          selectedOption={selectedRoute}
          onSelect={setSelectedRoute}
          placeholder="Pilih rute angkot"
        />
      </div>
      
      <div className="bg-gray-100 rounded-2xl p-6 shadow-neomorph">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Info Angkot</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Plat Nomor:</span>
            <span className="font-medium">{plateNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Rute:</span>
            <span className="font-medium">{selectedRoute}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estimasi Kedatangan:</span>
            <span className="font-medium">{eta}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Kursi Tersedia:</span>
            <span className="font-medium">{seatsAvailable}</span>
          </div>
        </div>
      </div>
      
      {userLocation && (
        <AngkotMap 
          driverPosition={[-6.9147, 107.6098]} 
          passengerPosition={userLocation} 
        />
      )}
      
      <NextButton onClick={() => navigate('/end')} />
    </div>
  );
};

export default PassanPage;