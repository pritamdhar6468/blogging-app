import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/ArticleCard.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CreateBlog = ({ onPublish }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [authorPic, setAuthorPic] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [readingTime, setReadingTime] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newArticle = {
      id: Date.now(), // Unique ID based on the current timestamp
      title,
      image,
      category,
      author,
      authorPic,
      published_date: publishedDate,
      reading_time: readingTime,
      content,
      tags: tags.split(',').map(tag => tag.trim()), // Convert tags to an array
    };

    onPublish(newArticle);
    navigate('/');
  };

  return (
    <>
      <Header/>
      <div className="create-blog">
        <h2>Create a New Blog Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
          </div>
          <div className="flex-fields">
            <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
            <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            <input type="text" placeholder="Author Pic URL" value={authorPic} onChange={(e) => setAuthorPic(e.target.value)} required />
            <input type="text" placeholder="Published Date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} required />
            <input type="text" placeholder="Reading Time" value={readingTime} onChange={(e) => setReadingTime(e.target.value)} required />
            <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} required />
          </div>
          <button type="submit">Publish</button>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default CreateBlog;
