// src/components/RouteSelector.tsx
import React from 'react';

interface RouteSelectorProps {
  selectedRoute: string;
  onRouteSelect: (route: string) => void;
}

const RouteSelect: React.FC<RouteSelectorProps> = ({ selectedRoute, onRouteSelect }) => {
  // Daftar rute angkot yang tersedia
  const availableRoutes = [
    'Kalapa - Dago',
    // 'Caheum - Ledeng',  // Dikomen dulu sesuai permintaan
    // 'Ledeng - Cimahi'   // Dikomen dulu sesuai permintaan
  ];

  return (
    <div className="bg-gray-100 rounded-2xl p-6 shadow-neomorph">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Pilih Rute Angkot</h3>
      <div className="space-y-3">
        {availableRoutes.map((route) => (
          <div 
            key={route}
            onClick={() => onRouteSelect(route)}
            className={`p-4 rounded-xl cursor-pointer transition-all
              ${selectedRoute === route 
                ? 'bg-blue-100 border-2 border-blue-400 shadow-inner' 
                : 'bg-gray-200 hover:bg-gray-300 shadow-neomorph'}`}
          >
            <p className="font-medium text-gray-800">{route}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteSelect;