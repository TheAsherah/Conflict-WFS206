import React, { useEffect, useState, useCallback } from "react";

const RealTimeComments = ({ comments = [], onNewComment }) => {
  const [realTimeComments, setRealTimeComments] = useState(comments);

  // Utilisation de useCallback pour garantir une fonction stable
  const addNewComment = useCallback(() => {
    const newComment = {
      id: realTimeComments.length + 1,
      articleId: Math.ceil(Math.random() * 2), // Id aléatoire pour l'article
      name: `User ${realTimeComments.length + 1}`, // Utilisation correcte de la chaîne interpolée
      comment: "Ceci est un nouveau commentaire ajouté en temps réel.",
      date: new Date().toISOString(), // Date ISO pour plus de clarté
    };

    setRealTimeComments((prevComments) => [...prevComments, newComment]);
    if (onNewComment) {
      onNewComment(newComment); // Notifie le parent uniquement si la fonction existe
    }
  }, [realTimeComments, onNewComment]); // Dépendances nécessaires

  useEffect(() => {
    const intervalId = setInterval(() => {
      addNewComment(); // Ajout automatique toutes les 5 secondes
    }, 5000);

    return () => clearInterval(intervalId); // Nettoyage à la fin
  }, [addNewComment]);

  return (
    <div>
      <h3>Commentaires en Temps Réel</h3>
      <ul>
        {realTimeComments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.name}</strong>: {comment.comment} <em>({new Date(comment.date).toLocaleString()})</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeComments;
