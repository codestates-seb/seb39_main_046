import React from "react";
import styled from "styled-components";
import PBannerImg from "../../assets/images/banner/PbtiBanner.svg";

const PbtiBanner = () => {
    let more = "편BTI 하러가기 >";
    return (
        <PBanner>
            <section>
                <img src={PBannerImg} alt="편BTI 광고 배너" />
                <Middlecontents>
                    나의 편의점 취향은 샌드위치파? 라면파?<p>취향대로 추천받자!</p>
                </Middlecontents>
                <span>
                    내 취향이 궁금하다면 <span>{more}</span>
                </span>
            </section>
        </PBanner>
    );
};

export default PbtiBanner;

const PBanner = styled.section`
    margin: 0 auto;
    width: 1280px;
    height: 100px;
    border-radius: 30px;
    background-color: ${({ theme }) => theme.colors.Orange_030};
    margin-bottom: 80px;
    section {
        width: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    span {
        font-weight: 500;
        font-size: ${({ theme }) => theme.fontSizes.small};
        color: ${({ theme }) => theme.colors.White};
        cursor: pointer;
    }
    span {
        font-weight: 500;
        color: ${({ theme }) => theme.colors.Gray_90};
        font-size: ${({ theme }) => theme.fontSizes.small};
        cursor: pointer;
    }
`;

const Middlecontents = styled.span`
    text-align: center;
    margin-left: 100px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.White};
    p {
        font-size: ${({ theme }) => theme.fontSizes.titleSize};
        color: ${({ theme }) => theme.fontSizes.titleSize};
        font-weight: 500;
        text-align: center;
    }
`;
