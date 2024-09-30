import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import "./ArticleCard.css";
import Header from "./Header";
import Footer from "./Footer";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { BsSave } from "react-icons/bs";

const ArticleDetails = ({ newArticle, isAuth }) => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");

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
      const savedArticles = JSON.parse(localStorage.getItem("articles")) || [];
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

  const handleDelete = (commentId) => {
    // Filter out the comment that matches the id
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );

    // Update the state with the filtered comments
    setComments(updatedComments);

    // Update the localStorage with the new comments list
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
  };

  const handleEdit = (commentId, text) => {
    setEditingCommentId(commentId); // Set the ID of the comment being edited
    setEditedText(text); // Set the current text of the comment
  };

  const handleSave = (commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, text: editedText }; // Update the text of the comment
      }
      return comment;
    });
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    setEditingCommentId(null); // Exit edit mode
    setEditedText(""); // Clear the edited text input
  };

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
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  paddingBottom: "10px",
                }}
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

              {editingCommentId === comment.id ? (
                <>
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    style={{ width: "100%", fontSize: "1.5rem" }}
                  />
                </>
              ) : (
                <p>{comment.text}</p>
              )}
              <span>{comment.date}</span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  gap: "10px",
                  fontSize: "1.5rem",
                }}
              >
                {editingCommentId === comment.id ? (
                  <button
                    style={{
                      fontSize: "1.4rem",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      background: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSave(comment.id)}
                  >
                    <BsSave style={{ fontSize: "1.7rem" }} />
                  </button>
                ) : (
                  <button
                    style={{
                      fontSize: "1.4rem",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      background: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEdit(comment.id, comment.text)}
                  >
                    <FiEdit2 style={{ fontSize: "1.9rem" }} />
                  </button>
                )}

                <button
                  style={{
                    fontSize: "1.4rem",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    background: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(comment.id)}
                >
                  <RiDeleteBinLine style={{ fontSize: "1.9rem" }} />
                </button>
              </div>
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
