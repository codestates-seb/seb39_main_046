import React from "react";
import styled from "styled-components";

const scrollToTopBtn = ({ handleClick }) => {
  return (
    <>
      <ScrollContainer>
        <Btn onClick={handleClick}>UP</Btn>
      </ScrollContainer>
    </>
  );
};

export default scrollToTopBtn;
const ScrollContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 30px;
  z-index: 1000;
`;
const Btn = styled.button`
  width: 50px;
  height: 30px;
  background: #f88408;
  box-shadow: 0px 2px 20px rgba(204, 204, 204, 0.3);
  color: #fff;
  border-radius: 20px;
  border: none;
`;
