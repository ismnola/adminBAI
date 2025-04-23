import { createContext, useState, useEffect, useContext } from 'react';

// Crée un contexte pour l'utilisateur
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setLoading] = useState(true);

  // Vérifier le token au chargement
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
  
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
  
      try {
        const res = await fetch('https://express-bai.vercel.app/auth', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!res.ok) {
          throw new Error('Token invalide ou expiré');
        }
  
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Erreur de vérification:', error);
        setUser(null);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
  
    checkUser();
  }, []);




  const login = async (login, password) => {
    try {
      const res = await fetch('https://express-bai.vercel.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      
      const text = await res.text(); // Obtenez le texte de la réponse
      let data = null;
      try {
        data = JSON.parse(text); // Parser la réponse en JSON
      } catch (e) {
        console.error("Erreur lors du parsing JSON:", e);
      }

      if (res.ok && data) {
        localStorage.setItem('token', data.token); // Sauvegarde le token dans le localStorage
        setUser(data.user); // Met à jour l'état utilisateur
        return { success: true };
      }

      return { success: false, message: data?.error || 'Erreur inconnue' };
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return { success: false, message: 'Erreur de connexion' };
    }
  };


  



  const logout = () => {
    localStorage.removeItem('token'); // Supprimer le token du localStorage
    setUser(null); // Réinitialiser l'utilisateur
  };

  return (
    <AuthContext.Provider value={{ user, authLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
