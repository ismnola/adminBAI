import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoadingPage from '../components/LoadingPage';

function PrivateRoute({ children }) {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) {
    // Si on est en train de charger l'état d'authentification, on peut afficher un loader
    return <LoadingPage />;
  }

  if (!user) {
    // Si l'utilisateur n'est pas authentifié, redirige vers la page de login
    return <Navigate to="/login" />;
  }

  return children; // Si l'utilisateur est authentifié, affiche les enfants (AdminPage ici)
}

export default PrivateRoute;
