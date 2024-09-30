import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import Header from "../components/Header";
import { useNavigate,Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { GoHistory } from "react-icons/go";
import { GrFavorite } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import ProfileSetting from "../components/ProfileSetting";

const Profile = ({ isAuth }) => {
  const [userDetails, setUserDetails] = useState("");
  const [userImage, setUserImage] = useState("");
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4); // Initial number of articles to show
  let navigate = useNavigate();
  // Fetch data from the JSON file using useEffect
  useEffect(() => {
    fetch('/Blogsdata.json')  // Assuming the JSON file is in the public folder
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Fetch user's uploaded image from local storage
  useEffect(() => {
    const storedImage = localStorage.getItem("usersImage");
    if (storedImage) {
      setUserImage(storedImage);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setUserImage(imageDataUrl);
        localStorage.setItem("usersImage", imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

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




  return (
    <>
      <Header isAuth={isAuth} />

      <div className="profile-container">
        <div className="profile-left-section">
          <div className="profile-img" style={profileImgStyle}>
            {userImage ? (
              <img
                src={userImage}
                alt="User Profile"
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            ) : userDetails.firstName ? (
              <span style={profileInitialStyle}>
                {userDetails.firstName.charAt(0)}
              </span>
            ) : null}
          </div>
          {/* <ProfileSetting/> */}
          <h2 style={{ fontSize: "2.4rem", marginLeft: "10px" }}>
            {userDetails.firstName} {userDetails.lastName}
          </h2>
          <hr />
          <div className="profile-category">
            <div className="profile-category-active">Your Posts</div>
            {/* <div className="profile-category-active">About</div> */}
          </div>
          <div style={{height:"60%",overflowY:"scroll"}}>
          {articles.slice(0, visibleCount).map((article) => (
          <div key={article.id} className="profile-category-container">
            <img src={article.image} alt={article.title} />
            <div className="profile-details-container">
               <Link
                to={`/article/${article.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h2 className="card-title">{article.title}</h2>
              </Link>
              <p>{article.category}</p>
              <div className="profile-author-pic">
                <img className="home-image" src={article.authorPic} alt={article.author} />
                <p>{article.author}</p>
              </div>
              {/* {isAuth ? (
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
              ) : null} */}
            </div>
          </div>
           ))}
           </div>
        </div>
         
        <div className="profile-right-section">
          <div
            style={{
              display: "flex",
              fontSize: "2.5rem",
              marginTop: "30px",
              gap: "15px",
              cursor: "pointer",
            }}
          >
            <IoSettingsOutline style={{ fontSize: "2.5rem" }} />
            <h3> Profile Setting</h3>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "2.5rem",
              marginTop: "30px",
              gap: "15px",
              cursor: "pointer",
            }}
          >
            <FiDownload style={{ fontSize: "2.5rem" }} />
            <h3>Downloads</h3>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "2.5rem",
              marginTop: "30px",
              gap: "15px",
              cursor: "pointer",
            }}
          >
            <GoHistory style={{ fontSize: "2.5rem" }} />
            <h3>History</h3>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "2.5rem",
              marginTop: "30px",
              gap: "15px",
              cursor: "pointer",
            }}
          >
            <GrFavorite style={{ fontSize: "2.5rem" }} />
            <h3>Favorites</h3>
          </div>
        </div>
      </div>
    </>
  );
};

// Styles for profile image and initials
const profileImgStyle = {
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  backgroundColor: "#183446", // Fallback color if no image
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "4rem",
  color: "white",
  fontWeight: "bold",
};

const profileInitialStyle = {
  fontSize: "6rem",
  fontWeight: "bold",
  color: "white",
};

export default Profile;
