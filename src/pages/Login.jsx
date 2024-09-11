import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { SyncLoader } from "react-spinners";

const Login = ({ setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
      console.log("User logged in  successfully");

      // alert("User logged in  successfully");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
    
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 style={{ fontSize: "2.9rem" }}>Log In</h1>
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

        <button type="submit">
          {loading ? <SyncLoader size={8} color={"#ffffff"} /> : "Submit"}
        </button>
        <div>
          <p className="signup-link">
            Create an account{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
    </>
  );
};

export default Login;
