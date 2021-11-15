import { sendPasswordResetEmail } from "@firebase/auth";
import React, { useState } from "react";
import styled from "styled-components";
import Alert from "../components/Alert";
import { auth } from "../firebase";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setEmail("");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  return (
    <PasswordResetContainer>
      <h2>Password Reset</h2>
      {error && <Alert message={error} />}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">
          Send
        </button>
      </form>
    </PasswordResetContainer>
  );
};

const PasswordResetContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;
  form {
    display: flex;
    min-height: 15vh;
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
`;

export default PasswordReset;
