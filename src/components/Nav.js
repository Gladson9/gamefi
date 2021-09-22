import React, { useState } from "react";
// styles
import styled from "styled-components";
import { motion } from "framer-motion";
import { fadeIn } from "./../animations";
import { FaGamepad, FaSearch } from "react-icons/fa";

// redux and routes
import { fetchSearch } from "../actions/gamesAction";
import { useDispatch } from "react-redux";

const Nav = () => {
  const [textInput, setTextInput] = useState("");
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setTextInput(e.target.value);
  };
  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(fetchSearch(textInput));
    setTextInput("");
  };
  const clearSearchedData = () => {
    dispatch({ type: "CLEAR_SEARCHED" });
  };

  return (
    <StyledNav variants={fadeIn} initial="hidden" animate="show">
      <Logo onClick={clearSearchedData}>
        <FaGamepad className="logo" />
        <h1>GameFi</h1>
      </Logo>
      <form className="search">
        <input
          value={textInput}
          onChange={inputHandler}
          type="text"
          placeholder="Enter Game Name"
        />
        <button onClick={submitSearch}>
          <FaSearch />
        </button>
      </form>
    </StyledNav>
  );
};

// Styling
const StyledNav = styled(motion.nav)`
  padding: 3rem 2rem;
  text-align: center;
  input {
    width: 80%;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    font-size: 1.2rem;
    border: none;
    border-radius: 1.5rem;
  }
  button {
    font-size: 1.2rem;
    border: none;
    padding: 0.5rem 0.7rem;
    margin-left: 1rem;
    margin-top: 1rem;
    border-radius: 50%;
    cursor: pointer;
    background: #ff5e00;
    color: white;
  }

  @media screen and (min-width: 720px) {
    input {
      width: 70%;
    }
  }
  @media screen and (min-width: 1024px) {
    input {
      width: 50%;
    }
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .logo {
    margin-right: 1rem;
    font-size: 3rem;
    fill: #ff5e00;
  }
`;
export default Nav;
