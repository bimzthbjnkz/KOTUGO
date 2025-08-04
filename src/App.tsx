import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainpage';
import FirstPage from './pages/FirstPage';
import SignPage from './pages/SignInPage';
import PassanPage from './pages/PassanPage';
import DriverPage from './pages/SupirPage';
import EndPage from './pages/EndPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<FirstPage />} />
          <Route path="signin" element={<SignPage />} />
          <Route path="passenger" element={<PassanPage />} />
          <Route path="driver" element={<DriverPage />} />
          <Route path="end" element={<EndPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;