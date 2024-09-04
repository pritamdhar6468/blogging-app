import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { CiSearch } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

export default function Header({ isAuth, setIsAuth }) {
  const [dropDown, setDropDown] = useState(false);
  const [userDetails, setUserDetails] = useState("");

  let navigate = useNavigate();

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

  const toggleDropdown = () => {
    setDropDown(!dropDown);
    // navigate('/profile')
  };

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      alert("user logging out");
      localStorage.removeItem("isAuth");
      // setIsAuth(false);
      window.location.href = "/login";
      console.log("logged out sucessfully");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: "1000",
        paddingLeft: "150px",
        paddingRight: "160px",
        justifyContent: "space-between",
        alignItems: "center",
        height: "70px",
        background: "#fafafa",
        color: "white",
        boxShadow: `0 4px 8px rgba(0, 0, 0, 0.1)`,
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <h1
          style={{ fontSize: "3.2rem", fontWeight: "bolder", color: "#183446" }}
        >
          Blogify
        </h1>
      </div>

      <div
        style={{
          // width:"100px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
          cursor: "pointer",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <div
            style={{
              padding: "6px",
              fontSize: "1.5rem",

              // borderRadius: "5px",
              // background: "#f9f9f9",
              // border: "2px solid black",
              cursor: "pointer",
            }}
          >
            Home
          </div>
        </Link>

        <Link to="/articles" style={{ textDecoration: "none", color: "black" }}>
          <div
            style={{
              padding: "5px",
              fontSize: "1.5rem",

              // borderRadius: "5px",
              // background: "#f9f9f9",
              // border: "2px solid black",
              cursor: "pointer",
            }}
          >
            Blogs
          </div>
        </Link>

        <Link
          to="/create-blog"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div
            style={{
              padding: "5px",
              fontSize: "1.5rem",

              // borderRadius: "5px",
              // background: "#f9f9f9",
              // border: "2px solid black",
              cursor: "pointer",
            }}
          >
            Create Blog
          </div>
        </Link>

        {isAuth ? (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundImage: `url("download.png")`,
              backgroundSize: "cover",
            }}
            onClick={toggleDropdown}
          ></div>
        ) : (
          <Link to="/login">
            <button
              style={{
                padding: "5px",
                fontSize: "1.3rem",
                borderRadius: "5px",
                background: "#f9f9f9",
                border: "2px solid black",
                cursor: "pointer",
              }}
            >
              LogIn
            </button>
          </Link>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",

            cursor: "pointer",
          }}
        >
          {dropDown && (
            <div
              style={{
                position: "absolute",
                top: "60px",
                right: "0",
                backgroundColor: "#ffffff",
                color: "#183446",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "30px",
                zIndex: "1001",
                textAlign: "center",
                // gap:"10px"
              }}
            >
              {userDetails ? (
                <p style={{ fontSize: "1.6rem", margin: 0 }}>
                  Welcome, {userDetails.firstName}!
                </p>
              ) : (
                <p style={{ fontSize: "1.6rem" }}>Loading...</p>
              )}

              <Link
                to="/profile"
                style={{ display: "flex", textDecoration: "none" }}
              >
                <button
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "8px",
                    background: "white",
                    color: "black",
                    // width:"100px",
                    marginTop: "5px",

                    border: "none",
                    borderRadius: "5px",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                >
                  <CgProfile
                    style={{ fontSize: "2.5rem", marginRight: "10px" }}
                  />
                  <span style={{ fontSize: "2rem" }}>Profile</span>
                </button>
              </Link>

              <div style={{ display: "flex" }}>
                <button
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "8px",
                    background: "#ed3b2b",
                    color: "white",
                    // width:"100px",
                    marginTop: "5px",
                    marginLeft: "7px",
                    border: "none",
                    borderRadius: "5px",
                    // fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                  onClick={handleLogOut}
                >
                  <IoLogOutOutline
                    style={{ fontSize: "2rem", marginRight: "10px" }}
                  />{" "}
                  <span style={{ fontSize: "1.4rem" }}>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
