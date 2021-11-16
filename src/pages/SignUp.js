import { createUserWithEmailAndPassword } from "@firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Alert from "../components/Alert";
import { auth } from "../firebase";
import { useHistory } from "react-router";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Confirm password doesnt match");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      history.push("/login");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <SignUpContainer>
      <h2>Sign Up</h2>
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
        {!password || password.length < 6 ? (
          <span>Minimum 6 characters</span>
        ) : (
          ""
        )}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Sign up</button>
      </form>
      <Link to="/login">Already have an account? Log in.</Link>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div`
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
    span {
      font-size: 0.8rem;
      text-align: left;
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
    border-bottom: 0.01rem solid #ffffff;
  }
  a:hover {
    color: #a3a3a3;
  }
`;

export default SignUp;
