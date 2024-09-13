import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ArticleCard.css'; 

const Featured = () => {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // Initial number of articles to show

  // Fetch data from the JSON file using useEffect
  useEffect(() => {
    fetch('/Blogsdata.json')  // Assuming the JSON file is in the public folder
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Filter articles related to "Security"
  const securityArticles = articles.filter(article => 
    article.category === "Security" || article.tags.includes("Security")
  );

  return (
    <div>
      <h2 style={{margin:'20px',fontSize:"x-large"}}>Featured Posts</h2>
      <div className="card-container">
        {securityArticles.slice(0, visibleCount).map((article) => (
          <div key={article.id} className="featured-card">
            <img src={article.image} alt={article.title} className="featured-card-image" />
            <div className="card-content">
            <Link to={`/article/${article.id}`} style={{textDecoration:"none",color:"black"}}><h2 className="featured-card-title">{article.title}</h2></Link> 
              <p className="card-category">{article.category}</p>
              <div className="card-author">
                <img src={article.authorPic} alt={article.author} className="author-pic" />
                <p>{article.author}</p>
              </div>
              {/* <p className="card-date">{article.published_date}</p>
              <p className="card-reading-time">{article.reading_time}</p> */}
              {/* <Link to={`/article/${article.id}`} className="read-more-link">
                Read More
              </Link> */}
              <div className="card-tags">
                {article.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
