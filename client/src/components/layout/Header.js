import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo/HeaderLogo.svg";
import { useNavigate, NavLink } from "react-router-dom";
import store from "../../lib/store";
import { RiMenuFill } from "react-icons/ri";
import useStore from "../../lib/store";

const Header = () => {
    const navigate = useNavigate();
    const { logInfo } = store();

    const logout = () => {
        if (window.confirm("정말로 로그아웃 하시겠습니까?")) {
            sessionStorage.removeItem("token");
            useStore.setState({memberId: ""});
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

    return (
        <HeaderContainer>
            <HLaptop>
                <HMenu>
                    {!logInfo ? (
                        <li>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? "selected" : "not")}>
                                로그인
                            </NavLink>
                        </li>
                    ) : (
                        <li onClick={logout}>로그아웃</li>
                    )}
                    <li onClick={checkLogin2}>
                        <NavLink to="/mypage" className={({ isActive }) => (isActive ? "selected" : "not")}>
                            마이페이지
                        </NavLink>
                    </li>
                    <li onClick={checkLogin}>
                        <NavLink to="/productbasket" className={({ isActive }) => (isActive ? "selected" : "not")}>
                            찜꽁바구니
                        </NavLink>
                    </li>
                </HMenu>
                <HTab>
                    <li>
                        <NavLink to="/" className="not">
                            리코스토어 메인
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className={({ isActive }) => (isActive ? "selected" : "not")}>
                            PB상품 랭킹
                        </NavLink>
                    </li>
                    <li>
                        <img onClick={() => navigate("/")} src={logo} alt="logo" />
                    </li>
                    <li>
                        <NavLink to="/foodtest" className={({ isActive }) => (isActive ? "selected" : "not")}>
                            편의점 취향 찾기
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/findstore" className={({ isActive }) => (isActive ? "selected" : "not")}>
                            주변 편의점 찾기
                        </NavLink>
                    </li>
                </HTab>
            </HLaptop>
            <HTablet>
                <div className="tablet_box">
                    <p className="logo">
                        <img onClick={() => navigate("/")} src={logo} alt="logo" />
                    </p>
                    <p className="menu_btn" onClick={(e) => setIsMenuOpen(!isMenuOpen)}>
                        <RiMenuFill size={35} color="#437BEC" />
                    </p>
                </div>
                {isMenuOpen ? (
                    <HTMenu>
                        <div className="close_btn" onClick={(e) => setIsMenuOpen(!isMenuOpen)}>
                            x
                        </div>
                        <ul className="mene_box">
                            <li onClick={() => navigate("/")}>리코스토어 메인</li>
                            <li onClick={() => navigate("/products")}>PB상품 랭킹</li>
                            <li onClick={() => navigate("/foodtest")}>편의점 취향 찾기</li>
                            <li onClick={() => navigate("/findstore")}>주변 편의점 찾기</li>
                        </ul>
                        <ul className="login_box">
                            {!logInfo ? (
                                <li onClick={() => navigate("/login")}>로그인</li>
                            ) : (
                                <li onClick={logout}>로그아웃</li>
                            )}
                            <li onClick={checkLogin2}>마이페이지</li>
                            <li onClick={checkLogin}>찜꽁바구니</li>
                        </ul>
                    </HTMenu>
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
        cursor: pointer;
    }
    .not {
        color: ${({ theme }) => theme.colors.Gray_090};
        &:hover {
            color: ${({ theme }) => theme.colors.Blue_030};
        }
    }
    .selected {
        color: ${({ theme }) => theme.colors.Blue_030};
        font-weight: 700;
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
    .not {
        color: ${({ theme }) => theme.colors.Gray_090};
        &:hover {
            color: ${({ theme }) => theme.colors.Blue_030};
        }
    }
    .selected {
        color: ${({ theme }) => theme.colors.Blue_030};
        font-weight: 700;
    }
    img {
        margin-top: -25px;
    }
`;

const HTablet = styled.main`
    display: none;
    height: 75px;
    .tablet_box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
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

const HTMenu = styled.div`
    width: 60%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    background-color: ${({ theme }) => theme.colors.Blue_030};
    color: #fff;
    .close_btn {
        height: 75px;
        line-height: 75px;
        border-bottom: 1px solid #fff;
        text-align: right;
        padding-right: 20px;
        cursor: pointer;
        font-size: ${({ theme }) => theme.fontSizes.xxl};
    }
    ul {
        padding: 30px;
        li {
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    .mene_box {
        li {
            font-size: ${({ theme }) => theme.fontSizes.xxl};
            line-height: 80px;
        }
    }
    .login_box {
        li {
            line-height: 50px;
        }
    }
`;
