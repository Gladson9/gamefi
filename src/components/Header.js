import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
const Header = () => {
  const dispatch = useDispatch();

  const changeCategory = (cate) => {
    dispatch({ type: "CHANGE_CATEGORY", payload: { category: cate } });
    dispatch({ type: "CLEAR_SEARCHED" });
  };
  return (
    <StyledHeader>
      <button onClick={() => changeCategory("popular")}>Popular</button>
      <button onClick={() => changeCategory("upcoming")}>Upcoming</button>
      <button onClick={() => changeCategory("new")}>New</button>
    </StyledHeader>
  );
};

// Styling
const StyledHeader = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  button {
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    background: transparent;
    font-size: 1.2rem;
    font-weight: bold;
    color: #ff5e00;
    border-radius: 0.3rem;
  }
`;

export default Header;
