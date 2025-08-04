import React from 'react';
import { Outlet } from 'react-router-dom';

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-neomorph-lg p-6 min-h-[90vh]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;