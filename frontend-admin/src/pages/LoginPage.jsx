import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';  // Assurez-vous que c'est bien importé

function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Utilisation de useNavigate
  const [userLogin, setUserLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await login(userLogin, password);
    setIsLoading(false);

    if (result.success) {
      navigate('/');  // Utilisation de navigate pour rediriger
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[conic-gradient(at_bottom_right,_#1d4ed8,_#1e40af,_#111827)] flex flex-col justify-center items-center p-8">
  <div className="bg-white p-6 rounded-3xl shadow-lg w-80">
    <h2 className="text-2xl font-bold mb-4">Connexion</h2>
    {error && <p className="text-red-500">{error}</p>}
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        className="w-full p-2 border border-gray-300 rounded-xl mb-2"
        value={userLogin}
        onChange={(e) => setUserLogin(e.target.value)}
        aria-label="Nom d'utilisateur"
        autoComplete="username"
      />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 border border-gray-300 rounded-xl mb-2"
          aria-label="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 hover:bg-blue-500 rounded-xl cursor-pointer"
        disabled={isLoading}
      >
        {isLoading ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  </div>
</div>

  );
}

export default LoginPage;
