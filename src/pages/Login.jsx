import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import {auth} from "../Firebase"
import {signInWithEmailAndPassword} from "firebase/auth"

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate =useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in  successfully")
     
      alert("User logged in  successfully");
    } catch (error) {
      console.log(error.message);

    }

    navigate('/')

  };
  return (
    <div className="login-container">
      
      <form onSubmit={handleSubmit} className="login-form">
      <h1>Log In</h1>
        <label htmlFor="">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
       
        <div>
        <label htmlFor="">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>

        <button type="submit">Submit</button>
      </form>
      <div>
        <p className="signup-link">
          Create a account <span><Link to='/signup' >Sign up</Link></span>
        </p>
      </div>
    </div>
  );
};

export default Login;
