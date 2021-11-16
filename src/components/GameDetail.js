import React, { useEffect } from "react";
// styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
import Stars from "react-stars-display";
// redux
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { smallImage } from "./../util";

// platform icons
import {
  FaDesktop,
  FaGamepad,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaChrome,
  FaAndroid,
} from "react-icons/fa";
import { SiIos, SiNintendoswitch, SiAtari, SiSega } from "react-icons/si";

const GameDetail = ({ pathId }) => {
  const history = useHistory();
  // Exit Detail
  const exitDetailHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      document.body.style.overflow = "auto";
      history.goBack();
    }
  };
  // get platform icons
  const getPlatformIcon = (platform, key) => {
    switch (platform) {
      case "pc":
        return (
          <FaDesktop
            key={key}
            title={platform.toUpperCase()}
            className="icon"
          />
        );
      case "playstation":
        return (
          <FaPlaystation
            key={key}
            title={platform.toUpperCase()}
            className="icon"
          />
        );
      case "xbox":
        return (
          <FaXbox key={key} title={platform.toUpperCase()} className="icon" />
        );
      case "ios":
        return (
          <SiIos key={key} title={platform.toUpperCase()} className="icon" />
        );
      case "android":
        return (
          <FaAndroid
            key={key}
            title={platform.toUpperCase()}
            className="icon"
          />
        );
      case "mac":
        return (
          <FaApple key={key} title={platform.toUpperCase()} className="icon" />
        );
      case "linux":
        return (
          <FaLinux key={key} title={platform.toUpperCase()} className="icon" />
        );
      case "nintendo":
        return (
          <SiNintendoswitch
            key={key}
            title={platform.toUpperCase()}
            className="icon"
          />
        );
      case "atari":
        return (
          <SiAtari key={key} title={platform.toUpperCase()} className="icon" />
        );
      case "sega":
        return (
          <SiSega key={key} title={platform.toUpperCase()} className="icon" />
        );
      case "web":
        return (
          <FaChrome key={key} title={platform.toUpperCase()} className="icon" />
        );
      default:
        return (
          <FaGamepad
            key={key}
            title={platform.toUpperCase()}
            className="icon"
          />
        );
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  // get data from redux store
  const { game, screenshots, isLoading } = useSelector((state) => state.detail);

  return (
    <>
      {!isLoading && (
        <CardShadow onClick={exitDetailHandler} className="shadow">
          <Detail layoutId={pathId}>
            <Stats>
              <Rating>
                <motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
                <p>Rating: {game.rating}</p>
                <Stars
                  stars={game.rating}
                  size={25}
                  spacing={2}
                  fill="#ea9c46"
                />
              </Rating>
              <Info>
                <h3>Platforms</h3>
                <Platforms>
                  {game.parent_platforms.map((data) =>
                    getPlatformIcon(data.platform.slug, data.platform.id)
                  )}
                </Platforms>
              </Info>
            </Stats>
            <Media>
              <motion.img
                layoutId={`image ${pathId}`}
                src={smallImage(game.background_image, 1280)}
                alt="game"
              />
            </Media>
            <Description>
              <p>{game.description_raw}</p>
            </Description>
            <div className="gallery">
              {screenshots.map((screenshot) => (
                <img
                  key={screenshot.id}
                  src={smallImage(screenshot.image, 1280)}
                  alt="screenshot"
                />
              ))}
            </div>
          </Detail>
        </CardShadow>
      )}
    </>
  );
};

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.61);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff5e00;
    border-radius: 1rem;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem;
  background: #293145;
  position: absolute;
  left: 10%;
  color: black;
  img {
    width: 100%;
  }
  @media screen and (min-width: 1024px) {
    padding: 2rem 5rem;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  img {
    width: 2rem;
    display: inline;
  }

  @media screen and (min-width: 650px) {
    flex-direction: row;
  }
`;

const Rating = styled(motion.div)`
  text-align: center;

  @media screen and (min-width: 650px) {
    text-align: left;
    h3 {
      font-size: 2rem;
    }
  }
`;

const Info = styled(motion.div)`
  text-align: center;
`;

const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  .icon {
    margin: 1rem;
    font-size: 2.5rem;
    color: #fff;
  }
  @media screen and (min-width: 1024px) {
    flex-wrap: nowrap;
  }
`;

const Media = styled(motion.div)`
  margin-top: 1rem;
  img {
    width: 100%;
  }
`;

const Description = styled(motion.div)`
  margin: 2rem 0rem;
  p {
    font-size: 1rem;
  }

  @media screen and (min-width: 768px) {
    p {
      font-size: 1.3rem;
    }
  }
  @media screen and (min-width: 1024px) {
    p {
      font-size: 1.5rem;
    }
  }
`;

export default GameDetail;
