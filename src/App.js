import React, { useState, useEffect } from 'react';
import ArticleList from './components/ArticleList';
import RealTimeComments from './components/RealTimeComments';
import commentsData from './data/comments.json';

const App = () => {
  const [comments, setComments] = useState(commentsData);

  // Fonction pour ajouter un nouveau commentaire
  const handleNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  // Utilisation de useEffect pour écouter les changements de la liste des commentaires
  useEffect(() => {
    console.log("La liste des commentaires a changé");
  }, [comments]); // Ce useEffect se déclenche à chaque fois que 'comments' change.

  return (
    <div>
      <ArticleList />
      <h1>Blog Interactif</h1>
      {/* Le composant RealTimeComments reçoit la liste des commentaires et la fonction onNewComment */}
      <RealTimeComments comments={comments} onNewComment={handleNewComment} />
    </div>
  );
};

export default App;