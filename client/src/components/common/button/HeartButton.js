import React, { useState } from "react";
import styled from "styled-components";
import { RiHeartAddLine } from "react-icons/ri";
import { RiHeartAddFill } from "react-icons/ri";

const HeartButton = ({ heartFlag, onClick }) => {
  // const [toggle, setToggle] = useState(heartFlag);
  // const clickedToggle = () => {
  //   setToggle((heartFlag) => !heartFlag);
  // };
  return (
    <>
      <HeartBox>
        {heartFlag ? (
          <RiHeartAddFill
            className="heart2"
            onClick={onClick}
            heartFlag={heartFlag}
          />
        ) : (
          <RiHeartAddLine
            className="heart"
            onClick={onClick}
            heartFlag={heartFlag}
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
