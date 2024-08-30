import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditArticle = ({ onUpdate }) => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the article data from localStorage or the backend
    const savedArticles = JSON.parse(localStorage.getItem('newArticles')) || [];
    const existingArticle = savedArticles.find(article => article.id === parseInt(id));
    if (existingArticle) {
      setArticle(existingArticle);
    } else {
      fetch('/Blogsdata.json')
        .then(response => response.json())
        .then(data => {
          const selectedArticle = data.find(article => article.id === parseInt(id));
          setArticle(selectedArticle);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Update the article in the state and localStorage
    onUpdate(article);
    navigate('/');
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div className="edit-article-container">
      <h2>Edit Article</h2>
      <form onSubmit={handleUpdate} className="edit-article-form">
        <label>Title</label>
        <input 
          type="text" 
          value={article.title} 
          onChange={(e) => setArticle({ ...article, title: e.target.value })} 
        />

        <label>Content</label>
        <textarea 
          value={article.content} 
          onChange={(e) => setArticle({ ...article, content: e.target.value })}>
        </textarea>

        {/* Additional fields for image, author, etc. */}
        <label>Image URL</label>
        <input 
          type="text" 
          value={article.image} 
          onChange={(e) => setArticle({ ...article, image: e.target.value })} 
        />

        <label>Author</label>
        <input 
          type="text" 
          value={article.author} 
          onChange={(e) => setArticle({ ...article, author: e.target.value })} 
        />

        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
};

export default EditArticle;
