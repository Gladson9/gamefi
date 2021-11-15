import React from "react";
import styled from "styled-components";

const Avatar = ({ email }) => {
  return (
    <SyledAvatar>
      <img
        src={`https://avatars.dicebear.com/api/gridy/${email}.svg`}
        alt="avatar"
      />
    </SyledAvatar>
  );
};

const SyledAvatar = styled.div`
  width: 3rem;
  height: 3rem;
`;
export default Avatar;
