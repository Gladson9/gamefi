import React from "react";
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
      history.push("/");
    }
  };
  // get platform icons
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "pc":
        return <FaDesktop title={platform.toUpperCase()} className="icon" />;
      case "playstation":
        return (
          <FaPlaystation title={platform.toUpperCase()} className="icon" />
        );
      case "xbox":
        return <FaXbox title={platform.toUpperCase()} className="icon" />;
      case "ios":
        return <SiIos title={platform.toUpperCase()} className="icon" />;
      case "android":
        return <FaAndroid title={platform.toUpperCase()} className="icon" />;
      case "mac":
        return <FaApple title={platform.toUpperCase()} className="icon" />;
      case "linux":
        return <FaLinux title={platform.toUpperCase()} className="icon" />;
      case "nintendo":
        return (
          <SiNintendoswitch title={platform.toUpperCase()} className="icon" />
        );
      case "atari":
        return <SiAtari title={platform.toUpperCase()} className="icon" />;
      case "sega":
        return <SiSega title={platform.toUpperCase()} className="icon" />;
      case "web":
        return <FaChrome title={platform.toUpperCase()} className="icon" />;
      default:
        return <FaGamepad title={platform.toUpperCase()} className="icon" />;
    }
  };

  // get data from redux store
  const { game, screenshots, isLoading } = useSelector((state) => state.detail);

  return (
    <>
      {!isLoading && (
        <CardShadow onClick={exitDetailHandler} className="shadow">
          <Detail layoutId={pathId}>
            <Stats>
              <div className="rating">
                <motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
                <p>Rating: {game.rating}</p>
                <Stars
                  stars={game.rating}
                  size={25}
                  spacing={2}
                  fill="#ea9c46"
                />
              </div>
              <Info>
                <h3>Platforms</h3>
                <Platforms>
                  {game.parent_platforms.map((data) =>
                    // <img
                    //   key={data.platform.id}
                    //   src={getPlatformImage(data.platform.name)}
                    //   alt={data.platform.name}
                    // />
                    getPlatformIcon(data.platform.slug)
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
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  img {
    width: 100%;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 2rem;
    display: inline;
  }
`;

const Info = styled(motion.div)`
  text-align: center;
`;

const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  .icon {
    margin-left: 3rem;
    font-size: 2.5rem;
  }
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0rem;
`;

export default GameDetail;
