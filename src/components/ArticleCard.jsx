import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ArticleCard.css";
import { MdOutlineDelete } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";

import { CiEdit } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";

const ArticleCard = ({ newArticle, searchQuery, setSearchQuery, isAuth }) => {
  const [articles, setArticles] = useState([]);

  const [visibleCount, setVisibleCount] = useState(6); // Initial number of articles to show
  let navigate = useNavigate();

  // Add new article if provided
  useEffect(() => {
    if (newArticle) {
      setArticles((prevArticles) => [newArticle, ...prevArticles]);
    }
  }, [newArticle]);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch("/Blogdata.json")
      .then((response) => response.json())
      .then((data) => {
        // Combine articles from localStorage with those from the JSON file
        const savedArticles =
          JSON.parse(localStorage.getItem("newArticles")) || [];
        setArticles([...savedArticles, ...data]);
      })
      .catch((error) => console.error("Error fetching data:", error));
      throw new Error("error fetching data")
  }, []);

  const showMoreArticles = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Show 6 more articles on each click
  };

  const truncateContent = (content) => {
    const words = content.split(" ");
    return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : content;
  };

  const deleteArticle = (id) => {
    const updatedArticles = articles.filter((article) => article.id !== id);
    setArticles(updatedArticles);

    // Update localStorage if the deleted article was newly added
    const savedArticles = JSON.parse(localStorage.getItem("newArticles")) || [];
    const updatedSavedArticles = savedArticles.filter(
      (article) => article.id !== id
    );
    localStorage.setItem("newArticles", JSON.stringify(updatedSavedArticles));
  };

  const editArticle = (id) => {
    navigate(`/edit-article/${id}`);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          throw new Error("Sentry pherom Error");
        }}
      >
        Break the world
      </button>
      ;
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
            width: "900px",
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
      {isAuth ? (
        <div style={{ padding: "10px 20px 10px 20px" }}>
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
                <p className="card-reading-time">{article.reading_time}</p>
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
