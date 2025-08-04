
import React from 'react';
import BaseButton from './BaseButton';

interface RoleSelectProps {
  onSelectRole: (role: 'driver' | 'passenger') => void;
}

const RoleSelect: React.FC<RoleSelectProps> = ({ onSelectRole }) => {
  return (
    <div className="flex flex-col space-y-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Saya adalah:</h2>
      
      <BaseButton 
        onClick={() => onSelectRole('passenger')}
        className="bg-blue-500 text-white hover:bg-blue-600"
      >
        Penumpang
      </BaseButton>
      
      <BaseButton 
        onClick={() => onSelectRole('driver')}
        className="bg-green-500 text-white hover:bg-green-600"
      >
        Supir Angkot
      </BaseButton>
    </div>
  );
};

export default RoleSelect;