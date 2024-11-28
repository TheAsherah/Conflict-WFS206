import React, { useEffect, useState } from "react";

const RealTimeComments = ({ comments, onNewComment }) => {
  const [realTimeComments, setRealTimeComments] = useState(comments);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newComment = {
        id: realTimeComments.length + 1,
        articleId: Math.ceil(Math.random() * 2), 
        name: `User ${realTimeComments.length + 1}`,
        comment: "Ceci est un nouveau commentaire ajouté en temps réel.",
        date: new Date().toISOString(),
      };

      setRealTimeComments((prevComments) => [...prevComments, newComment]);
      onNewComment(newComment); 
    }, 5000); 

    return () => clearInterval(intervalId); 
  }, [realTimeComments, onNewComment]);

  return (
    <div>
      <h3>Commentaires en Temps Réel</h3>
      <ul>
        {realTimeComments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.name}</strong>: {comment.comment} <em>({comment.date})</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeComments;
