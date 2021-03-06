import React, { useState } from "react";
// styles
import styled from "styled-components";
import { motion } from "framer-motion";
import { fadeIn } from "./../animations";
import { FaGamepad, FaSearch } from "react-icons/fa";

// redux and routes
import { fetchSearch } from "../actions/gamesAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { auth } from "../firebase";
import { useHistory } from "react-router";

const Nav = () => {
  const [textInput, setTextInput] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const history = useHistory();
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

  const logout = () => {
    history.push("/");
    signOut(auth);
  };
  return (
    <StyledNav variants={fadeIn} initial="hidden" animate="show">
      <Link className="logo-container" to="/">
        <Logo onClick={clearSearchedData}>
          <FaGamepad className="logo" />
          <h1>GameFi</h1>
        </Logo>
      </Link>
      <form className="search">
        <input
          value={textInput}
          onChange={inputHandler}
          type="text"
          placeholder="Search game..."
        />
        <button onClick={submitSearch}>
          <FaSearch />
        </button>
      </form>
      <div className="nav-links">
        {!user && <Link to="/signup">SIGN UP</Link>}
        {!user && <Link to="/login">LOG IN</Link>}
        {user && <Link to="/dashboard">My Library</Link>}
        {user && <span onClick={logout}>LOGOUT</span>}
      </div>
    </StyledNav>
  );
};

// Styling
const StyledNav = styled(motion.nav)`
  padding: 3rem 2rem;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  a {
    color: #fff;
  }
  a:hover {
    color: #a3a3a3;
  }
  .nav-links {
    flex: 1;
    display: flex;
    justify-content: space-evenly;
  }
  .nav-links > a {
    padding: 0rem 1rem;
  }
  form {
    flex: 5;
  }
  span {
    color: #ff0000;
    cursor: pointer;
  }
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

  .logo-container {
    flex: 1;
  }
  @media screen and (min-width: 319px) {
    flex-direction: column;
    .nav-links {
      margin-top: 1.5rem;
    }
  }

  @media screen and (min-width: 830px) {
    flex-direction: row;
    form {
      flex: 3;
    }
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
  color: #fff;
  .logo {
    margin-right: 1rem;
    font-size: 3rem;
    fill: #ff5e00;
  }
  /* @media screen and (min-width: 319px) {
  } */
`;
export default Nav;
