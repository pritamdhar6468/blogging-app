import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import Header from "../components/Header";
import { IoSettingsOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { GoHistory } from "react-icons/go";
import { GrFavorite } from "react-icons/gr";




const Profile = ({isAuth}) => {
  const [userDetails, setUserDetails] = useState("");

  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    const storedImage = localStorage.getItem("usersImage");
    if (storedImage) {
      setUserImage(storedImage);
    }
  }, []);

  const handleImageUpload = () => {
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
        // Check if user is logged in
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

  return (
    <>
      <Header isAuth={isAuth} />

      <div className="profile-container">
        <div className="profile-left-section">
          <div className="profile-img">
            <img src=""  />
          </div>
          <h2 style={{fontSize:"2.4rem",marginLeft:"30px"}}>{userDetails.firstName} {userDetails.lastName}</h2>
          <hr />
          <div className="profile-category">
            {}
            <div className="profile-category-active">Home</div>
            <div className="profile-category-active">About</div>
            
          </div>
          <div className="profile-category-content">
            <div className="profile-home"></div>
            <div className="profile-about"></div>
          </div>
        </div>
        <div  className="profile-right-section">
         <div style={{display:"flex",fontSize:"2.5rem",marginTop: '30px',gap:"15px",cursor:"pointer"}}>
         <IoSettingsOutline style={{fontSize:"2.5rem" }} /><h3> Profile Setting</h3></div>
         <div style={{display:"flex",fontSize:"2.5rem",marginTop: '30px',gap:"15px",cursor:"pointer"}}>
         <FiDownload style={{fontSize:"2.5rem" }}/><h3>Downloads</h3></div>
         <div style={{display:"flex",fontSize:"2.5rem",marginTop: '30px',gap:"15px",cursor:"pointer"}}>
         <GoHistory style={{fontSize:"2.5rem" }}/><h3>History</h3></div>
         <div style={{display:"flex",fontSize:"2.5rem",marginTop: '30px',gap:"15px",cursor:"pointer"}}>
         <GrFavorite style={{fontSize:"2.5rem" }}/><h3>Favorites</h3></div>
       
        </div>
        {/* <div className="">
          <div className="profile-image-upload">
            {userImage && <img src={userImage} alt="Uploaded Preview" />}
            <input type="file" onChange={handleImageUpload} />
          </div>
          {userDetails ? (
            <div>
              <h2>
                Name:
                {userDetails.firstName} {userDetails.lastName}
              </h2>
              <p>Email:{userDetails.email}</p>
            </div>
          ) : (
            <p>loading..</p>
          )}
          <div className="profile-buttons">
            <button style={{ background: "blue" }}>follow</button>
            <button style={{ background: "green" }}>message</button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Profile;
