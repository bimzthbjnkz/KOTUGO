import React from 'react';
import RoleSelect from '../components/RoleSelect';
import { useNavigate } from 'react-router-dom';

const FirstPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectRole = (role: 'driver' | 'passenger') => {
    navigate(`/signin?role=${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mb-10">
        <div className="w-32 h-32 bg-blue-500 rounded-2xl shadow-neomorph-lg mx-auto mb-4"></div>
        <h1 className="text-3xl font-bold text-center text-gray-800">KOTUGO</h1>
      </div>
      
      <RoleSelect onSelectRole={handleSelectRole} />
    </div>
  );
};

export default FirstPage;