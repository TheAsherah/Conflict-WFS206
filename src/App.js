import React from 'react';
import ArticleList from './component/ArticleList.js';
import RealTimeComments from "./components/RealTimeComments";
import commentsData from "./data/comments.json";

const App = () => {
  const [comments, setComments] = useState(commentsData);

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div>
      <ArticleList />
      <h1>Blog Interactif</h1>
      <RealTimeComments comments={comments} onNewComment={handleNewComment} />
    </div>
  );
};

export default App;
