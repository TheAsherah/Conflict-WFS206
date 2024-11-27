// src/components/ArticleList.js
import React, { useState, useEffect } from 'react';
import ItemArticle from './ItemArticle';
// import articles from './articles.json'


// 

// On va créer ce composant plus tard

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
// console.log(articles);

  // Utiliser useEffect pour charger les articles à partir du fichier JSON
  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('/articles.json'); // Assurez-vous que ce fichier existe dans le dossier 'data'
      const data = await response.json();
      setArticles(data);
    };
    fetchArticles();
  }, []); // Le tableau vide [] signifie que ce hook s'exécute une seule fois, au montage du composant.

  return (
    <div>
      <h1>Liste des Articles</h1>
      <ul>
        {articles.map((article) => (
          <ItemArticle key={article.id} article={article} />
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
