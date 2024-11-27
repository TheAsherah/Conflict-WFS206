// src/components/ArticleList.js
import React, { useState, useEffect } from 'react';
import ItemArticle from './ItemArticle';
// import articles from './articles.json'

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc'); // "desc" for descending, "asc" for ascending

  // Function to load articles
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

  // Function to sort articles by date
  const sortArticles = () => {
    const sorted = [...articles].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setArticles(sorted); // Update articles with sorted data
  };

  // Toggle the sorting order between ascending and descending
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Re-sort articles whenever the sort order changes
  useEffect(() => {
    sortArticles();
  }, [sortOrder]);

  return (
    <div>
      <h1>Liste des Articles</h1>
      <ul>
        {articles.map((article) => (
          <ItemArticle key={article.id} article={article} />
        ))}
      </ul>
      <button onClick={toggleSortOrder}>
        Trier par date ({sortOrder === 'asc' ? 'Croissant' : 'Décroissant'})
      </button>
    </div>
  );
};

export default ArticleList;
