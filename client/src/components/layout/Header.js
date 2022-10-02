import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo/logo2.svg";
import { useNavigate } from "react-router-dom";
import store from "../../lib/store";

const Header = () => {
    const navigate = useNavigate();
    const { logInfo } = store();

    const logout = () => {
        console.log("로그아웃 버튼 클릭");
        if (window.confirm("정말로 로그아웃 하시겠습니까?")) {
            sessionStorage.removeItem("token");
            window.location.reload();
        }
    };

    const checkLogin = () => {
        if (!logInfo) {
            alert("로그인 먼저 하세요");
            navigate("/login");
        } else {
            navigate("/productbasket");
        }
    };

    const checkLogin2 = () => {
        if (!logInfo) {
            alert("로그인 먼저 하세요");
            navigate("/login");
        } else {
            navigate("/mypage");
        }
    };

    return (
        <HeaderContainer>
            <HMain>
                <HMenu>
                    {!logInfo ? <li onClick={() => navigate("/login")}>로그인</li> : <li onClick={logout}>로그아웃</li>}
                    <li onClick={checkLogin2}>마이페이지</li>
                    <li onClick={checkLogin}>찜꽁바구니</li>
                </HMenu>
                <HTab>
                    <li>서비스 소개</li>
                    <li onClick={() => navigate("/products")}>PB상품 랭킹</li>
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
    height: 90px;
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
        font-size: ${({ theme }) => theme.fontSizes.xs};
        color: ${({ theme }) => theme.colors.Gray_040};
        cursor: pointer;
    }
`;

const HTab = styled.ul`
    display: flex;
    width: 100%;
    line-height: 60px;
    text-align: center;
    li {
        width: 20%;
        cursor: pointer;
        font-size: ${({ theme }) => theme.fontSizes.small};
    }
    img {
        margin-top: -25px;
    }
`;
