import React, { useState } from "react";
// styles
import styled from "styled-components";
import { motion } from "framer-motion";
import { fadeIn } from "./../animations";
// redux and routes
import { fetchSearch } from "../actions/gamesAction";
import { useDispatch } from "react-redux";
import { FaGamepad } from "react-icons/fa";

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
        {/* <img src={logo} alt="logo" /> */}
        <FaGamepad className="logo" />
        <h1>GameFi</h1>
      </Logo>
      <form className="search">
        <input value={textInput} onChange={inputHandler} type="text" />
        <button onClick={submitSearch}>Search</button>
      </form>
    </StyledNav>
  );
};

// Styling
const StyledNav = styled(motion.nav)`
  padding: 3rem 5rem;
  text-align: center;
  input {
    width: 30%;
    padding: 0.5rem;
    margin-top: 1rem;
    font-size: 1.5rem;
    border: none;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  }
  button {
    font-size: 1.5rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: #ff7676;
    color: white;
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
