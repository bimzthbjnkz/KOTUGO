import React, { useState } from 'react';
import BaseButton from './BaseButton';

interface RouteSelectProps {
  onRouteSelect: (route: string) => void;
}

const RouteSelect: React.FC<RouteSelectProps> = ({ onRouteSelect }) => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  
  const routes = [
    'Kalapa - Dago',
    'Caheum - Ledeng',
    'Ledeng - Cimahi'
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Pilih Rute Angkot</h2>
      
      <div className="space-y-4 mb-8">
        {routes.map((route) => (
          <div 
            key={route}
            onClick={() => setSelectedRoute(route)}
            className={`p-4 rounded-xl cursor-pointer transition-all
              ${selectedRoute === route 
                ? 'bg-blue-100 border-2 border-blue-400 shadow-inner' 
                : 'bg-gray-100 hover:bg-gray-200 shadow-neomorph'}`}
          >
            <p className="font-medium text-gray-800">{route}</p>
          </div>
        ))}
      </div>
      
      <BaseButton 
        onClick={() => selectedRoute && onRouteSelect(selectedRoute)}
        disabled={!selectedRoute}
        className={`w-full ${selectedRoute ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}
      >
        Konfirmasi Rute
      </BaseButton>
    </div>
  );
};

export default RouteSelect;