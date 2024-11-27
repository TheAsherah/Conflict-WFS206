import React, { useState, useEffect } from 'react';
import ItemArticle from './ItemArticle';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc'); // "desc" for descending, "asc" for ascending

  const fetchArticles = () => {
    fetch('/data/articles.json') // Load articles from the JSON file
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`); // Handle HTTP errors
        }
        return response.json(); // Convert the response to JSON
      })
      .then((data) => {
        setArticles(data); // Update state with articles
      })
      .catch((error) => {
        console.error('Error loading articles:', error); // Log any errors
      });
  };

  useEffect(() => {
    fetchArticles(); // Call the function to load articles on component mount
  }, []);

  const sortArticles = () => {
    const sorted = [...articles].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setArticles(sorted);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    sortArticles();
  }, [sortOrder]);

  // Handle incrementing the like count for an article
  const handleLike = (articleId) => {
    const updatedArticles = articles.map((article) => {
      if (article.id === articleId) {
        return { ...article, likes: article.likes + 1 }; // Increment likes
      }
      return article;
    });
    setArticles(updatedArticles); // Update the articles state with the new like count
  };

  return (
    <div>
      <h1>Liste des Articles</h1>
      <ul>
        {articles.map((article) => (
          <ItemArticle key={article.id} article={article} onLike={handleLike} />
        ))}
      </ul>
      <button onClick={toggleSortOrder}>
        Trier par date ({sortOrder === 'asc' ? 'Croissant' : 'Décroissant'})
      </button>
    </div>
  );
};

export default ArticleList;
