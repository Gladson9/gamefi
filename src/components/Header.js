import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
const Header = () => {
  const dispatch = useDispatch();

  const changeCategory = (cate) => {
    dispatch({ type: "CHANGE_CATEGORY", payload: { category: cate } });
    dispatch({ type: "CLEAR_SEARCHED" });
  };
  const { category } = useSelector((state) => state.category);

  return (
    <StyledHeader>
      <button
        className={category === "popular" ? "current" : ""}
        onClick={() => changeCategory("popular")}
      >
        Popular
      </button>
      <button
        className={category === "upcoming" ? "current" : ""}
        onClick={() => changeCategory("upcoming")}
      >
        Upcoming
      </button>
      <button
        className={category === "new" ? "current" : ""}
        onClick={() => changeCategory("new")}
      >
        New
      </button>
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
    color: #ffad7d;
    border-radius: 0.3rem;
  }

  .current {
    color: #ff5e00;
  }
`;

export default Header;
