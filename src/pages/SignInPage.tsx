import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BaseButton from '../components/BaseButton';
import DropdownSelect from '../components/DropdownSelect'; // Import komponen dropdown

const SignPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role') as 'driver' | 'passenger';
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    plateNumber: '',
    route: '' // Tambah state untuk rute
  });

  // Daftar rute yang tersedia
  const availableRoutes = [
    'Kalapa - Dago',
    'Caheum - Ledeng',
    'Ledeng - Cimahi',
    'Cicaheum - Cibiru',
    'Stasiun Hall - Leuwi Panjang'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRouteSelect = (route: string) => {
    setFormData(prev => ({ ...prev, route }));
  };

  // Validasi format plat nomor Indonesia
  const validatePlateNumber = (plate: string): boolean => {
    const regex = /^[A-Z]{1,2} \d{1,4} [A-Z]{1,3}$/;
    return regex.test(plate);
  };

  const validateForm = (): boolean => {
    if (role === 'driver') {
      if (!validatePlateNumber(formData.plateNumber)) {
        alert('Format plat nomor tidak valid. Contoh: B 1234 ABC');
        return false;
      }
      if (!formData.route) {
        alert('Silakan pilih rute angkot');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Simpan data ke localStorage jika supir
    if (role === 'driver') {
      localStorage.setItem('angkotPlateNumber', formData.plateNumber);
      localStorage.setItem('angkotRoute', formData.route);
    }

    // Navigasi dengan membawa state
    navigate(role === 'driver' ? '/driver' : '/passenger', {
      state: {
        plateNumber: role === 'driver' ? formData.plateNumber : null,
        route: role === 'driver' ? formData.route : null,
        userData: {
          name: formData.name,
          phone: formData.phone
        }
      }
    });
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
        
        {/* Tambahan field khusus untuk supir */}
        {role === 'driver' && (
          <>
            <div>
              <label className="block text-gray-700 mb-2">Plat Nomor Angkot</label>
              <input
                type="text"
                name="plateNumber"
                value={formData.plateNumber}
                onChange={handleChange}
                required
                placeholder="Contoh: B 1234 ABC"
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Format: Huruf daerah, nomor polisi, dan kode akhir (contoh: B 1234 ABC)
              </p>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Rute Angkot</label>
              <DropdownSelect
                options={availableRoutes}
                selectedOption={formData.route}
                onSelect={handleRouteSelect}
                placeholder="Pilih rute angkot"
              />
            </div>
          </>
        )}
        
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