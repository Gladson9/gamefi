import React from "react";
import styled from "styled-components";

const Alert = ({ message }) => {
  return (
    <AlertBox>
      <p>{message}</p>
    </AlertBox>
  );
};

const AlertBox = styled.div`
  width: 15rem;
  text-align: center;
  background-color: #ff7575;
  margin-top: 1rem;
  border-radius: 0.3rem;
  p {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    border: none;
    color: #ffffff;
  }
`;

export default Alert;
