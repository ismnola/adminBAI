import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import LoadingPage from './components/LoadingPage'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route protégée avec PrivateRoute */}
          <Route path="/" element={<PrivateRoute><AdminPage /></PrivateRoute>} />

          {/* Route publique pour la page de login */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/loading" element={<LoadingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
