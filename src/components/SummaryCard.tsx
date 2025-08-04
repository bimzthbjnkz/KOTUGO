import React from 'react';

interface SummaryCardProps {
  role: 'driver' | 'passenger';
  route: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ role, route }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-neomorph w-full max-w-md mx-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Perjalanan</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className="font-medium">
            {role === 'driver' ? 'Supir Angkot' : 'Penumpang'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Rute:</span>
          <span className="font-medium">{route}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Waktu:</span>
          <span className="font-medium">-</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;