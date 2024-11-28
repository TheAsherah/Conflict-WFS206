import React, { useState, useEffect } from 'react';

const CommentList = ({ comments }) => {
  const [newComments, setNewComments] = useState([]);

  useEffect(() => {
    // Exemple : considérer tous les commentaires comme nouveaux au chargement
    setNewComments(comments.map(comment => comment.id));
    // Nettoyer les "nouveaux" après un délai
    const timer = setTimeout(() => setNewComments([]), 5000);

    return () => clearTimeout(timer);
  }, [comments]);

  // Définir les styles pour les commentaires nouveaux
  const newCommentStyle = {
    backgroundColor: '#d4edda',
    borderLeft: '4px solid #28a745',
    padding: '10px',
    transition: 'background-color 1s ease-in-out',
  };

  return (
    <ul>
      {comments.map(comment => (
        <li
          key={comment.id}
          style={newComments.includes(comment.id) ? newCommentStyle : {}}
        >
          <strong>{comment.name}</strong>: {comment.comment}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
