import React from "react";
import styled from "styled-components";
import logo from "../../Assets/logo.png";

const Header = () => {
  return (
    <HeaderContainer>
      <HMain>
        <HMenu>
          <li>로그인</li>
          <li>마이페이지</li>
          <li>찜꽁바구니</li>
        </HMenu>
        <HTab>
          <li>서비스 소개</li>
          <li>PB상품 랭킹</li>
          <li>
            <img src={logo} alt="logo" />
          </li>
          <li>편의점 취향 찾기</li>
          <li>주변 편의점 찾기</li>
        </HTab>
      </HMain>
    </HeaderContainer>
  );
};

export default Header;
const HeaderContainer = styled.nav`
  width: 100%;
  margin: 0 auto;
  position: fixed;
  top: 0;
  height: 75px;
  box-shadow: 0px 4px 20px #ececec;
`;
const HMain = styled.main`
  max-width: 1280px;
  margin: 0 auto;
`;
const HMenu = styled.ul`
  width: 300px;
  display: flex;
  float: right;
  margin-top: 10px;
  li {
    width: 100%;
    font-size: 12px;
    color: #8e8e93;
    cursor: pointer;
  }
`;

const HTab = styled.ul`
  display: flex;
  width: 100%;
  line-height: 50px;
  text-align: center;
  li {
    width: 20%;
    cursor: pointer;
  }
`;
