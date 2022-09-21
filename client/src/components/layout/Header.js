import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo/logo2-1.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

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
            <img onClick={() => navigate("/")} src={logo} alt="logo" />
          </li>
          <li onClick={() => navigate("/foodtest")}>편의점 취향 찾기</li>
          <li onClick={() => navigate("/findstore")}>주변 편의점 찾기</li>
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
  background-color: #fff;
  z-index: 100;
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
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    color: ${({ theme }) => theme.colors.Gray_040};
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
  img {
    margin-top: -25px;
  }
`;
