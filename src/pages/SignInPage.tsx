import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BaseButton from '../components/BaseButton';

const SignPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role') as 'driver' | 'passenger';
  
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simpan data atau lakukan validasi
    navigate(role === 'driver' ? '/driver' : '/passenger');
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {role === 'driver' ? 'Masuk sebagai Supir' : 'Masuk sebagai Penumpang'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Nama Lengkap</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Nomor Telepon</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <BaseButton 
          type="submit" 
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          Masuk
        </BaseButton>
      </form>
    </div>
  );
};

export default SignPage;