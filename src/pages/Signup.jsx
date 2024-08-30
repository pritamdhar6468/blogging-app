import React, { useState } from "react";
import "./Login.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      alert("User registered successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="signup-form-container">
      <div >
      <h1>Sign Up</h1>
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

          <button type="submit">Submit</button>
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
