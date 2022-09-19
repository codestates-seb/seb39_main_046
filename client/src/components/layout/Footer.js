import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <FMain>
        <h3>RecoStore</h3>
        <p>최서은 | 이도현 | 구건회 | 장종인 | 신지민</p>
      </FMain>
    </FooterContainer>
  );
};

export default Footer;
const FooterContainer = styled.footer`
  width: 100%;
  height: 150px;
  position: fixed;
  bottom: 0;
  background-color: black;
`;

const FMain = styled.main`
  width: 1280px;
  margin: 0 auto;
  color: #fff;
`;
