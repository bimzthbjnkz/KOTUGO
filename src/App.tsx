import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainpage'; // Perhatikan huruf besar
import FirstPage from './pages/FirstPage';
import SignInPage from './pages/SignInPage';
import PassanPage from './pages/PassanPage';
import SupirPage from './pages/SupirPage'; // Gunakan nama file yang konsisten
import EndPage from './pages/EndPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<FirstPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="passenger" element={<PassanPage />} />
          <Route path="driver" element={<SupirPage />} /> {/* Sesuaikan dengan nama komponen */}
          <Route path="end" element={<EndPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;