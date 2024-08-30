import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
const Profile = () => {
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
    <div className="profile-container">
      <div className="profile-image-upload">
        {userImage && <img src={userImage} alt="Uploaded Preview" />}
        <input type="file" onChange={handleImageUpload} />
      </div>
      {userDetails ? (
        <div>
          <h2>Name: 
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
    </div>
  );
};

export default Profile;
