import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import "./ArticleCard.css";

const CreatedBlogs = ({ isAuth, editArticle, deleteArticle }) => {
  const [createdBlogs, setCreatedBlogs] = useState([]);

  useEffect(() => {
    // Fetch the articles from localStorage on component mount
    const savedArticles = JSON.parse(localStorage.getItem("newArticles")) || [];
    setCreatedBlogs(savedArticles);
  }, []);




    // Helper function to calculate reading time
const calculateReadingTime = (content) => {
    const wordsPerMinute = 250; // Average reading speed
    const wordCount = content.split(" ").length; // Counting words in the content
    const readingTime = Math.ceil(wordCount / wordsPerMinute); // Rounding up to nearest minute
    return `${readingTime} min read`;
  };



  const handleDelete = (id) => {
    // Call the parent component's deleteArticle method to remove the article
    deleteArticle(id);

    // Remove the article from local state after deletion
    setCreatedBlogs((prevArticles) =>
      prevArticles.filter((article) => article.id !== id)
    );
  };

  const handleEdit = (id) => {
    // Call the parent component's editArticle method to navigate to the edit page
    editArticle(id);
  };

  if (createdBlogs.length === 0) {
    return <p style={{fontSize:"1.5rem",marginLeft:"20px",paddingTop:"10px"}}>No blogs have been created yet...</p>;
  }

  return (
    <div>
      <h2 style={{ margin: "20px", fontSize: "x-large" }}>Your Created Blogs</h2>
      <div className="card-container">
        {createdBlogs.map((article) => (
          <div key={article.id} className="card">
            <img src={article.image} alt={article.title} className="card-image" />
            <div className="card-content">
              <Link to={`/article/${article.id}`} style={{ textDecoration: "none", color: "black" }}>
                <h2 className="card-title">{article.title}</h2>
              </Link>
              <p className="card-category">{article.category}</p>
              <div className="card-author">
                <img src={article.authorPic} alt={article.author} className="author-pic" />
                <p>{article.author}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="card-date">{article.published_date}</p>
                <p className="card-reading-time">{calculateReadingTime(article.content)}</p>
              </div>
              <div className="card-tags">
                {article.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              {isAuth && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button onClick={() => handleEdit(article.id)} className="edit-button">
                    <CiEdit style={{ fontSize: "20px", display: "flex", alignItems: "center" }} />
                  </button>
                  <button onClick={() => handleDelete(article.id)} className="delete-button">
                    <MdOutlineDelete style={{ fontSize: "20px", display: "flex", alignItems: "center" }} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatedBlogs;
