import React from 'react'

function ItemArticle({article}) {
  return (
    <div>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
        <h4>{article.date}</h4>
        <p>{article.likes}</p>
    </div>
  )
}

export default ItemArticle