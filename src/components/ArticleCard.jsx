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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {isAuth ? (
          <div style={{ marginLeft: "20px", maxWidth: "20%" }}>
            <Link style={{ textDecoration: "none" }} to="/create-blog">
              <button className="create-hover-button">
                <span>
                  <IoCreateOutline style={{ fontSize: "2.5rem" }} />
                </span>
                <span style={{ fontSize: "2rem" }}>Create Blog</span>
              </button>
            </Link>
          </div>
        ) : null}
        
        <div
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
              width: "650px",
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

      <h2 style={{ margin: "20px", fontSize: "x-large" }}>Most Popular...</h2>
      <div className="card-container">
        {filteredArticles.slice(0, visibleCount).map((article) => (
          <div key={article.id} className="card">
            <img
              src={article.image}
              alt={article.title}
              className="card-image"
            />
            <div className="card-content">
              <Link
                to={`/article/${article.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h2 className="card-title">{article.title}</h2>
              </Link>
              <p className="card-category">{article.category}</p>
              <div className="card-author">
                <img
                  src={article.authorPic}
                  alt={article.author}
                  className="author-pic"
                />
                <p>{article.author}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="card-date">{article.published_date}</p>
                <p className="card-reading-time">
                  {calculateReadingTime(article.content)}
                </p>
              </div>

              {/* <p className="card-text">{truncateContent(article.content)}</p> */}
              {/* <Link to={`/article/${article.id}`} className="read-more-link">
                Read More
              </Link> */}
              <div className="card-tags">
                {article.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              {isAuth ? (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {/* {localStorage.getItem("newArticles") &&
                  JSON.parse(localStorage.getItem("newArticles")).some(
                    (savedArticle) => savedArticle.id === article.id
                  ) ? ( */}
                  <>
                    <button
                      onClick={() => editArticle(article.id)}
                      className="edit-button"
                    >
                      <CiEdit
                        style={{
                          fontSize: "20px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      />
                    </button>
                    <button
                      onClick={() => deleteArticle(article.id)}
                      className="delete-button"
                    >
                      <MdOutlineDelete
                        style={{
                          fontSize: "20px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      />
                    </button>
                  </>
                  {/* ) : null} */}
                </div>
              ) : null}
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
