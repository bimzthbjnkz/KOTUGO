
import React from 'react';
import ReviewDriver from '../components/ReviewDriver';
import SummaryCard from '../components/SummaryCard';
import FinishButton from '../components/FinishButton';

const DriverPage: React.FC = () => {
  // Data dummy
  const route = 'Kalapa - Dago';
  const role = 'driver';

  return (
    <div className="space-y-6">
      <SummaryCard role={role} route={route} />
      
      <ReviewDriver 
        driverLocation={{ lat: -6.914744, lng: 107.609810 }}
        passengerLocation={{ lat: -6.915744, lng: 107.608810 }}
      />
      
      <div className="bg-gray-100 rounded-2xl p-6 shadow-neomorph">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Penumpang Menunggu</h3>
        <p className="text-gray-600">2 penumpang menunggu di halte berikutnya</p>
      </div>
      
      <FinishButton onClick={() => console.log('Selesai menjemput')} />
    </div>
  );
};

export default DriverPage;