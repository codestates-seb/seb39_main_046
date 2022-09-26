import React, { useState } from "react";
import styled from "styled-components";
import { RiHeartAddLine } from "react-icons/ri";
import { RiHeartAddFill } from "react-icons/ri";

const HeartButton = ({ onClick }) => {
  const [toggle, setToggle] = useState(false);
  const clickedToggle = () => {
    setToggle((prev) => !prev);
    console.log(toggle);
  };
  return (
    <>
      <HeartBox>
        {toggle ? (
          <RiHeartAddFill
            className="heart2"
            onClick={(onClick, clickedToggle)}
            toggle={toggle}
          />
        ) : (
          <RiHeartAddLine
            className="heart"
            onClick={(onClick, clickedToggle)}
            toggle={toggle}
          />
        )}
      </HeartBox>
    </>
  );
};

export default HeartButton;

const HeartBox = styled.span`
  width: 30px;

  .heart {
    cursor: pointer;
    font-size: 30px;
    color: ${({ theme }) => theme.colors.Orange_040};
  }
  .heart2 {
    cursor: pointer;
    font-size: 30px;
    color: ${({ theme }) => theme.colors.Orange_040};
  }
`;
