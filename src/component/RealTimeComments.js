import React, { useEffect, useState, useCallback, useContext } from "react";
import { CommentsContext } from "../context/CommentsContext";

const RealTimeComments = ({ onNewComment }) => {
  const { comments, addComment } = useContext(CommentsContext); // Access global state and updater
  const [realTimeComments, setRealTimeComments] = useState(comments);

  // Function to add a new comment
  const addNewComment = useCallback(() => {
    const newComment = {
      id: realTimeComments.length + 1,
      articleId: Math.ceil(Math.random() * 2), // Random article ID
      name: `User ${realTimeComments.length + 1}`, // Dynamic user name
      comment: "Ceci est un nouveau commentaire ajouté en temps réel.",
      date: new Date().toISOString(), // ISO formatted date
    };

    setRealTimeComments((prevComments) => [...prevComments, newComment]); // Update local state
    addComment(newComment); // Update global state using context
    if (onNewComment) {
      onNewComment(newComment); // Notify parent component if callback exists
    }
  }, [realTimeComments, addComment, onNewComment]);

  // Effect to simulate real-time comment addition
  useEffect(() => {
    const intervalId = setInterval(() => {
      addNewComment(); // Add a new comment every 5 seconds
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [addNewComment]);

  return (
    <div>
      <h3>Commentaires en Temps Réel</h3>
      <ul>
        {realTimeComments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.name}</strong>: {comment.comment}{" "}
            <em>({new Date(comment.date).toLocaleString()})</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeComments;
