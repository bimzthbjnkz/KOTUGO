import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../components/BaseButton';

const EndPage: React.FC = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    // Simpan rating dan feedback
    navigate('/');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Bagaimana Pengalaman Anda?</h2>
      
      <div className="flex justify-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-3xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          >
            ★
          </button>
        ))}
      </div>
      
      <div>
        <label className="block text-gray-700 mb-2">Masukan (opsional)</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          placeholder="Berikan masukan untuk perjalanan ini..."
        />
      </div>
      
      <BaseButton 
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white hover:bg-blue-600"
      >
        Kirim Ulasan
      </BaseButton>
    </div>
  );
};

export default EndPage;