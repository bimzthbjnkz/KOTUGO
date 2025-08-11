import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewDriver from '../components/ReviewDriver';
import SummaryCard from '../components/SummaryCard';
import NextButton from '../components/NextButton';

const PassanPage: React.FC = () => {
  const [eta, setEta] = useState('5 menit');
  const [seatsAvailable, setSeatsAvailable] = useState(3);
  const navigate = useNavigate(); // Inisialisasi hook
  
  // Data dummy
  const route = 'Kalapa - Dago';
  const role = 'passenger';

  return (
    <div className="space-y-6">
      <SummaryCard role={role} route={route} />
      
      <div className="bg-gray-100 rounded-2xl p-6 shadow-neomorph">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Info Angkot</h3>
        
        <div className="space-y-3">
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
      
      <ReviewDriver />
      
      <NextButton onClick={() => navigate('/end')} />
    </div>
  );
};

export default PassanPage;