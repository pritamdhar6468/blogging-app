import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ArticleCard.css';
import Header from './Header';
import Footer from './Footer';

const ArticleDetails = ({ newArticle }) => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    if (newArticle && newArticle.id === parseInt(id)) {
      setArticle(newArticle);
    } else {
      fetch('/Blogsdata.json')
        .then(response => response.json())
        .then(data => {
          const selectedArticle = data.find(article => article.id === parseInt(id));
          setArticle(selectedArticle);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [id, newArticle]);

  useEffect(() => {
    if (!article) {
      const savedArticles = JSON.parse(localStorage.getItem('newArticles')) || [];
      const localArticle = savedArticles.find(article => article.id === parseInt(id));
      if (localArticle) {
        setArticle(localArticle);
      }
    }
  }, [article, id]);

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(`comments-${id}`)) || [];
    setComments(savedComments);
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim() !== '') {
      const newComment = {
        id: comments.length + 1,
        text: commentInput,
        date: new Date().toLocaleDateString(),
      };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setCommentInput('');
      localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <>
    
        <Header/>
    <div className="article-details-container">
      <h1 className="article-details-title">{article.title}</h1>
      <img src={article.image} alt={article.title} className="article-details-image" />
      <div className="article-details-author">
        <img src={article.authorPic} alt={article.author} />
        <p>{article.author}</p>
      </div>
      <p className="article-details-date">{article.published_date}</p>
      <p className="article-details-reading-time">{article.reading_time}</p>
      <p className="article-details-content">{article.content}</p>
      <div className="article-details-tags">
        {article.tags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
    </div>
    <div className="comments-section">
        <h2>Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.text}</p>
              <span>{comment.date}</span>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Add a comment..."
            className="comment-input"
          />
          <button type="submit" className="comment-button">Post Comment</button>
        </form>
      </div>
    
    {/* <Footer/> */}
    </>
  );
};

export default ArticleDetails;
