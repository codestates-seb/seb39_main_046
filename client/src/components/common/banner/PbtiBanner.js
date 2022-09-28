import React from "react";
import styled from "styled-components";
import PBannerImg from "../../../assets/images/banner/PbtiBanner.png";

const PbtiBanner = () => {
    let more = "편BTI 하러가기 >";
    return (
        <PBanner>
            <section>
                <img src={PBannerImg} alt="편BTI 광고 배너" />
                <p>내 편의점 취향이 궁금하다면?</p>
                <span>{more}</span>
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
    span {
        font-weight: 500;
        color: ${({ theme }) => theme.colors.White};
        font-size: ${({ theme }) => theme.fontSizes.small};
        cursor: pointer;
    }
`;
