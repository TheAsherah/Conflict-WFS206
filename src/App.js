import React, { useEffect, useContext } from "react";
import ArticleList from "./components/ArticleList";
import RealTimeComments from "./components/RealTimeComments";
import { CommentsContext } from "./context/CommentsContext"; // Import the context

const App = () => {
  const { comments, addComment } = useContext(CommentsContext); // Use context for comments

  // Utilisation de useEffect pour écouter les changements de la liste des commentaires
  useEffect(() => {
    console.log("La liste des commentaires a changé :", comments);
  }, [comments]); // Ce useEffect se déclenche à chaque fois que 'comments' change.

  return (
    <div>
      <h1>Blog Interactif</h1>
      <ArticleList />
      {/* Le composant RealTimeComments utilise le contexte directement */}
      <RealTimeComments onNewComment={addComment} />
    </div>
  );
};

export default App;
