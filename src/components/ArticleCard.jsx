import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ArticleCard.css";
import { MdOutlineDelete } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
// import EditArticle from "./EditArticle";
import CreatedBlogs from "./CreatedBlogs";

import { CiEdit } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";

const ArticleCard = ({ newArticle, searchQuery, setSearchQuery, isAuth }) => {
  const [articles, setArticles] = useState([]);

  const [visibleCount, setVisibleCount] = useState(6); // Initial number of articles to show
  let navigate = useNavigate();

  useEffect(() => {
    if (newArticle) {
      setArticles((prevArticles) => {
        const articleIndex = prevArticles.findIndex(
          (a) => a.id === newArticle.id
        );

        // If the article exists, replace it, otherwise add the new article
        if (articleIndex !== -1) {
          const updatedArticles = [...prevArticles];
          updatedArticles[articleIndex] = newArticle;
          return updatedArticles;
        } else {
          return [newArticle, ...prevArticles];
        }
      });
    }
  }, [newArticle]);

  useEffect(() => {
    const storedArticles = localStorage.getItem("articles");
    if (storedArticles) {
      setArticles(JSON.parse(storedArticles));
    } else {
      fetch("/Blogsdata.json")
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("articles", JSON.stringify(data));
          setArticles(data);
        });
    }
  }, []);

  const showMoreArticles = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Show 6 more articles on each click
  };

  // Helper function to calculate reading time
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 250; // Average reading speed
    const wordCount = content.split(" ").length; // Counting words in the content
    const readingTime = Math.ceil(wordCount / wordsPerMinute); // Rounding up to nearest minute
    return `${readingTime} min read`;
  };

  const truncateContent = (content) => {
    const words = content.split(" ");
    return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : content;
  };

  const deleteArticle = (id) => {
    const updatedArticles = articles.filter((article) => article.id !== id);
    setArticles(updatedArticles);
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
  };

  const editArticle = (id) => {
    navigate(`/edit-article/${id}`);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="create-search-section"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {isAuth ? (
          <div className="create-button">
            <Link to="/create-blog" style={{ textDecoration: "none" }}>
              <button className="create-hover-button" aria-label="Create new blog post">
                <span aria-hidden="true">
                  <IoCreateOutline style={{ fontSize: "1.7rem" }} />
                </span>
                <span>Create Blog</span>
              </button>
            </Link>
          </div>
        ) : null}
        
        <div
          className="search-container"
          style={{
            position: "relative",
            margin: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "10px 40px 10px 30px",
              borderRadius: "20px",
              border: "2px solid #C5D9E2",
              fontSize: "16px",
              // outline: "none",
              minWidth: "200px",
            }}
          />
          <CiSearch
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              color: "#817F75",
              fontSize: "18px",
            }}
          />
        </div>
      </div>

      {/* <CreatedBlogs
        isAuth={isAuth}
        editArticle={editArticle}
        deleteArticle={deleteArticle}
      />  */}

      <h2 style={{ margin: "20px", fontSize: "x-large" }}>Your Recent Blogs...</h2>
      <div className="card-container">
        {filteredArticles.slice(0, visibleCount).map((article) => (
          <div key={article.id} className="card">
            {/* Card Header - Author, Date, Tags, Reading Time */}
            <div className="card-header">
              <div className="card-author">
                <img
                  src={article.authorPic}
                  alt={article.author}
                  className="author-pic"
                />
                <p>{article.author}</p>
              </div>
              <div className="card-meta">
                <p className="card-date">{article.published_date}</p>
                <p className="card-reading-time">
                  {calculateReadingTime(article.content)}
                </p>
              </div>
              <div className="card-tags">
                {article.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Image Container with Read More Arrow and Three Dots Menu */}
            <div className="card-image-container">
              <img
                src={article.image}
                alt={article.title}
                className="card-image"
              />
              
              {/* Read More Arrow */}
              <Link to={`/article/${article.id}`} className="read-more-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              {/* Three Dots Menu */}
              {isAuth && (
                <div className="three-dots-menu">
                  <button className="three-dots-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="currentColor"/>
                      <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" fill="currentColor"/>
                      <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" fill="currentColor"/>
                    </svg>
                  </button>
                  <div className="dropdown-menu">
                    <button
                      onClick={() => editArticle(article.id)}
                      className="dropdown-item edit-item"
                    >
                      <CiEdit />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => deleteArticle(article.id)}
                      className="dropdown-item delete-item"
                    >
                      <MdOutlineDelete />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="card-content">
              <Link
                to={`/article/${article.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h2 className="card-title">{article.title}</h2>
              </Link>
              <p className="card-category">{article.category}</p>
              <p className="card-text">{truncateContent(article.content)}</p>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < articles.length && (
        <button className="show-more-button" onClick={showMoreArticles}>
          Show More
        </button>
      )}
    </div>
  );
};

export default ArticleCard;
