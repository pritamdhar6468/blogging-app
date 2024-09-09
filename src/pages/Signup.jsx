import React, { useState } from "react";
import "./Login.css";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

const Signup = ({setIsAuth}) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      alert("User registered successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="signup-form-container">
      <div >
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

          <div>
            <label htmlFor="">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">{loading ? <SyncLoader size={8} color={"#ffffff"} /> : "Submit"}</button>
        </form>
        <div>
          <p>
            Already have an account <span><Link to='/login'>Log In</Link></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
