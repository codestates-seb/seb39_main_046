import React from "react";
import styled from "styled-components";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
const scrollToTopBtn = ({ handleClick }) => {
  return (
    <>
      <ScrollContainer>
        <BsFillArrowUpCircleFill
          size="40"
          color="#1C1C1E"
          onClick={handleClick}
        />
      </ScrollContainer>
    </>
  );
};

export default scrollToTopBtn;
const ScrollContainer = styled.div`
  position: fixed;
  bottom: 50px;
  right: 30px;
  width: 38px;
  height: 38px;
  border-radius: 38px;
  z-index: 1000;
  cursor: pointer;
  background-color: #fff;
`;