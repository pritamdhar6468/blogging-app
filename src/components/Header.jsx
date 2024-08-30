import React from "react";
import { useState } from "react";
import { auth } from "../Firebase";
import { CiSearch } from "react-icons/ci";

export default function Header({setSearchQuery}) {
  const [dropDown,setDropDown]=useState(false);

  const toggleDropdown=()=>{
    setDropDown(!dropDown);
  };

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      alert("user logging out");
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
        paddingLeft: "70px",
        paddingRight: "70px",
        justifyContent: "space-between",
        alignItems: "center",
        height: "70px",
        background: "#183446",
        color: "white",
        boxShadow: `0 4px 8px rgba(0, 0, 0, 0.1)`,
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <h1 style={{ fontWeight: "bolder", color: "#C6EBBE" }}>Blogify</h1>
        <div style={{ position: "relative" }}>
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "10px 40px 10px 20px",
              borderRadius: "20px",
              border: "1px solid #C5D9E2",
              fontSize: "16px",
              outline: "none",
              width: "450px",
            }}
          />
         < CiSearch  style={{
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        color: "#817F75",
        fontSize: "25px",
      }}/>
        </div>
      </div>
      <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
        <button
          style={{
            padding: "8px",
            background: "#C6EBBE",
            border: "none",
            borderRadius: "5px",
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={handleLogOut}
        >
          Logout
        </button>
        <div style={{
          width:"40px",
          height:"40px",
          borderRadius:"50%",
          backgroundImage:`url("download.png")`,
          backgroundSize:"cover",
        }}
        onClick={toggleDropdown}>
          
          
        </div>
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
              padding: "10px",
              zIndex: "1001",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0 }}>Welcome, pritam!</p>
          </div>
        )}
      </div>
    </div>
  );
}
