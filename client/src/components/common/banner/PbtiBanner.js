import React from "react";
import styled from "styled-components";
import PBannerImg from "../../../assets/images/banner/PbtiBanner.svg";
import { useNavigate } from "react-router-dom";

const PbtiBanner = () => {
    const navigate = useNavigate();
    return (
        <PBanner>
            <section>
                <img src={PBannerImg} alt="편BTI 광고 배너" />
                <p>내 편의점 취향이 궁금하다면?</p>
                <span className="go_txt" onClick={() => navigate("/foodtest")}>
                    편BTI 하러가기 ›
                </span>
                <span className="mobile_txt" onClick={() => navigate("/foodtest")}>
                    편의점 취향 테스트 하러가기 ›
                </span>
            </section>
        </PBanner>
    );
};

export default PbtiBanner;

const PBanner = styled.section`
    width: 100%;
    height: 100px;
    background-color: ${({ theme }) => theme.colors.Orange_030};
    margin-bottom: 80px;
    section {
        max-width: 1280px;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    p {
        font-size: ${({ theme }) => theme.fontSizes.xxxl};
        font-weight: 500;
        text-align: center;
    }
    .go_txt {
        font-weight: 500;
        color: ${({ theme }) => theme.colors.White};
        font-size: ${({ theme }) => theme.fontSizes.small};
        cursor: pointer;
    }
    .mobile_txt {
        display: none;
    }
    @media ${({ theme }) => theme.device.tablet} {
        line-height: 100px;
        img {
            width: 130px;
        }
        p {
            display: none;
        }
        .go_txt {
            display: none;
        }
        .mobile_txt {
            font-weight: 500;
            color: ${({ theme }) => theme.colors.Gray_080};
            font-size: ${({ theme }) => theme.fontSizes.xl};
            display: block;
        }
    }
`;
