import { useState, useEffect } from 'react';

export const useFetchIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/idees', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setIdeas(data);
      } else {
        setIdeas([]);
      }
    } catch (error) {
      console.error('Erreur de récupération:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ideas, setIdeas, loading, fetchData };
};
