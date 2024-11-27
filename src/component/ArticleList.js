// src/components/ArticleList.js
import React, { useState, useEffect } from 'react';
import ItemArticle from './ItemArticle';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc'); // "desc" for descending, "asc" for ascending
  const [comments, setComments] = useState({}); // Object to store comments for each article

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

  // Function to handle comment submission
  const handleCommentSubmit = (articleId, comment) => {
    if (!comment.trim()) return; // Ignore empty comments
    setComments((prevComments) => ({
      ...prevComments,
      [articleId]: [...(prevComments[articleId] || []), comment],
    }));
  };

  return (
    <div>
      <h1>Liste des Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <ItemArticle article={article} />
            <div>
              <h3>Commentaires :</h3>
              <ul>
                {(comments[article.id] || []).map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
              <CommentForm
                articleId={article.id}
                onSubmit={handleCommentSubmit}
              />
            </div>
          </li>
        ))}
      </ul>
      <button onClick={toggleSortOrder}>
        Trier par date ({sortOrder === 'asc' ? 'Croissant' : 'Décroissant'})
      </button>
    </div>
  );
};

// Sub-component for the comment form
const CommentForm = ({ articleId, onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(articleId, comment); // Pass the comment and article ID to the parent component
    setComment(''); // Clear the input field
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
      <input
        type="text"
        placeholder="Ajoutez un commentaire"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <button type="submit" style={{ padding: '5px 10px' }}>
        Envoyer
      </button>
    </form>
  );
};

export default ArticleList;
