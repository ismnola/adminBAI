import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiRefreshCcw } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { updateStatus, updateEvaluation, deleteIdea } from '../components/Consult';
import { useFetchIdeas } from '../hooks/useFetchIdeas';
import { AuthContext } from '../context/AuthContext';
import LoadingPage from '../components/LoadingPage';

function AdminConsult() {
  const { user, authLoading, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const { ideas, setIdeas, fetchData } = useFetchIdeas();
  const [currentPage, setCurrentPage] = useState(1);
  const ideasPerPage = 8; // Nombre d'idées par page

  // Calcul des idées à afficher pour la pagination
  const indexOfLastIdea = currentPage * ideasPerPage;
  const indexOfFirstIdea = indexOfLastIdea - ideasPerPage;
  const currentIdeas = ideas.slice(indexOfFirstIdea, indexOfLastIdea);

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getRowStyle = (statut) => {
    switch (statut) {
      case 'Validé':
        return 'bg-green-100 border-l-4 border-green-500';
      case 'Rejeté':
        return 'bg-red-100 border-l-4 border-red-500';
      case 'Non_lu':
        return 'bg-gray-100 border-l-4 border-gray-400';
      default:
        return 'bg-white';
    }
  };

  const getStatusLabel = (statut) => {
    switch (statut) {
      case 'Validé':
        return 'Validé';
      case 'Rejeté':
        return 'Rejeté';
      case 'Non_lu':
        return 'Non lu';
      default:
        return 'Inconnu';
    }
  };



  const handleStatusChange = (id, statut) => {
    let newStatus = statut === 'Non_lu' ? 'Validé' : statut === 'Validé' ? 'Rejeté' : 'Validé';
    updateStatus(id, newStatus, setIdeas);
  };

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/login');
      }
    }
  }, [user, authLoading, navigate]);
  
  if (authLoading) {
    // Afficher la page de chargement pendant le processus de vérification
    return <LoadingPage />;
  }
  

  return (
    <div className="min-h-screen bg-[conic-gradient(at_bottom_right,_#1d4ed8,_#1e40af,_#111827)] flex flex-col justify-center items-center p-8"> 



      {/* Barre de navigation */}
      <nav className="w-full max-w-4xl bg-white shadow-lg p-4 flex items-center rounded-lg">
      <button onClick={logout} className="px-4 py-1 rounded-lg cursor-pointer text-white bg-red-500 hover:bg-red-600">
    Déconnexion
  </button>
  <div className="flex items-center justify-center flex-grow">
    <h1 className="text-2xl font-bold text-gray-800">Consultation des idées</h1>
  </div>
  <button
    onClick={fetchData}
    className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer mx-4"
    title="Rafraîchir les idées"
  >
    <FiRefreshCcw size={20} className="text-gray-700" />
  </button>
</nav>

      {/* Tableau des idées */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mt-6 overflow-hidden">
        {ideas.length === 0 ? (
          <p className="text-gray-600 text-center">Aucune idée disponible.</p>
        ) : (
          <>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left w-1/2">Idée</th>
                  <th className="px-4 py-2 text-left">Statut</th>
                  <th className="px-4 py-2 text-left">Évaluation</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentIdeas.map((idea) => (
                  <tr key={idea.id_idee} className={`hover:bg-opacity-75 ${getRowStyle(idea.statut)}`}>
                    <td className="px-4 py-2">{new Date(idea.date_idee).toLocaleDateString('fr-FR')}</td>
                    <td className="px-4 py-2 max-w-xs overflow-auto break-words whitespace-normal">{idea.idee}</td>

                    {/* Statut */}
                    <td className="px-4 py-2 w-1/6">
                      <button 
                        onClick={() => handleStatusChange(idea.id_idee, idea.statut)}
                        className={`px-4 py-1 rounded-lg cursor-pointer text-white ${
                          idea.statut === 'Rejeté' ? 'bg-red-500' : idea.statut === 'Validé' ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                      >
                        {getStatusLabel(idea.statut)}
                      </button>
                    </td>

                    {/* Évaluation */}
                    <td className="px-4 py-2 flex gap-1">
                      {[1, 2, 3].map((star) => (
                        <FaStar
                          key={star}
                          size={20}
                          className={`cursor-pointer ${
                            idea.id_note >= star ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                          onClick={() => updateEvaluation(idea.id_idee, star, setIdeas)}
                        />
                      ))}
                    </td>

                    {/* Supprimer */}
                    <td className="px-4 py-2">
                      <button
                        className="text-red-600 hover:text-red-800 font-medium cursor-pointer"
                        onClick={() => deleteIdea(idea.id_idee, setIdeas)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              {Array.from({ length: Math.ceil(ideas.length / ideasPerPage) }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`mx-1 px-3 py-1 rounded-lg cursor-pointer ${
                    currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminConsult;
