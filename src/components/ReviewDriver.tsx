import React from 'react';

interface ReviewDriverProps {
  driverLocation?: { lat: number; lng: number };
  passengerLocation?: { lat: number; lng: number };
}

const ReviewDriver: React.FC<ReviewDriverProps> = ({ 
  driverLocation, 
  passengerLocation 
}) => {
  return (
    <div className="bg-gray-100 rounded-2xl p-6 shadow-neomorph w-full h-64">
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600 text-center">
          {driverLocation && passengerLocation 
            ? 'Peta monitoring akan ditampilkan di sini'
            : 'Menunggu data lokasi...'}
        </p>
      </div>
    </div>
  );
};

export default ReviewDriver;