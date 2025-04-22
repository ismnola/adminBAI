import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 

function LoadingPage() {
  const { user, authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/login');
      }
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[conic-gradient(at_bottom_right,_#1d4ed8,_#1e40af,_#111827)] flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin mx-auto w-16 h-16 border-t-4 border-white border-solid rounded-full"></div>
          <p className="text-white text-lg mt-4">Chargement, veuillez patienter...</p>
        </div>
      </div>
    );
  }

  return null; // Cela empêche l'affichage de la page si l'utilisateur est authentifié
}

export default LoadingPage;
