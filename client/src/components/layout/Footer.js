import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo/FooterLogo.svg";
import { FaGithub } from "react-icons/fa";
import { TbBrandFigma } from "react-icons/tb";

const Footer = () => {
    return (
        <FooterContainer>
            <FMain>
                <h3>
                    <img src={logo} alt="로고" />
                </h3>
                <ul>
                    <li>
                        <p onClick={() => window.open("https://github.com/choiseoeun-GoUp", "_blank")}>
                            <FaGithub />
                        </p>
                        최서은
                    </li>
                    <li>
                        <p onClick={() => window.open("https://github.com/LastCarol", "_blank")}>
                            <FaGithub />
                        </p>
                        이도현
                    </li>
                    <li>
                        <p onClick={() => window.open("https://github.com/gu-geonhoe", "_blank")}>
                            <FaGithub />
                        </p>
                        구건회
                    </li>
                    <li>
                        <p onClick={() => window.open("https://github.com/fasdf1", "_blank")}>
                            <FaGithub />
                        </p>
                        장종인
                    </li>
                    <li>
                        <p
                            onClick={() =>
                                window.open(
                                    "https://www.figma.com/file/ahCtlmC8P28jbD0ZRE1rr9/%5BUX%2FUI%5D-hola%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8---%ED%8E%B8%EC%9D%98%EC%A0%90-PB-%EC%83%81%ED%92%88-%EB%9E%AD%ED%82%B9-%EC%82%AC%EC%9D%B4%ED%8A%B8?node-id=2%3A6",
                                    "_blank",
                                )
                            }
                        >
                            <TbBrandFigma />
                        </p>
                        신지민
                    </li>
                </ul>
                <p className="copy">Copyright © 2022 recostore.shop.,Ltd. All rights reserved.</p>
            </FMain>
        </FooterContainer>
    );
};

export default Footer;
const FooterContainer = styled.footer`
    width: 100%;
    height: 350px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.Gray_060};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FMain = styled.section`
    max-width: 1280px;
    color: ${({ theme }) => theme.colors.White};
    padding: 45px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
        width: 200px;
        cursor: pointer;
        margin-bottom: 30px;
    }
    ul {
        max-width: 470px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
        gap: 5px;
        margin-bottom: 50px;
        li {
            font-size: ${({ theme }) => theme.fontSizes.base};
            display: flex;
            align-items: center;
            p {
                margin-right: 7px;
                padding-top: 3px;
                cursor: pointer;
            }
        }
    }
    .copy {
        color: ${({ theme }) => theme.colors.Gray_020};
        font-weight: 200;
    }
`;
