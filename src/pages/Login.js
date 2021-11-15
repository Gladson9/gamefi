import { signInWithEmailAndPassword } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      const userDetails = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userDetails);
      history.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    if (user) {
      history.push("/dashboard");
    }
  }, [user]);

  return (
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
      width: 15rem;
      padding: 0.6rem 1rem;
      background-color: #293145;
      color: #ffffff;

      border: none;
    }

    button {
      width: max-content;
      padding: 0.5rem 1rem;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background-color: #a3a3a3;
    }
  }
  a {
    color: #ffffff;
    margin-top: 0.5rem;
    border-bottom: 0.01rem solid #ffffff;
  }
  a:hover {
    color: #a3a3a3;
  }
`;

export default Login;
