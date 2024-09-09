import React from "react";
import { useState,useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import ArticleCard from "../components/ArticleCard"
import Featured from "../components/Featured";
import { ToastContainer } from "react-toastify";


export default function Allpost({newArticle}) {
  const [updatedArticle, setUpdatedArticle] = useState(null);
  const [searchQuery,setSearchQuery] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuth");
    console.log(authStatus)
    if (authStatus === "true") {
      setIsAuth(true);
    }
  }, []);

  const handleUpdate = (article) => {
    setUpdatedArticle(article);
    const savedArticles = JSON.parse(localStorage.getItem('newArticles')) || [];
    const updatedArticles = savedArticles.map((a) => (a.id === article.id ? article : a));
    localStorage.setItem('newArticles', JSON.stringify(updatedArticles));
  };
  return (
    <div>
      <Header isAuth={isAuth} setIsAuth={setIsAuth} setSearchQuery={setSearchQuery} />
      <div style={{ display: "flex" ,marginTop: "70px"}}>
        {/* <SideBar  /> */}
        <div style={{ display: "flex", width: "100%", paddingLeft: "150px",paddingRight:"150px" }}>
          <div style={{ width: "75%" }}> <ArticleCard onUpdate={handleUpdate} isAuth={isAuth} newArticle={newArticle || updatedArticle} searchQuery={searchQuery} setSearchQuery={setSearchQuery} /></div>
          <div style={{ width: "24%" }}><Featured /></div>
        </div>
      </div>
      {/* <Footer/> */}
      <ToastContainer/>
    </div>
  );
}
