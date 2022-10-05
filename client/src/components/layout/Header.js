import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo/HeaderLogo.svg";
import { useNavigate } from "react-router-dom";
import store from "../../lib/store";
import { RiMenu2Fill, RiAccountPinBoxFill } from "react-icons/ri";

const Header = () => {
    const navigate = useNavigate();
    const { logInfo } = store();

    const logout = () => {
        console.log("로그아웃 버튼 클릭");
        if (window.confirm("정말로 로그아웃 하시겠습니까?")) {
            sessionStorage.removeItem("token");
            navigate("/");
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

    // 태블릿 메뉴
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuChange = (e) => {
        setIsMenuOpen(false);
    };

    const [isUeserOpen, setIsUeserOpen] = useState(false);
    const handleUeserChange = (e) => {
        setIsUeserOpen(false);
    };

    return (
        <HeaderContainer>
            <HLaptop>
                <HMenu>
                    {!logInfo ? <li onClick={() => navigate("/login")}>로그인</li> : <li onClick={logout}>로그아웃</li>}
                    <li onClick={checkLogin2}>마이페이지</li>
                    <li onClick={checkLogin}>찜꽁바구니</li>
                </HMenu>
                <HTab>
                    <li onClick={() => navigate("/")}>리코스토어 메인</li>
                    <li onClick={() => navigate("/products")}>PB상품 랭킹</li>
                    <li>
                        <img onClick={() => navigate("/")} src={logo} alt="logo" />
                    </li>
                    <li onClick={() => navigate("/foodtest")}>편의점 취향 찾기</li>
                    <li onClick={() => navigate("/findstore")}>주변 편의점 찾기</li>
                </HTab>
            </HLaptop>
            <HTablet>
                <div className="tablet_box">
                    <p className="menu_btn" onClick={(e) => setIsMenuOpen(!isMenuOpen)}>
                        <RiMenu2Fill size={35} color="#363639" />
                    </p>
                    <p className="logo">
                        <img onClick={() => navigate("/")} src={logo} alt="logo" />
                    </p>
                    <p className="use_btn" onClick={(e) => setIsUeserOpen(!isUeserOpen)}>
                        <RiAccountPinBoxFill size={35} color="#363639" />
                    </p>
                </div>
                {isMenuOpen ? (
                    <HTMenu>
                        <li onClick={() => navigate("/")}>리코스토어 메인</li>
                        <li onClick={() => navigate("/products")}>PB상품 랭킹</li>
                        <li onClick={() => navigate("/foodtest")}>편의점 취향 찾기</li>
                        <li onClick={() => navigate("/findstore")}>주변 편의점 찾기</li>
                    </HTMenu>
                ) : null}
                {isUeserOpen ? (
                    <HTUser>
                        {!logInfo ? (
                            <li onClick={() => navigate("/login")}>로그인</li>
                        ) : (
                            <li onClick={logout}>로그아웃</li>
                        )}
                        <li onClick={checkLogin2}>마이페이지</li>
                        <li onClick={checkLogin}>찜꽁바구니</li>
                    </HTUser>
                ) : null}
            </HTablet>
        </HeaderContainer>
    );
};

export default Header;
const HeaderContainer = styled.nav`
    width: 100%;
    margin: 0 auto;
    position: fixed;
    top: 0;
    box-shadow: 0px 4px 20px #ececec;
    background-color: #fff;
    z-index: 100;
`;
const HLaptop = styled.main`
    max-width: 1280px;
    height: 90px;
    margin: 0 auto;
    @media ${({ theme }) => theme.device.laptop} {
        display: none;
    }
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

const HTablet = styled.main`
    display: none;
    .tablet_box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        p {
            cursor: pointer;
        }
        position: relative;
    }
    @media ${({ theme }) => theme.device.laptop} {
        display: flex;
    }
    @media ${({ theme }) => theme.device.tablet} {
        width: 100%;
        .tablet_box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0;
            .logo {
                img {
                    width: 170px;
                }
            }
        }
    }
    @media ${({ theme }) => theme.device.mobile} {
        width: 100%;
        .tablet_box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            p {
                cursor: pointer;
            }
            position: relative;
        }
        .logo {
            img {
                width: 120px;
            }
        }
    }
`;

const HTMenu = styled.ul`
    position: absolute;
    top: 90px;
    left: 0;
    padding: 30px;
    border-radius: 0 0 20px 0;
    font-size: ${({ theme }) => theme.fontSizes.base};
    background-color: ${({ theme }) => theme.colors.Gray_010};
    box-shadow: 0px 5px 8px rgba(204, 204, 204, 0.2);
    li {
        background-color: #fff;
        border-radius: 40px;
        padding: 6px 60px;
        font-weight: 500;
        margin-bottom: 20px;
        text-align: center;
        color: ${({ theme }) => theme.colors.Gray_050};
        cursor: pointer;
        &:hover {
            color: ${({ theme }) => theme.colors.Gray_080};
        }
    }
    /* @media ${({ theme }) => theme.device.mobile} {
        padding: 10px;
    } */
`;
const HTUser = styled.ul`
    background-color: #fff;
    position: absolute;
    top: 90px;
    right: 0;
    padding: 30px;
    border-radius: 0 0 20px 0;
    font-size: ${({ theme }) => theme.fontSizes.base};
    background-color: ${({ theme }) => theme.colors.Gray_010};
    box-shadow: 0px 5px 8px rgba(204, 204, 204, 0.2);
    li {
        background-color: #fff;
        border-radius: 40px;
        padding: 6px 60px;
        font-weight: 500;
        margin-bottom: 20px;
        text-align: center;
        color: ${({ theme }) => theme.colors.Gray_050};
        cursor: pointer;
        &:hover {
            color: ${({ theme }) => theme.colors.Gray_080};
        }
    }
`;
