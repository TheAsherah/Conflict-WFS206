// src/components/ArticleList.js
import React, { useState, useEffect } from 'react';
import ArticleItem from './ArticleItem'; // On va créer ce composant plus tard

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  // Utiliser useEffect pour charger les articles à partir du fichier JSON
  useEffect(() => {
  // Fonction pour charger les articles
  const fetchArticles = () => {
    fetch('/data/articles.json') // Charge les articles depuis le fichier JSON
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`); // Gérer les erreurs HTTP
        }
        return response.json(); // Convertit la réponse en JSON
      })
      .then((data) => {
        setArticles(data); // Met à jour l'état avec les articles
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des articles:', error); // Affiche les erreurs dans la console
      });
  };

  fetchArticles(); // Appelle la fonction pour charger les articles
}, []);


  return (
    <div>
      <h1>Liste des Articles</h1>
      <ul>
        {articles.map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
