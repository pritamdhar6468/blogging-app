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
    
    <div className="login-container" style={{ position: "relative" }}>
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
           Submit
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

export default Login;
