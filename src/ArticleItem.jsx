import React,{useState} from 'react'

function ArticleItem({article}) {
    const [likes, setLikes] = React.useState(article.likes);

    const handleLike = () => {
      setLikes(likes + 1);
    };

    // Fonction pour gérer le clic sur "Lire la suite"
  const toggleArticleExpansion = (articleId) => {
    setExpandedArticles((prevState) => ({
      ...prevState,
      [articleId]: !prevState[articleId], // Inverse l'état actuel (afficher ou masquer)
    }));
  };

    
  return (
    <div>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
        <h4>{article.date}</h4>
        <p>{article.likes}</p>
        <p>Likes : {likes}</p>

        <button onClick={() => toggleArticleExpansion(article.id)}>
              {expandedArticles[article.id] ? 'Lire moins' : 'Lire la suite'}
        </button>

      <button onClick={handleLike}> J'aime</button>
    </div>
  )
}

export default ArticleItem
