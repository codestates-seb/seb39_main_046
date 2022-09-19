import React from "react";
import styled from "styled-components";

const Banner = () => {
  return (
    <>
      <BContainer></BContainer>
    </>
  );
};

export default Banner;

const BContainer = styled.section`
  width: 100%;
  height: 260px;
  background-color: ${({ theme }) => theme.colors.Blue_010};
`;
