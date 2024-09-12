import React, { useState } from "react";
import "./Login.css";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";

const Signup = ({setIsAuth}) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
        });
      }
      if (user) {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/");
      }
      // alert("User registered successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
    <div className="signup-form-container" style={{ position: "relative" }}>
    <div >
    {loading && (
        <div style={{
          position:"fixed",
          top:0,
          left:0,
          width:"100%",
          height:"100%",
          backgroundColor:"rgba(0, 0, 0, 0.5)",
          zIndex:"1000"
        }}>

        </div>
      )}
     
      <h1 style={{fontSize:"2.9rem"}}>Sign Up</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div>
            <label htmlFor="">First Name:</label>
            <input
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="">last Name:</label>
            <input
              type="text"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
            />
          </div>

          <div>
            {" "}
            <label htmlFor="">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ position: "relative" }}>
            <label htmlFor="">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="signup-visibility-btn"
            >
              {showPassword ? (
                <MdOutlineVisibility />
              ) : (
                <MdOutlineVisibilityOff />  //condition for visibility-icon 
              )}{" "}
              
            </button>
          </div>

          <button className="submit-btn" type="submit">Submit</button>
        </form>
        <div>
          <p>
            Already have an account <span><Link to='/login'>Log In</Link></span>
          </p>
        </div>
      </div>
    </div>
    {
      loading &&(
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "black",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          borderRadius: "10px",
          zIndex: "1002",
          textAlign: "center",
        }}>
          <div><SyncLoader size={8} color={"#ffffff"} /></div>
        </div>
      )
    }
    </>
  );
};

export default Signup;
