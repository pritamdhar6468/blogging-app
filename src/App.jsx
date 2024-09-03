import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Allpost from "./pages/Allpost";
import ArticleDetails from "./components/ArticleDetails";
import CreateBlog from "./pages/CreateBlog";
import EditArticle from "./components/EditArticle";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
// import Articles from "./pages/Articles";
function App() {
  const [newArticle, setNewArticle] = useState(null);
  // const [isAuth, setIsAuth] = useState(true);

  // useEffect(() => {
  //   const authStatus = localStorage.getItem("isAuth");
  //   console.log(authStatus)
  //   if (authStatus === "true") {
  //     setIsAuth(true);
  //   }
  // }, []);

  useEffect(() => {
    // Retrieve any saved articles from localStorage on load
    const savedArticles = JSON.parse(localStorage.getItem("newArticles")) || [];
    if (savedArticles.length > 0) {
      setNewArticle(savedArticles[0]); // Only set the latest article as the new one
    }
  }, []);

  const handlePublish = (article) => {
    // Save the new article to state
    setNewArticle(article);

    // Save the article to localStorage
    const existingArticles =
      JSON.parse(localStorage.getItem("newArticles")) || [];
    existingArticles.unshift(article); // Add the new article to the start of the array
    localStorage.setItem("newArticles", JSON.stringify(existingArticles));
  };

  const handleUpdate = (updatedArticle) => {
    setNewArticle(updatedArticle);
  };

  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<Allpost newArticle={newArticle} />} />
          <Route
            path="/create-blog"
            element={<CreateBlog onPublish={handlePublish} />}
          />
          {/* <Route path="/articles" element={<Articles  newArticle={newArticle } />}/> */}
          <Route
            path="/article/:id"
            element={<ArticleDetails newArticle={newArticle} />}
          />
          <Route
            path="/edit-article/:id"
            element={<EditArticle onUpdate={handleUpdate} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/signup" element={<Signup />} />{" "}
        </Routes>
       
      
    </Router>
  );
}

export default App;
