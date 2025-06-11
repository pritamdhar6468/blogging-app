import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { CiSearch } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header({ isAuth, setIsAuth }) {
  const [dropDown, setDropDown] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const [showLogoutModal,setShowLogoutModal] = useState(false)

  const profileRef = useRef(null);
  const dropdownRef = useRef(null);
  const logoutRef = useRef(null);
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

  // const handleCreateBlogClick = () => {
  //   if (!isAuth) {
  //     toast.error("You need to log in to create a blog!", {
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //   } else {
  //     navigate("/create-blog");
  //   }
  // };
  const handleCreateBlogClick = (e) => {
    if (!isAuth) {
      e.preventDefault(); // Prevent navigation
      toast.error("You need to log in to create a blog!", {
        position: "top-center",
        bodyClassName: "toast-body",
      });
    }
  };

  const handleLogOut = async () => {
    // e.preventDefault();

    try {
      await auth.signOut();
      // alert("user logging out");
      localStorage.removeItem("isAuth");
      // setIsAuth(false);
      window.location.href = "/";
      console.log("logged out sucessfully");
    } catch (error) {
      console.log(error.message);
    }
  };



  const openLogoutModal = () => {
    setShowLogoutModal(true); 
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false); 
  };

  const confirmLogout = () => {
    handleLogOut();
    closeLogoutModal();
  };



  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click happened outside both pro div and dropdown
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
        
      ) {
        setDropDown(false);
      }
       if( logoutRef.current&&
         !logoutRef.current.contains(event.target)){
         setShowLogoutModal(false);
         }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef, dropdownRef,logoutRef]);

  return (
    <>
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
        background: "#e9ecef",
        color: "white",
        // boxShadow: `0 4px 8px rgba(0, 0, 0, 0.1)`,
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <h1
          style={{
            fontSize: "3.2rem",
            fontWeight: "bolder",
            color: "#4361ee",
          }}
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
            className="home-link"
            style={{
              padding: "6px",
              fontSize: "1.8rem",

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
          className="blogs-link"
            style={{
              padding: "5px",
              fontSize: "1.8rem",

              // borderRadius: "5px",
              // background: "#f9f9f9",
              // border: "2px solid black",
              cursor: "pointer",
            }}
          >
            Blogs
          </div>
        </Link>

        {/* {
            isAuth?(
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
            ):(
              <Link
              to="/login"
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
            )
          } */}

        {/* {isAuth ? (
            <div
              onClick={handleCreateBlogClick}
              style={{
                padding: "5px",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              Create Blog
            </div>
          ) : (
            <div
              onClick={handleCreateBlogClick}
              style={{
                padding: "5px",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              Create Blog
            </div>
          )} */}
        <Link
          to={isAuth ? "/create-blog" : "#"}
            
          style={{ textDecoration: "none", color: "black" }}
          onClick={handleCreateBlogClick}
        >
          <div className="createblog-link" style={{ padding: "5px", fontSize: "1.8rem" }}>Create Blog</div>
        </Link>

        {isAuth ? (
          <div
            className="profile-hover-circle"
            ref={profileRef}
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
            onClick={toggleDropdown}
          >
            {userDetails.profileImageUrl
              ? ""
              : userDetails.firstName
              ? userDetails.firstName.charAt(0)
              : ""}
          </div>
        ) : (
          <Link to="/login">
            <button
            className="login-hover-button"
              style={{
                padding: "5px",
                fontSize: "1.3rem",
                borderRadius: "5px",
                // background: "#f9f9f9",
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
              ref={dropdownRef} // Assign ref to the dropdown div
              style={{
                position: "absolute",
                top: "60px",
                right: "50px",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                color: "#4361ee",
                borderRadius: "16px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(67, 97, 238, 0.1)",
                padding: "1.5rem",
                zIndex: "1001",
                textAlign: "center",
                opacity: dropDown ? 1 : 0, // Controls visibility
                transform: dropDown ? "translateY(0)" : "translateY(-10px)", // Controls slide effect
                transition: "opacity 0.3s ease, transform 0.3s ease", // Smooth transition
                pointerEvents: dropDown ? "auto" : "none", // Disable clicks when hidden
                width: "260px",
                minWidth: "260px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {userDetails ? (
                <p style={{ 
                  fontSize: "1.5rem", 
                  margin: "0 0 1.5rem 0", 
                  fontWeight: "600",
                  color: "#4361ee",
                  borderBottom: "1px solid rgba(67, 97, 238, 0.2)",
                  paddingBottom: "0.75rem"
                }}>
                  Welcome, {userDetails.firstName}! 👋
                </p>
              ) : (
                <p style={{ 
                  fontSize: "1.5rem", 
                  margin: "0 0 1.5rem 0",
                  color: "#4361ee",
                  borderBottom: "1px solid rgba(67, 97, 238, 0.2)",
                  paddingBottom: "0.75rem"
                }}>Loading...</p>
              )}

              <Link
                to="/profile"
                style={{ display: "flex", textDecoration: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0.875rem 1rem",
                    background: "linear-gradient(135deg, rgba(67, 97, 238, 0.1), rgba(67, 97, 238, 0.05))",
                    color: "#4361ee",
                    marginTop: "0.5rem",
                    border: "1px solid rgba(67, 97, 238, 0.2)",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    width: "100%",
                    fontWeight: "500",
                  }}
                >
                  <CgProfile
                    style={{ fontSize: "1.8rem", marginRight: "0.75rem" }}
                  />
                  <span style={{ fontSize: "1.5rem" }}>Profile</span>
                </div>
              </Link>

              <div style={{ display: "flex", marginTop: "0.75rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0.875rem 1rem",
                    background: "linear-gradient(135deg, #f44336, #d32f2f)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    width: "100%",
                    fontWeight: "500",
                    boxShadow: "0 4px 12px rgba(244, 67, 54, 0.3)",
                  }}
                  onClick={openLogoutModal}
                >
                  <IoLogOutOutline
                    style={{ fontSize: "1.8rem", marginRight: "0.75rem" }}
                  />
                  <span style={{ fontSize: "1.5rem" }}>Logout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
        ref={logoutRef}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: "2rem",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(67, 97, 238, 0.1)",
            borderRadius: "16px",
            zIndex: "1002",
            textAlign: "center",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            minWidth: "320px",
          }}
        >
          <p style={{ 
            fontSize: "1.6rem", 
            marginBottom: "1.5rem", 
            color: "#4361ee", 
            fontWeight: "600",
            lineHeight: "1.4"
          }}>
            Are you sure you want to logout?
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button
              style={{
                padding: "0.75rem 1.5rem",
                background: "linear-gradient(135deg, #f44336, #d32f2f)",
                color: "white",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
                fontSize: "1.3rem",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(244, 67, 54, 0.3)",
              }}
              onClick={confirmLogout}
            >
              Yes, Logout
            </button>
            <button
              style={{
                padding: "0.75rem 1.5rem",
                background: "rgba(156, 163, 175, 0.2)",
                color: "#6b7280",
                border: "1px solid rgba(156, 163, 175, 0.3)",
                borderRadius: "25px",
                cursor: "pointer",
                fontSize: "1.3rem",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
              onClick={closeLogoutModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
    </div>
    <ToastContainer /></>
  );
}
