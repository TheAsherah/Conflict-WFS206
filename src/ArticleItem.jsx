import React,{useState} from 'react'

function ArticleItem({article}) {
    const [likes, setLikes] = React.useState(article.likes);

    const handleLike = () => {
      setLikes(likes + 1);
    };
    
  return (
    <div>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
        <h4>{article.date}</h4>
        <p>{article.likes}</p>
        <p>Likes : {likes}</p>
      <button onClick={handleLike}> J'aime</button>
    </div>
  )
}

export default ArticleItem