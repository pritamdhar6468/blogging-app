import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/ArticleCard.css";
import Header from "../components/Header";
import { MdOutlineDelete } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";

import { CiEdit } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";



const Articles = ({ newArticle,isAuth,setIsAuth }) => {
  const [articles, setArticles] = useState([]);
  const [searchQuery,setSearchQuery] = useState("");


  const [visibleCount, setVisibleCount] = useState(6); // Initial number of articles to show
  let navigate = useNavigate();


  // useEffect(() => {
  //   const authStatus = localStorage.getItem("isAuth");
  //   console.log(authStatus)
  //   if (authStatus === "true") {
  //     setIsAuth(true);
  //   }
  // }, []);

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
    return words.length > 8 ? words.slice(0, 8).join(" ") + "..." : content;
  };

  // const deleteArticle = (id) => {
  //   const updatedArticles = articles.filter((article) => article.id !== id);
  //   setArticles(updatedArticles);

  //   // Update localStorage if the deleted article was newly added
  //   const savedArticles = JSON.parse(localStorage.getItem("newArticles")) || [];
  //   const updatedSavedArticles = savedArticles.filter(
  //     (article) => article.id !== id
  //   );
  //   localStorage.setItem("newArticles", JSON.stringify(updatedSavedArticles));
  // };

  // const editArticle = (id) => {
  //   navigate(`/edit-article/${id}`);
  // };

  const filteredArticles = articles.filter((article)=>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <Header isAuth={isAuth}/>
    
    <div style={{display:"flex",flexDirection:"column", alignItems:"center"}}>
       <div style={{ position: "relative" , marginTop:"90px",display:"flex",justifyContent:"center"}}>
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              position: "relative" ,
              padding: "10px 40px 10px 30px",
              borderRadius: "20px",
              border: "2px solid #C5D9E2",
              fontSize: "16px",
              // outline: "none",
              width: "500px",
            }}
          />
          <CiSearch
            style={{
              position: "absolute",
              top: "50%",
              left: "2%",
              transform: "translateY(-50%)",
              color: "#817F75",
              fontSize: "18px",
            }}
          />
        </div>
       

      <h2 style={{maxWidth:"70%",margin:'20px',fontSize:"3.5rem"}}>All Post...</h2>
      <div className="articles-card-container">
        {filteredArticles.slice(0, visibleCount).map((article) => (
          <div key={article.id} className="articles-card">
            <img
              src={article.image}
              alt={article.title}
              className="articles-card-image"
            />
            <div className="articles-card-content">
              <Link to={`/article/${article.id}`} style={{textDecoration:"none",color:"black"}}>
                <h2 className="articles-card-title">{truncateContent(article.title)}</h2>
              </Link>
              <p className="articles-card-category">{article.category}</p>
              <div className="articles-card-author">
                <img
                  src={article.authorPic}
                  alt={article.author}
                  className="articles-author-pic"
                />
                <p>{article.author}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="articles-card-date">{article.published_date}</p>
                <p className="articles-card-reading-time">{article.reading_time}</p>
              </div>

              {/* <p className="card-text">{truncateContent(article.content)}</p> */}
              {/* <Link to={`/article/${article.id}`} className="read-more-link">
                Read More
              </Link> */}
              <div className="articles-card-tags">
                {article.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
             {/* <div style={{display:"flex", justifyContent: "space-between"}}>
              <button
                onClick={() => editArticle(article.id)}
                className="edit-button"
              >
                <CiEdit style={{fontSize:"20px",display:"flex",alignItems:"center"}}/>
              </button> */}
              {/* <button
                onClick={() => deleteArticle(article.id)}
                className="delete-button"
              >
                <MdOutlineDelete style={{fontSize:"20px",display:"flex",alignItems:"center"}}/>
              </button> */}
              {/* </div> */}
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
    </>
  );
};

export default Articles;
