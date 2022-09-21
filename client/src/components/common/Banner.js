import React from "react";
import styled from "styled-components";

const Banner = (props) => {
  return <BContainer>{props.children}</BContainer>;
};

export default Banner;

const BContainer = styled.section`
  width: 100%;
  height: 260px;
  /* background-color: ${({ theme }) => theme.colors.Gray_010}; */
  padding: 80px;
`;
