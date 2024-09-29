import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/ArticleCard.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CreateBlog = ({ onPublish, isAuth }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [authorPic, setAuthorPic] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();



  // Set the current date when the component mounts
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD
    setPublishedDate(formattedDate);

    // Load stored values from localStorage if available
    const storedValues = JSON.parse(localStorage.getItem("blogFormData"));
    if (storedValues) {
      setTitle(storedValues.title || "");
      setImage(storedValues.image || "");
      setCategory(storedValues.category || "");
      setAuthor(storedValues.author || "");
      setAuthorPic(storedValues.authorPic || "");
      setPublishedDate(storedValues.publishedDate || formattedDate);
      setReadingTime(storedValues.readingTime || "");
      setContent(storedValues.content || "");
      setTags(storedValues.tags || "");
    }
  }, []);
    // Store form data in localStorage whenever it changes
    useEffect(() => {
      localStorage.setItem("blogFormData", JSON.stringify({
        title,
        image,
        category,
        author,
        authorPic,
        publishedDate,
        readingTime,
        content,
        tags,
      }));
    }, [title, image, category, author, authorPic, publishedDate, readingTime, content, tags]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;
      setImage(base64Image); // Set the base64 image in the state
      localStorage.setItem("uploadedImage", base64Image); // Save the image in local storage
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAuthorPicUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64AuthorPic = reader.result;
      setAuthorPic(base64AuthorPic); // Set the base64 author picture in the state
      localStorage.setItem("uploadedAuthorPic", base64AuthorPic); // Save the author picture in local storage
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAuth) {
      const newArticle = {
        id: Date.now(), // Unique ID based on the current timestamp
        title,
        image,
        category,
        author,
        authorPic,
        published_date: publishedDate,
        reading_time: readingTime,
        content,
        tags: tags.split(",").map((tag) => tag.trim()), // Convert tags to an array
      };

      onPublish(newArticle);
      localStorage.removeItem("blogFormData"); // Clear saved data after publishing
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Header isAuth={isAuth} />
      <div className="create-blog">
        <h2>Create a New Blog Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="input-tag"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex-fields">
            <div style={{ display: "flex" }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  style={{ width: "100px", height: "50px", objectFit: "cover" }}
                />
              )}
            </div>
            <select
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Security">Security</option>
              <option value="Startups">Startups</option>
              <option value="Medicine">Medicine</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Startups">AI</option>
              <option value="Medicine">Sports</option>
              <option value="Infrastructure">Politics</option>
            </select>
            <input
              type="text"
              placeholder="Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <div style={{ display: "flex" }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleAuthorPicUpload}
                required
              />
              {authorPic && (
                <img
                  src={authorPic}
                  alt="Author Preview"
                  style={{ width: "100px", height: "50px", objectFit: "cover" }}
                />
              )}
            </div>
            <input
              type="date"
              placeholder="Published Date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              required
            />
            {/* <input
              type="time"
              placeholder="Reading Time"
              value={readingTime}
              onChange={(e) => setReadingTime(e.target.value)}
              required
            /> */}
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            />
          </div>
          <button type="submit">Publish</button>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default CreateBlog;
