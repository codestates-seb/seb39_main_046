import React from "react";
import styled from "styled-components";
import logo from "../../../assets/Reco Store (s).png";

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>
        <img src={logo} alt="logo" />
      </Logo>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.nav`
  width: 100%;
  margin: 0 auto;
  position: fixed;
  top: 0;
  border-bottom: 1px solid #ccc;
  height: 60px;
`;

const Logo = styled.div``;
