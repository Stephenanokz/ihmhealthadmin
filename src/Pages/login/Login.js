import React, { useState, useContext } from "react";
import { loginCall } from "../../context/authContext/AuthApiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    loginCall({ email, password }, dispatch);
  };

  return (
    <div className="login">
      <form className="loginForm">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/ihm-health.appspot.com/o/files%2Flogo.jpg?alt=media&token=9f360487-2f1f-46bd-b2f7-d3160a98b520"
        alt=""
        className="loginLogo"
      />
        <h2 className="title">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="loginInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="loginButton"
          onClick={handleLogin}
          disabled={isFetching}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
