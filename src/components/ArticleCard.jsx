import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ArticleCard.css";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";


const ArticleCard = ({ newArticle,searchQuery }) => {
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
    fetch("/Blogsdata.json")
      .then((response) => response.json())
      .then((data) => {
        // Combine articles from localStorage with those from the JSON file
        const savedArticles =
          JSON.parse(localStorage.getItem("newArticles")) || [];
        setArticles([...savedArticles, ...data]);
      })
      .catch((error) => console.error("Error fetching data:", error));
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

  const filteredArticles = articles.filter((article)=>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 style={{margin:'20px'}}>Most Popular...</h2>
      <div className="card-container">
        {filteredArticles.slice(0, visibleCount).map((article) => (
          <div key={article.id} className="card">
            <img
              src={article.image}
              alt={article.title}
              className="card-image"
            />
            <div className="card-content">
              <Link to={`/article/${article.id}`} style={{textDecoration:"none",color:"black"}}>
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
             <div style={{display:"flex", justifyContent: "space-between"}}>
              <button
                onClick={() => editArticle(article.id)}
                className="edit-button"
              >
                <CiEdit style={{fontSize:"20px"}}/>
              </button>
              <button
                onClick={() => deleteArticle(article.id)}
                className="delete-button"
              >
                <MdOutlineDelete style={{fontSize:"20px"}}/>
              </button>
              </div>
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
