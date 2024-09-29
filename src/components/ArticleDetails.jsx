import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import "./ArticleCard.css";
import Header from "./Header";
import Footer from "./Footer";

const ArticleDetails = ({ newArticle, isAuth }) => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    if (newArticle && newArticle.id === parseInt(id)) {
      setArticle(newArticle);
    } else {
      fetch("/Blogsdata.json")
        .then((response) => response.json())
        .then((data) => {
          const selectedArticle = data.find(
            (article) => article.id === parseInt(id)
          );
          setArticle(selectedArticle);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [id, newArticle]);

  useEffect(() => {
    if (!article) {
      const savedArticles =
        JSON.parse(localStorage.getItem("articles")) || [];
      const localArticle = savedArticles.find(
        (article) => article.id === parseInt(id)
      );
      if (localArticle) {
        setArticle(localArticle);
      }
    }
  }, [article, id]);

  useEffect(() => {
    const savedComments =
      JSON.parse(localStorage.getItem(`comments-${id}`)) || [];
    setComments(savedComments);
  }, [id]);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim() !== "") {
      const newComment = {
        id: comments.length + 1,
        text: commentInput,
        date: new Date().toLocaleDateString(),
      };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setCommentInput("");
      localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header isAuth={isAuth} />
      <div className="article-details-container">
        <h1 className="article-details-title">{article.title}</h1>
        <img
          src={article.image}
          alt={article.title}
          className="article-details-image"
        />
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
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px",paddingBottom:"10px" , }}
              >
                <div
                  // ref={profileRef}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundImage: userDetails.profileImageUrl
                      ? `url(${userDetails.profileImageUrl})`
                      : "none",
                    backgroundColor: "#183446", // Fallback color if no profile image
                    backgroundSize: "cover",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.6rem",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {userDetails.profileImageUrl
                    ? ""
                    : userDetails.firstName
                    ? userDetails.firstName.charAt(0)
                    : ""}
                </div>{" "}
                <p>
                  {userDetails.firstName} {userDetails.lastName}
                </p>
              </div>
              <p>{comment.text}</p>
              <span>{comment.date}</span>
            </div>
          ))
        ) : (
          <p style={{ fontSize: "1rem" }}>
            No comments yet. Be the first to comment!
          </p>
        )}

        {isAuth ? (
          <>
            <h2>Leave a comment</h2>
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add a comment..."
                className="comment-input"
              />
              <button type="submit" className="comment-button">
                Post Comment
              </button>
            </form>
          </>
        ) : (
          <>
            <h2>You need to log in to make a comment</h2>
           
          </>
        )}
      </div>

      {/* <Footer/> */}
    </>
  );
};

export default ArticleDetails;
