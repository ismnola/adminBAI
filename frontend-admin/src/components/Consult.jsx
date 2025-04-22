import React from 'react';
import { useFetchIdeas } from '../hooks/useFetchIdeas';
const Consult = () => {
  const { ideas, setIdeas, loading } = useFetchIdeas();

  return (
    <div>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul>
          {ideas.map((idea) => (
            <li key={idea.id_idee}>
              {idea.idee} - {idea.statut}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


// Supprimer une idée
export const deleteIdea = async (id, setIdeas) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette idée ?')) {
      try {
        const response = await fetch(`http://localhost:3000/idees/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.id_idee !== id));
        } else {
          const result = await response.json();
          alert(result.error);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'idée:', error);
      }
    }
  };

// Mettre à jour l'évaluation
export const updateEvaluation = async (id, note, setIdeas) => {
    try {
      const response = await fetch(`http://localhost:3000/idees/${id}/evaluation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note }),
      });
  
      if (response.ok) {
        setIdeas((prevIdeas) =>
          prevIdeas.map((idea) =>
            idea.id_idee === id ? { ...idea, id_note: note } : idea
          )
          );
      } else {
        const result = await response.json();
        alert(result.error);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'évaluation:', error);
    }
  };
// Mettre à jour le statut
export const updateStatus = async (id, statut, setIdeas) => {
  try {
      const numericStatus = statut === 'Validé' ? 2 : 1; // Convertir le statut en nombre
      const response = await fetch(`http://localhost:3000/idees/${id}/statut`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ statut: numericStatus }),
      });

      if (response.ok) {
          setIdeas((prevIdeas) =>
              prevIdeas.map((idea) =>
                  idea.id_idee === id ? { ...idea, statut } : idea
              )
          );
      } else {
          const result = await response.json();
          alert(result.error);
      }
  } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
  }
};

export default Consult;