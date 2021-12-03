import { signInWithEmailAndPassword } from "@firebase/auth";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import Alert from "../components/Alert";
import { auth } from "../firebase";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  const { user } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleGuestLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, "guest@gmail.com", "guest123");
      history.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };
  return user ? (
    <Redirect to="/dashboard" />
  ) : (
    <LoginContainer>
      <h2>Log In</h2>
      {error && <Alert message={error} />}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log in</button>
      </form>
      <button onClick={handleGuestLogin} type="button">
        Log in as Guest
      </button>
      <Link to="/signup">Don't have an account? Sign up.</Link>
      <Link to="/password_reset">Forgot your password?</Link>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;

  form {
    display: flex;
    min-height: 25vh;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    input {
      width: 19rem;
      padding: 0.6rem 1rem;
      background-color: #293145;
      color: #ffffff;
      border-radius: 1rem;
      border: none;
    }

    button {
      width: max-content;
      padding: 0.5rem 1.5rem;
      border-radius: 1rem;
      border: none;
      cursor: pointer;
      background-color: #ff5e00;
    }
    button:hover {
      background-color: #ca5c16;
    }
  }
  button {
    width: max-content;
    padding: 0.5rem 1.5rem;
    border-radius: 1rem;
    border: none;
    cursor: pointer;
    background-color: #ff5e00;
  }
  button:hover {
    background-color: #ca5c16;
  }
  a {
    color: #ffffff;
    margin-top: 1rem;
    border-bottom: 0.01rem solid #ffffff;
  }
  a:hover {
    color: #a3a3a3;
  }
`;

export default Login;
