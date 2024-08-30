import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import ArticleCard from "../components/ArticleCard"
import Featured from "../components/Featured";

export default function Allpost({newArticle}) {
  const [updatedArticle, setUpdatedArticle] = useState(null);
  const [searchQuery,setSearchQuery] = useState("");

  const handleUpdate = (article) => {
    setUpdatedArticle(article);
    const savedArticles = JSON.parse(localStorage.getItem('newArticles')) || [];
    const updatedArticles = savedArticles.map((a) => (a.id === article.id ? article : a));
    localStorage.setItem('newArticles', JSON.stringify(updatedArticles));
  };
  return (
    <div>
      <Header setSearchQuery={setSearchQuery} />
      <div style={{ display: "flex" ,marginTop: "70px"}}>
        <SideBar  />
        <div style={{ display: "flex",marginLeft: "20%", width: "80%", padding: "20px" }}>
          <div style={{ width: "75%" }}> <ArticleCard onUpdate={handleUpdate} newArticle={newArticle || updatedArticle} searchQuery={searchQuery} /></div>
          <div style={{ width: "24%" }}><Featured /></div>
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
}
